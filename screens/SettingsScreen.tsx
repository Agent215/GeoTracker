import { API, Auth, graphqlOperation } from 'aws-amplify';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { createTodo } from '../src/graphql/mutations';
import { listTodos } from '../src/graphql/queries'

const initialState = { name: '', description: '' }

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error)
  }
}


export default function EventFeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Tab</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/SettingsScreen.js" />
      <Text style={styles.title}>Click below to sign out</Text>
      <Button title='Sign out' onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
