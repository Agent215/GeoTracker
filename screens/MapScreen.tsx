import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { currentEventList, combinedEvents, historicalEventList } from '../App'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { IconButton, Colors, Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";


import WeatherOverlay from '../components/WeatherOverlay'
import GIBSOverlay from '../components/GIBSOverlay'
import { View } from "../components/Themed";
import Geocoder from "react-native-geocoding";
import * as Keys from "../constants/APIkeys";
import DisasterPin from "../components/CustomMarker";
import CustomModal from "../components/CustomModal";
import * as actions from "../store/actions/actions";
import WeatherLegend from '../components/Legend'
import { CustomAlert } from '../components/CustomAlert';
import { addDays, isWithinInterval, parseISO, format } from "date-fns/esm";


const GOOGLE_PLACES_API_KEY = Keys.googlePlacesKey;
// Initialize the module (needs to be done only once)
Geocoder.init(Keys.geocoderKey, { language: "en" });                                  // use a valid API key.

const LATITUDE_DELTA = 0.0922;
const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let INITIALREGION = {                                                                 // this is philly for now, we can change this to whatever.
  latitude: 39.9526,
  longitude: -75.16522,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};


const MapScreen = ({ navigation }) => {
  //get state from redux store
  const dispatch = useDispatch();
  const currentDisaster = useSelector((state) => state.disaster.currentDisaster);     // set when user presses a marker.
  const disasterFilter = useSelector((state) => state.disaster.disasterFilter);       // curent filter for disasters.
  const filteredDisasters = useSelector((state) => state.disaster.filteredDisasters); // only the filtered disasters.
  const weatherFilter = useSelector((state) => state.disaster.weatherFilter);

  const startDate = useSelector((state) => state.disaster.startDate);                 // start date of the time range from date picker.
  const endDate = useSelector((state) => state.disaster.endDate);                     // end date of time range from date picker.

  let mapRef = useRef(MapView.prototype);
  const [isModalVisible, setModalVisible] = useState(false);
  const [mapMode, setMapMode] = useState("hybrid");
  const [toggleMap, setToggleMap] = useState(false);

  // States for animation
  const [currentDate, setCurrentDate] = useState(startDate);                          // Hook that keeps track of the current day that is animating.
  const [isPlaying, setIsPlaying] = useState(false);                                  // Hook that keep track of if the animation is playing.
  const [animateButton, setAnimationButton] = useState("play-circle");
  const [disastersInRange, setDisastersInRange] = useState([]);
  const [maxZoom, setMaxZoom] = useState(19);
  const [canPlay, setCanPlay] = useState(false);
  const isGibsVisible = useSelector((state) => state.disaster.isGibsVisible);         // keep track of if the GIBS data is visible

  
  /*adding property isShow to all events, which determine if they shold show on the map
  they all should when the Map first rendered*/
  let allEvents = combinedEvents.map((event) => {
    return { ...event, isShow: true };
  });

  //This function starts or pauses the animation.
  const toggleAnimation = () => {
    if (isPlaying) { setIsPlaying(false); setAnimationButton("play-circle") }         // If the animation is not playing, have the button a play-circle.
    else {
      setIsPlaying(true)
      dispatch(actions.setIsGibsVisible(true))
      console.log(disastersInRange);
      console.log("disastersInRange");
      setMaxZoom(6);                                                           // If the animation is running.
      setAnimationButton("pause-circle")                                              // Make the play button into a pause-circle.
    }
  }

  //This function stops the animation
  const stopAnimation = () => {
    setIsPlaying(false);                  // no longer playing
    setAnimationButton("play-circle");    // reset UI
    dispatch(actions.setIsGibsVisible(false))               // also no longer in animation mode
    setCurrentDate(startDate);            // reset start date back to begining.
    filterDisasters();                    // filter all the disasters again to give us the intitial set we started with
    setMaxZoom(19)                        // let user zoom again!!
  }



  //Start of animation useEffects
  // If the current date hits the end date, end the animation and reset the button.
  useEffect(() => {
    if (currentDate.toDateString() == endDate.toDateString()) {
      setIsPlaying(false)
      dispatch(actions.setIsGibsVisible(false))
      setAnimationButton("play-circle")
      setMaxZoom(19);
      filterDisasters();
      setDisastersInRange(filteredDisasters);
      setCurrentDate(startDate);            // reset start date back to begining.
    }
  }, [currentDate])


  useEffect(() => {
    let interval = null
    console.log("current date: " + currentDate.toDateString() + " | " + "end date: " + endDate.toDateString())
    if (isPlaying) {                                                                    // If the button is playing.
      interval = setInterval(() => {
        setCurrentDate(prevDate => addDays(prevDate, 1));                              // Starts with currentDate and iterates through given dates.
        ShowMarkerOnDay(currentDate);
      }, 1500)
    } else if ((!isPlaying)) {                                                          // Once the start date == end date, clear the interval and end animation.
      clearInterval(interval)
      console.log("Clear Interval Initiated")
    }
    return () => clearInterval(interval)                                                // Clean up return function.
  }, [isPlaying, currentDate])

  useEffect(() => {
    setCurrentDate(startDate)                                                           // If the start date filter changes, then set animation to start on that date.
  }, [startDate]);
  //End of animate function useEffects

  /* run once on component mount */
  useEffect(() => {
    animateToUser();
  }, []);

  /**
   * When the disaster filter is changed lets filter the disasters
   */
  useEffect(() => {
    filterDisasters()
    if (startDate.toDateString() == endDate.toDateString()) {
      // if start and end are the same
      // then set disabled to true on play button because we are viewing a single day.
      console.log(startDate + "  " + endDate)
      setCanPlay(true)
    } else {
      setCanPlay(false)
    }

  }, [disasterFilter, startDate, endDate, dispatch]);

  /* check if current disaster has changed, if so then force rerender */
  useEffect(() => {
    if (currentDisaster != "") { animateToDisaster(); }
  }, [currentDisaster.title, dispatch]);


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


  /**
   * 
   * filter the disaster markers
   * create a new temporary array composed of only filtered disasters
   * then dispatch that to the redux store. Make sure we reset this array
   * each time arround.
   */

  const filterDisasters = () => {
    let startDate_ISO = startDate.toISOString();
    let endDate_ISO = endDate.toISOString();
    let tempArray = [];   // reset temp array
    // go through all events and mark which ones need to be filtered.
    const disasterToFilter = allEvents.map((event) => {


      let endDate;
      if (event.isClosed == null) {
        endDate = new Date().toISOString();  // if isclosed is null then that means event is still open
        // so then set end date to today, to make sure we show it.
      }
      else { endDate = event.isClosed }       // else set endDate to date supplied by API

      if
        (
        (disasterFilter.value === "all"      // filter for all
          || disasterFilter.value === ""        // first time we render
          || disasterFilter.value == undefined  //just in case
          || event.category === disasterFilter.value
        )
        &&
        (
          startDate_ISO <= event.currentDate && endDate <= endDate_ISO
        )
      ) { event.isShow = true }
      else {
        event.isShow = false;
      }
      return event
    });


    // create a new array from the array with correctly marked isShow prop
    disasterToFilter.forEach(element => {
      if (element.isShow) tempArray.push(element)
    })

    if (disasterFilter.value != "none") { 
      if (tempArray.length < 1) { CustomAlert("No Disasters in this day, or range of dates", "NO EVENTS FOUND") }
    }


   
    // send only the filtered events to the redux store
    dispatch(actions.setFilteredDisasters(tempArray));
    setDisastersInRange(tempArray);
  };


  /*
   *function to be called at each interval of animation of markers 
    fitler by specific day of event not a range. 
   */
  const ShowMarkerOnDay = (currentdate) => {

    let tempArray = [];   // reset temp array
    // go through all events and mark which ones need to be filtered.
    const disastersOnDay = disastersInRange.map((event) => {
      let startDate = event.currentDate;
      let endingDate;
      if (event.isClosed == null) {        // id isClosed is null then event is open so set endate to today
        endingDate = new Date().toISOString();
      }
      else { endingDate = event.isClosed }   // else isClosed = endDate
      console.log(currentdate)
      if ((isWithinInterval(currentdate, {
        start: parseISO(startDate),
        end: parseISO(endingDate)
      }))
        && (disasterFilter.value === "all"      // filter for all
          || disasterFilter.value === ""        // first time we render
          || disasterFilter.value == undefined  //just in case
          || event.category === disasterFilter.value
        )) {
        event.isShow = true
      }
      else {
        event.isShow = false;
      }
      return event
    });

    // create a new array from the array with correctly marked isShow prop
    disastersOnDay.forEach(element => {
      if (element.isShow) tempArray.push(element)
    })
    console.log(tempArray)
    console.log("todays disasters include")
    // send only the filtered events to the redux store
    dispatch(actions.setFilteredDisasters(tempArray));
  };

  return (
    <>
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
          maxZoomLevel={maxZoom}
        >

          {filteredDisasters.map((marker: EventEntity, index) => (

            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(marker.currentLat),
                longitude: parseFloat(marker.currentLong)
              }}
              title={marker.title}
              description={marker.category}
              tracksViewChanges={false}
              onPress={() => { toggleModal(); dispatch(actions.setCurrentDisaster(marker)) }}
            >
              <DisasterPin
                size={50}
                category={marker.category}
              />
            </Marker>
          ))}

          <GIBSOverlay
            category={weatherFilter.value}
            date={format(currentDate, "yyyy-MM-dd")}
            gibsVisible={isGibsVisible}
          />

          <WeatherOverlay
            category={weatherFilter.value}
            gibsVisible={isGibsVisible}
          />

        </MapView>
        <WeatherLegend
          category={weatherFilter.value}
          gibsVisible={isGibsVisible}
          size={400}
        />
        <CustomModal
          title={currentDisaster.title}
          sourceLink={currentDisaster.sourceLink}
          visable={isModalVisible}
          disaster={currentDisaster}
          startDate = {currentDisaster.currentDate}
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
          style={mapButtons.goToCurrent}
          color={Colors.blue600}
          size={50}
          onPress={() => {
            animateToUser();
          }}
        />
        <IconButton
          icon="layers"
          style={mapButtons.toggleLayer}
          color={Colors.blue600}
          size={50}
          onPress={() => { toggleMapMode(); }}
        />
        <View
          style={mapButtons.animateButtons}
        >
          <IconButton
            icon={animateButton}
            color={Colors.blue600}
            size={50}
            disabled={canPlay}
            onPress={() => {
              toggleAnimation();
            }}
          />
          <IconButton
            icon="stop-circle"
            color={Colors.blue600}
            disabled={canPlay}
            size={50}
            onPress={() => {
              stopAnimation();
            }}
          />
        </View>
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
const mapButtons = StyleSheet.create({
  goToCurrent: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  animateButtons: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent"
  },
  toggleLayer: {
    position: "absolute",
    top: 60,
    right: -8,
  },
});

export default MapScreen;
