
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Image, ScrollView, Button, TextInput, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, } from '../components/Themed';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { ListItem, Icon, } from 'react-native-elements'
import DisasterCard from '../components/DisasterCard';
import { events } from '../assets/Mocked_Data';

export default function EventFeedScreen() {


  return (


    <ScrollView>
      <View>
        {events.map(function (data ,index) {
          { console.log("event " + data.title) }
          return (<DisasterCard
            key = {index}
            event={data} />)
        })}
        
      </View>
    </ScrollView>
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