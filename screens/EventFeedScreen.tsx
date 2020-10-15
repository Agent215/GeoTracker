import { API, Auth, graphqlOperation } from 'aws-amplify';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {StyleSheet, Image, ScrollView, Button, TextInput, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, } from '../components/Themed';
import { Container, Header, Content, Card, CardItem, Body} from 'native-base';
import { ListItem, Icon, } from 'react-native-elements'
import DisasterCard from '../components/DisasterCard';


export default function EventFeedScreen(Disasters) {
  return (
    
    <View>
      <ScrollView>
        <Text style={{ fontSize: 96 }}>Demo 1</Text>
        <DisasterCard />
        <DisasterCard />
        <DisasterCard />
        <DisasterCard />
        <DisasterCard />
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