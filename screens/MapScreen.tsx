import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from "react-native-map-clustering";

import { View } from '../components/Themed';


// import * as React from "react";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoding";
const GOOGLE_PLACES_API_KEY = "AIzaSyB_fuGPEjP2hp9-GNXOt-ElFWceKQFFgz4";
// Initialize the module (needs to be done only once)
Geocoder.init("AIzaSyB_fuGPEjP2hp9-GNXOt-ElFWceKQFFgz4", { language: "en" }); // use a valid API key



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
  let mapRef = useRef(MapView.prototype);

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
      <GooglePlacesAutocomplete
        placeholder='Enter Location'
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en", // language of the results
        }}
        onPress={(data, details = null) => {
          console.log(data);
          console.log("test");
          Geocoder.from(data.description)
            .then((json) => {
              var location = json.results[0].geometry.location;
              console.log(location);
              let lat = location.lat;
              let lng = location.lng;

              let coords = {
                latitude: lat,
                longitude: lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
              };
              mapRef.current.animateToRegion(coords, 0)
            })
            .catch((error) => console.warn(error));

          // this.map.animateCamera({
          //   center: {
          //     latitude: 0,
          //     longitude: 0,
          //   },
          //   heading: 180,
          // });
        }}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url:
            "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
          useOnPlatform: "web",
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
        styles={{
          container: {
            flex: 1,
            zIndex: 6,
          },
          textInputContainer: {
            backgroundColor: "rgba(0,0,0,0)",
            borderTopWidth: 0,
            borderBottomWidth: 0,
            marginTop: 0,
            zIndex: 6,
            width: '100%'
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: "#5d5d5d",
            zIndex: 6,
            fontSize: 20,
          },
          predefinedPlacesDescription: {
            zIndex: 6,
            color: "#1faadb",
          },
        }}
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
    zIndex: -1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});



export default MapScreen;