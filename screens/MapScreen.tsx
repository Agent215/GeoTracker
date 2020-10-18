import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Dimensions, Text } from "react-native";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import MapView, { UrlTile } from "react-native-maps";


import { View } from "../components/Themed";
import { IconButton, Colors } from "react-native-paper";

import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoding";
import * as Keys from "../constants/APIkeys";

const GOOGLE_PLACES_API_KEY = Keys.googlePlacesKey;
// Initialize the module (needs to be done only once)
Geocoder.init(Keys.geocoderKey, { language: "en" }); // use a valid API key

const LATITUDE_DELTA = 0.0922;
const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIALREGION = {
  // this is philly for now, we can change this to whatever
  latitude: 39.9526,
  longitude: -75.16522,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen = (props) => {
  let mapRef = useRef(MapView.prototype);
  //let tileUrl = "https://api.climacell.co/v3/weather/layers/temp/now/{z}/{x}/{y}.png?apikey=mU2w12US9sAUfDSQ1iQUXWhZtMks9oI7";
  //let tileUrl = "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=52621d09b1f91b7e4cbc93777fb2801b";
  //let tileUrl = "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/AIRS_L3_Surface_Skin_Temperature_Monthly_Night/default/2014-04-09/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png";
  let tileUrl = "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/IMERG_Precipitation_Rate/default/2020-10-16/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png";
  //let tileUrl = ""
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
          longitudeDelta: LONGITUDE_DELTA,
        };
        console.log(
          "MapScreen.js/animateToUser - Getting User Coords : " + coords
        );
        mapRef.current.animateToRegion(coords, 0); // why does my linter give me red squiglly lines, yet this runs...
      },
      (error) =>
        console.log(
          "MapScreen.tsx/animateToUser() - Got error from navigator.geolocation.getCurrentPosition: " +
          error
        )
    );
  };

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
        showsUserLocation={true}
        showsMyLocationButton={true}
        rotateEnabled={false}
        showsTraffic={false}
        toolbarEnabled={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        loadingEnabled={true}
      >
        <View
          style={{ opacity: 0.01 }}>
          <UrlTile

            style={{ opacity: 0.01 }}
            /**
             * The url template of the tile server. The patterns {x} {y} {z} will be replaced at runtime
             * For example, http://c.tile.openstreetmap.org/{z}/{x}/{y}.png
             */
            urlTemplate={tileUrl}
            /**
             * The maximum zoom level for this tile overlay. Corresponds to the maximumZ setting in
             * MKTileOverlay. iOS only.
             */
            maximumZ={19}
            /**
             * flipY allows tiles with inverted y coordinates (origin at bottom left of map)
             * to be used. Its default value is false.
             */
            flipY={false}
          />
        </View>

      </MapView>

      <GooglePlacesAutocomplete
        placeholder="Enter Location"
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
                longitudeDelta: LONGITUDE_DELTA,
              };
              mapRef.current.animateToRegion(coords, 0);
            })
            .catch((error) => console.warn(error));
        }}
        onFail={(error) => console.error(error)}
        styles={searchStyles}
        textInputProps={{ clearButtonMode: "always" }}
      />

      {/*current location button that shows on bottom right of the map */}
      <IconButton
        // icon={require('../assets/locationG-Icon.png')}
        // icon={{ uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400' }}
        icon="crosshairs-gps"
        style={locationIcon.container}
        color={Colors.blue600}
        size={50}
        onPress={() => { animateToUser(); }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  mapStyle: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: -1,
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

/*
For the search bar we pass a bunch of styles not just one. 
*/
const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 6,
    width: SCREEN_WIDTH,
    top: 0,
    position: "absolute",
  },
  textInputContainer: {
    backgroundColor: "rgba(0,0,0,0)",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginTop: 0,
    zIndex: 6,
    width: SCREEN_WIDTH,
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: "#5d5d5d",
    zIndex: 6,
    fontSize: 18,
    width: SCREEN_WIDTH,
  },
  predefinedPlacesDescription: {
    zIndex: 6,
    color: "#1faadb",
    width: SCREEN_WIDTH,
  },
  row: {
    // backgroundColor:"#a09fa3",
    width: SCREEN_WIDTH,
  },
});



//style for the current location button
const locationIcon = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});

export default MapScreen;
