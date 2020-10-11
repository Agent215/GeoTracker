import { API, Auth, graphqlOperation } from 'aws-amplify';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { createTodo } from '../src/graphql/mutations';
import { listTodos } from '../src/graphql/queries'
import { Image, ScrollView } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'




export default function EventFeedScreen() {
  return (
    
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ fontSize: 96 }}>Demo 1</Text>
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Text style={{ fontSize: 60 }}>Try and scroll!</Text>
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Text style={{ fontSize: 60 }}>Scroll down</Text>
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Text style={{ fontSize: 60 }}>Scroll down</Text>
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Text style={{ fontSize: 60 }}>Scroll back up!</Text>
      </ScrollView>
    </View>
  );
}

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};

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