import React, { useRef, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import MapView from "react-native-map-clustering";


import { View } from "../components/Themed";
import { IconButton, Colors } from "react-native-paper";

import { events } from '../assets/Mocked_Data'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoding";
import * as Keys from "../constants/APIkeys";
import DisasterPin from '../components/CustomMarker';


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
          "MapScreen.tsx/animateToUser - Getting User Coords : " + coords
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
        {events.map((marker, index) => (

          <Marker
            key={index}
            coordinate={{
              latitude: marker.LatL,
              longitude: marker.LongL
            }}
            title={marker.title}
            description={marker.description}
          >
            <DisasterPin
              size={50}
              category={marker.description}
            />
          </Marker>
        ))}
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
