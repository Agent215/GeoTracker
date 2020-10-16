import { API, Auth, graphqlOperation } from 'aws-amplify';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {StyleSheet, Image, ScrollView, Button, TextInput, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, } from '../components/Themed';
import { Container, Header, Content, Card, CardItem, Body} from 'native-base';
import { ListItem, Icon, } from 'react-native-elements'
import DisasterCard from '../components/DisasterCard';
import {event1, event2, event3, event4, event5} from '../assets/Mocked_Data';

export default function EventFeedScreen() {
  return (
    
    <View>
      <ScrollView>
        <Text style={{ fontSize: 96 }}>Demo 1</Text>
        <DisasterCard 
          event = {event1}/>
        <DisasterCard 
          event = {event2}/>
        <DisasterCard 
          event = {event3}/>
        <DisasterCard 
          event = {event4}/>
        <DisasterCard 
          event = {event5}/>
        <Text style={{ fontSize: 60 }}>Scroll back up!</Text>
      </ScrollView>
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