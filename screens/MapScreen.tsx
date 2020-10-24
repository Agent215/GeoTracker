import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { IconButton, Colors, Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { View, Text } from "../components/Themed";
import { events } from "../assets/Mocked_Data";
import Geocoder from "react-native-geocoding";
import * as Keys from "../constants/APIkeys";
import DisasterPin from "../components/CustomMarker";
import CustomModal from "../components/CustomModal";
import * as actions from "../store/actions/actions";
import { State, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import DropDownPicker from "react-native-dropdown-picker";
import EventMarkersOnMap from "../components/EventMarkersOnMap";

const GOOGLE_PLACES_API_KEY = Keys.googlePlacesKey;
// Initialize the module (needs to be done only once)
Geocoder.init(Keys.geocoderKey, { language: "en" }); // use a valid API key

const LATITUDE_DELTA = 0.0922;
const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentDisaster = useSelector(
    (state) => state.disaster.currentDisaster
  );
  const counter = useSelector((state) => state.counterReducer.counter);
  const isReRenderDisaster = useSelector(
    (state) => state.renderDisaster.reRender
  );

  //adding property isShow to each event, which determine if they shold show on the map
  //they all should when the Map first rendered
  let filteredEvent = events.map((params) => {
    return { ...params, isShow: true };
  });


  console.log("Mapscreen.tsx - current disaster " + currentDisaster);
  let mapRef = useRef(MapView.prototype);

  const [isModalVisible, setModalVisible] = useState(false);
  const [mapMode, setMapMode] = useState("hybrid");
  const [toggleMap, setToggleMap] = useState(false);
  const [showEvent, setShowEvent] = useState(filteredEvent);

  console.log("here is the initial show event:");
  console.log({ showEvent });

  if (currentDisaster == "null") {
    var INITIALREGION = {
      // this is philly for now, we can change this to whatever
      latitude: 39.9526,
      longitude: -75.16522,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  } else {
    // delcare types
    let lat: number = currentDisaster.LatL;
    let long: number = currentDisaster.LongL;
    var INITIALREGION = {
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }

  const toggleMapMode = () => {
    if (!toggleMap) {
      setMapMode("standard");
      setToggleMap(true);
    } else {
      setMapMode("hybrid");
      setToggleMap(false);
    }
  };

  /**
   * Toggle disaster modal
   */
  const toggleModal = (event) => {
    setModalVisible(!isModalVisible);
    console.log(
      "MapScreen.tsx-toggleModal()-current disaster " + currentDisaster.title
    );
  };

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


  const animateToDisaster = () => {
    let coords = {
      latitude: currentDisaster.LatL,
      longitude: currentDisaster.LongL,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    mapRef.current.animateToRegion(coords, 0);
  };

  /* run once on component mount */
  useEffect(() => {
    animateToUser();
  }, []);
  /* check if current disaster has changed, if so then force rerender */
  useEffect(() => {
    if (currentDisaster != "null") animateToDisaster();
  }, [currentDisaster.title]);

  return (
    <>
      <DropDownPicker
        items={[
          { label: "severestorm", value: "severestorm" },
          { label: "wildfire", value: "wildfire" },
          { label: "flood", value: "flood" },
          { label: "iceberg", value: "iceberg" },
          { label: "volcano", value: "volcano" },
        ]}
        placeholder="---Select an item---"
        containerStyle={{ height: 40 }}
        style={styles.dropDownPicker}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
        onChangeItem={(item) => {
          //   console.log(
          //   item.value + " is selected========================================"
          // );
          //  console.log(filteredEvent);
          filteredEvent.map((params) => {
            if (params.description === item.value) {
              params.isShow = true;
            } else {
              params.isShow = false;
            }
            return params;
          });

          // console.log(filteredEvent);
          setShowEvent(filteredEvent);
          // dispatch(actions.setRenderDisaster())
        }}
      />

      <View style={styles.container}>
        <MapView
          ref={mapRef}
          initialRegion={INITIALREGION}
          style={styles.mapStyle}
          mapType={mapMode} // typescript error i think we can fix by going to index.d.ts and changing maptype to string
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
          <EventMarkersOnMap events={showEvent} callback={toggleModal} />

        </MapView>

        <CustomModal
          title={currentDisaster.title}
          visable={isModalVisible}
          disaster={currentDisaster}
          toggleModal={toggleModal}
        />
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
          onPress={() => {
            animateToUser();
          }}
        />
        <TouchableOpacity
          onPress={() => {
            dispatch(actions.changeCounter());
          }}
        >

          <Text
            style={{
              backgroundColor: "purple",
              fontSize: 30,
              alignSelf: "flex-start",
            }}
          >
            {counter}
          </Text>
        </TouchableOpacity>

        <Switch
          value={toggleMap}
          onValueChange={() => {
            console.log("MapScreen.tsx/toggleMapMode - toggle MapMode Test");
            toggleMapMode();
          }}
        />
      </View>
    </>
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
  plainView: {
    flex: 1,
    width: "auto",
    backgroundColor: "#107B67",
  },
  dropDownPicker: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#fafafa",
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
