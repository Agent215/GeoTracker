import React from 'react'
import { StatusBar } from 'expo-status-bar';
import Amplify from 'aws-amplify'
import config from './aws-exports'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { events } from './assets/Mocked_Data'
import * as actions from "./store/actions/actions";
import disasterReducer from './store/reducers/disaster';
import counterReducer from './store/reducers/counterReducer.js';
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


const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  
  if (!isLoadingComplete) {
    return null;
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

export default App
