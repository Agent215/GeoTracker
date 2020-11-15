import { Auth, API } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import * as React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native'
import { Text, View } from '../components/Themed';
import { Todo, EventEntity }  from '../models';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions/actions';


function SettingsScreen() {
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      await Auth.signOut();
      await DataStore.clear();
      dispatch(actions.setSavedDisasters([]));
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }

  //function to delete user
  async function onDeleteUser() {
    const userName ='';

    //collect current authenticated user
    const user = await Auth.currentAuthenticatedUser();
    //Auth function to delete authenticated user
    user.deleteUser((error, data) => {
      //send error to console if exists
      if(error)
        console.log('Error deleting user', error);
      else
        signOut();
    });
    
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Click below to sign out</Text>
      {<Button title='Sign out' onPress={signOut} />}
      <Text style={styles.title}>Click below to Delete User</Text>
      {<Button title='Delete User' onPress={onDeleteUser} />}
      {<Button title='Log response from API for event/all query' onPress={testAPI} />}
      {<Button title='Save test event to datastore' onPress={saveTestEvent} />}
      {<Button title='Read events from datastore' onPress={readFromDatastore} />}
    </View>
  );
}

async function saveTestEvent() {
  try {
    await DataStore.save(
      new EventEntity({
        title: "String",
        category: "String",
        sourceLink: "String",
        locationList: "String",
        isClosed: "String",
        currentLat: "String",
        currentLong: "String",
        eventId: "String",
        currentDate: "String"
      })
    );
    console.log("Post saved successfully!");
  } catch (error) {
    console.log("Error saving post", error);
  }
}

async function readFromDatastore() {
  try {
    const posts = await DataStore.query(EventEntity);
    console.log("Posts retrieved successfully!", JSON.stringify(posts, null, 2));
  } catch (error) {
    console.log("Error retrieving posts", error);
  }
}

async function testAPI() {
  const apiName = 'EventsApi';
  const path = '/events/all';
  const myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
  };

  API
    .get(apiName, path, myInit)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error.response)
    })
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

export default withAuthenticator(SettingsScreen)
