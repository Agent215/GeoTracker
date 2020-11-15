import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import Amplify from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore';
import config from './aws-exports'
import { AppLoading } from 'expo';
import { API, Auth, Hub } from 'aws-amplify'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import disasterReducer from './store/reducers/disaster';
// Added for tabs
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { EventEntity }  from './models';
import * as actions from './store/actions/actions';



const rootReducer = combineReducers({
  disaster: disasterReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});


let currentEventList: EventEntity[] = [];
let historicalEventList: EventEntity[] = [];
let earthquakeEventList: EventEntity[] = [];
let combinedEvents: EventEntity[] = [];
let savedEvents: EventEntity[] = [];

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  console.disableYellowBox = true
  const [fetchedData, setDataFetched] = useState(false)


  // Create listener
  const datastoreListener = Hub.listen("datastore", async hubData => {
    const  { event, data } = hubData.payload;
    if (event === "modelSynced") {
      // do something here once the data is synced from the cloud
      if (data.isFullSync) {
        let savedEvents = await DataStore.query(EventEntity);
        store.dispatch(actions.setSavedDisasters(savedEvents));
      }
    }
    if (event === "outboxStatus") {
      // do something here once the data is synced from the cloud
      if (!data.isEmpty) {
        await DataStore.start();
      }
    }
  })

  const authListener = async (data) => {
    switch (data.payload.event) {

      case 'signIn':
        console.log('user signed in');
        await DataStore.start();
        break;
    }
  }
  Hub.listen('auth', authListener);

  async function loadAllData() {
    let currentUserInfo = await Auth.currentUserInfo();
    if (currentUserInfo != null) {
      console.log("current logged in user: " + currentUserInfo.username);
      await DataStore.clear();
      await DataStore.start();
      savedEvents = await DataStore.query(EventEntity);
      store.dispatch(actions.setSavedDisasters(savedEvents));
    } else {
      console.log("user not signed in");
    }
  
    await getCurrentData();
    await getHistoricalData();
    await getEarthquakeData();
    concatArrays();
  
  }
  
  function concatArrays() {
    let tempArray = [].concat(historicalEventList,currentEventList);
    combinedEvents = [].concat(tempArray, earthquakeEventList);
  }
  
  async function getEarthquakeData() {
    const apiName = 'EarthquakesAPI';
    const path = '/earthquakes';
    const myInit = {
      queryStringParameters: {
        starttime: "2020-01-01",
        endtime: ""
      }
    };
  
    earthquakeEventList = await API.get(apiName, path, myInit);
  }
  
  async function getCurrentData() {
    const apiName = 'EventsApi';
    const path = '/events/all';
    const myInit = { // OPTIONAL
      headers: {}, // OPTIONAL
    };
  
    currentEventList = await API.get(apiName, path, myInit);
  
  }
  
  async function getHistoricalData() {
    const apiName = 'EventsApi';
    const path = '/events/closed';
    const myInit = { // OPTIONAL
      headers: {}, // OPTIONAL
    };
  
    historicalEventList = await API.get(apiName, path, myInit);
  
  }


  if (!fetchedData) {
    return (
      <AppLoading
        startAsync={loadAllData}
        onFinish={() => setDataFetched(true)}
      />
    );
  } else {
    return (
      <Provider store={store} >

        <SafeAreaProvider>

          <Navigation colorScheme={colorScheme} />
          <StatusBar />

        </SafeAreaProvider>
      </Provider>

    )
  }
}


export { currentEventList, historicalEventList, combinedEvents, earthquakeEventList }
export default App
