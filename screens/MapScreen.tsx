import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        mapType="satellite"  // we can have this toggle to standard view if we like
      />
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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
