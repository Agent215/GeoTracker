import { StatusBar } from 'expo-status-bar';
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});
import React, { useEffect, useState } from 'react'
import { AppLoading } from 'expo';
import { API } from 'aws-amplify'


// Added for tabs
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';


let eventList;

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

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
      <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      
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
