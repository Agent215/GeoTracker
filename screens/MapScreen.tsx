import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { PROVIDER_GOOGLE} from 'react-native-maps';
import MapView from "react-native-map-clustering";

import { View } from '../components/Themed';


const LATITUDE_DELTA = 0.0922;
const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIALREGION = {  // this is philly for now, we can change this to whatever
  latitude: 39.9526,
  longitude: -75.16522,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}


const MapScreen = props => {
  let mapRef = useRef(null);

  /*
  animateToUser 
  */
  const animateToUser = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
        console.log("MapScreen.js/animateToUser - Getting User Coords : " + coords);
        mapRef.current.animateToRegion(coords, 0);  // why does my linter give me red squiglly lines, yet this runs...

      }, (error) => console.log("MapScreen.tsx/animateToUser() - Got error from navigator.geolocation.getCurrentPosition: " + error));
  }

  /* run once on component mount */
  useEffect(() => {
    animateToUser();
  }, []);


  return (
    <View style={styles.container}>

      <MapView
        ref={mapRef}
        initialRegion={INITIALREGION}
        style={styles.mapStyle}
        mapType="hybrid"
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        rotateEnabled={false}
        showsTraffic={false}
        toolbarEnabled={true}
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
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  }
});

export default MapScreen;