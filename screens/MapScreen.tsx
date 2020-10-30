import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { eventList } from '../App'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { IconButton, Colors, Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { View } from "../components/Themed";
import Geocoder from "react-native-geocoding";
import * as Keys from "../constants/APIkeys";
import DisasterPin from "../components/CustomMarker";
import CustomModal from "../components/CustomModal";
import * as actions from "../store/actions/actions";


const GOOGLE_PLACES_API_KEY = Keys.googlePlacesKey;
// Initialize the module (needs to be done only once)
Geocoder.init(Keys.geocoderKey, { language: "en" }); // use a valid API key

const LATITUDE_DELTA = 0.0922;
const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let INITIALREGION = {
  // this is philly for now, we can change this to whatever
  latitude: 39.9526,
  longitude: -75.16522,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen = ({ navigation }) => {
  //get state from redux store
  const dispatch = useDispatch();
  const currentDisaster = useSelector((state) => state.disaster.currentDisaster);     // set when user presses a marker
  const disasterFilter = useSelector((state) => state.disaster.disasterFilter);       // curent filter for disasters
  const filteredDisasters = useSelector((state) => state.disaster.filteredDisasters); // only the filtered disasters
  const weatherFilter = useSelector((state) => state.disaster.weatherFilter);
  let mapRef = useRef(MapView.prototype);
  const [isModalVisible, setModalVisible] = useState(false);
  const [mapMode, setMapMode] = useState("hybrid");
  const [toggleMap, setToggleMap] = useState(false);
  let tempArray = [];

  /*adding property isShow to all events, which determine if they shold show on the map
  they all should when the Map first rendered*/
  let allEvents = eventList.events.map((event) => {
    return { ...event, isShow: true };
  });


  /**
   * standard shows streets 
   * hybrid shows town and city names over satilite view
   */
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
  const toggleModal = () => {
    setModalVisible(!isModalVisible);

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

  /**
   * take coordinates from currently selected disaster
   */
  const animateToDisaster = () => {
    let coords = {
      latitude: currentDisaster.currentLat,
      longitude: currentDisaster.currentLong,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    mapRef.current.animateToRegion(coords, 0);
  };

  /* run once on component mount */
  useEffect(() => {
    animateToUser();
   
  }, []);

  /**
   * When the disaster filter is changed lets filter the disasters
   */
  useEffect(() => {
    filterDisasters()
  }, [disasterFilter, dispatch]);

  /* check if current disaster has changed, if so then force rerender */
  useEffect(() => {
   
    if (currentDisaster != "") {animateToDisaster();}
  }, [currentDisaster.title, dispatch]);

  /**
   * 
   * filter the disaster markers
   * create a new temporary array composed of only filtered disasters
   * then dispatch that to the redux store. Make sure we reset this array
   * each time arround.
   */
  const filterDisasters = () => {

    tempArray = [];   // reset temp array
    // go through all events and mark which ones need to be filtered.
    const disasterToFilter = allEvents.map((event) => {
      if (disasterFilter.value === "all"      // filter for all
        || disasterFilter.value === ""        // first time we render
        || disasterFilter.value == undefined  //just in case
        || event.category === disasterFilter.value) { event.isShow = true }
      else {
        event.isShow = false;
      }
      return event
    });

    // create a new array from the array with correctly marked isShow prop
    disasterToFilter.forEach(element => {
      if (element.isShow) tempArray.push(element)
    })

    // send only the filtered events to the redux store
    dispatch(actions.setFilteredDisasters(tempArray));

  };

  return (

    <View style={styles.container}>
      <MapView
        ref={mapRef}
       // onRegionChange={()=>{dispatch(actions.setCurrentDisaster(""))}} // if we move the map reset the current disaster
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
   
        {filteredDisasters.map((marker: EventEntity, index) => (

          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(marker.currentLat),
              longitude: parseFloat(marker.currentLong)
            }}
           
            tracksViewChanges={false}
            onPress={() => {   toggleModal(); dispatch(actions.setCurrentDisaster(marker)) }}
          >
            <DisasterPin
              size={50}
              category={marker.category}
            />
          </Marker>
        ))}
      </MapView>

      <CustomModal
        title={currentDisaster.title}
        sourceLink = {currentDisaster.sourceLink}
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
        icon="crosshairs-gps"
        style={locationIcon.container}
        color={Colors.blue600}
        size={50}
        onPress={() => {
          animateToUser();
        }}
      />
      <Switch
        value={toggleMap}
        onValueChange={() => {
          console.log("MapScreen.tsx/toggleMapMode - toggle MapMode Test");
          toggleMapMode();
        }}
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
