import { StatusBar } from 'expo-status-bar';
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

import React, { useEffect, useState } from 'react'


// Added for tabs
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const initialState = { name: '', description: '' }


const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      
    )
  }
}

export default App
