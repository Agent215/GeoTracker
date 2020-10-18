import { Auth } from 'aws-amplify';
import * as React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import { withAuthenticator } from 'aws-amplify-react-native'


export async function signOut() {
  try {
    await Auth.signOut();
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


function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Click below to sign out</Text>
      {<Button title='Sign out' onPress={signOut} />}
      <Text style={styles.title}>Click below to Delete User</Text>
      {<Button title='Delete User' onPress={onDeleteUser} />}
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

export default withAuthenticator(SettingsScreen)
