import React, {  useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import Amplify from 'aws-amplify'
import config from './aws-exports'
import { AppLoading } from 'expo';
import { API } from 'aws-amplify'
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


let eventList;

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  console.disableYellowBox = true
  const [fetchedData, setDataFetched] = useState(false)
  
  if (!fetchedData) {
    return (
      <AppLoading
        startAsync={getData}
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

async function getData() { 
  const apiName = 'EventsApi';
  const path = '/events/all';
  const myInit = { // OPTIONAL
      headers: {}, // OPTIONAL
  };

  eventList = await API.get(apiName, path, myInit);
}


export { eventList }
export default App
