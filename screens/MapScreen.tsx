import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, Dimensions, Text } from "react-native";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { currentEventList, combinedEvents, historicalEventList } from "../App";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { IconButton, Colors, Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import WeatherOverlay from "../components/WeatherOverlay";
import { View } from "../components/Themed";
import Geocoder from "react-native-geocoding";
import * as Keys from "../constants/APIkeys";
import DisasterPin from "../components/CustomMarker";
import CustomModal from "../components/CustomModal";
import * as actions from "../store/actions/actions";
import { State } from "ionicons/dist/types/stencil-public-runtime";

import useTwitterTrendsResults from "../hooks/useTwitterTrendsResult";
import TwitterComponent from "../components/TwitterComponent";
import useTwitterTweetsResults from "../hooks/useTwitterTweetsResult";


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

  const [trendsApi, trendsResults, errorMessage] = useTwitterTrendsResults();



  //get state from redux store
  const dispatch = useDispatch();
  const currentDisaster = useSelector(
    (state) => state.disaster.currentDisaster
  ); // set when user presses a marker
  const disasterFilter = useSelector((state) => state.disaster.disasterFilter); // curent filter for disasters
  const filteredDisasters = useSelector(
    (state) => state.disaster.filteredDisasters
  ); // only the filtered disasters
  const weatherFilter = useSelector((state) => state.disaster.weatherFilter);

  const startDate = useSelector((state) => state.disaster.startDate); // start date of the time range from date picker
  const endDate = useSelector((state) => state.disaster.endDate); //end date of time range from date picker

  let mapRef = useRef(MapView.prototype);
  const [isModalVisible, setModalVisible] = useState(false); //useState of disaster modal
  const [mapMode, setMapMode] = useState("hybrid");
  const [toggleMap, setToggleMap] = useState(false);
  let tempArray = []; // temp array to store filtered events

  const [tweetApi, tweetResults, tweetErrorMessage] = useTwitterTweetsResults();
  let [tweets, setTweets] = useState([]);


  let [cameraRegion, setCameraRegion] = useState({
    cameraLatitude: 36.103,
    cameraLongitude: -116.476,
    cameraNELatitude: 45.953,
    cameraNELongitude: -110.4587,
  });



  /*adding property isShow to all events, which determine if they shold show on the map
  they all should when the Map first rendered*/
  let allEvents = combinedEvents.map((event) => {
    return { ...event, isShow: true };
  });

  /**
   * When the disaster filter is changed lets filter the disasters
   */
  useEffect(() => {
    filterDisasters();
  }, [disasterFilter, dispatch]);

  /* check if current disaster has changed, if so then force rerender */
  useEffect(() => {
    if (currentDisaster != "") {
      animateToDisaster();
    }
  }, [currentDisaster.title, dispatch]);

  /* run once on component mount */
  useEffect(() => {
    animateToUser();
    
  }, []);

  useEffect(() => {

    console.log(tweetResults)
  }, [tweetResults]);

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
   * Toggle disaster modal or twitter
   */
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const runApi = () => {

    tweetApi(
        currentDisaster.title,
        currentDisaster.currentLat,
        currentDisaster.currentLong,
        400
    );
}

useEffect(() => {
    if (tweetResults != undefined) {

      if (tweetResults[0] = undefined) {
        tweetResults.shift();
       
       }

       setTweets(tweetResults);
      

      // console.log("in useEffect");
      // console.log(tweets);
    }
  }, [tweetResults]);

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
    filterDisasters();
  }, [disasterFilter, startDate, endDate, dispatch]);

  /* check if current disaster has changed, if so then force rerender */
  useEffect(() => {
    if (currentDisaster != "") {
      animateToDisaster();
      runApi();
    }
  }, [currentDisaster.title, dispatch]);


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

    tempArray = []; // reset temp array
    // go through all events and mark which ones need to be filtered.
    const disasterToFilter = allEvents.map((event) => {
      let endDate;
      if (event.isClosed == null) {
        endDate = new Date().toISOString();
      } else {
        endDate = event.isClosed;
      }

      if (
        (disasterFilter.value === "all" || // filter for all
          disasterFilter.value === "" || // first time we render
          disasterFilter.value == undefined || //just in case
          event.category === disasterFilter.value) &&
        startDate_ISO <= event.currentDate &&
        endDate <= endDate_ISO
      ) {
        event.isShow = true;
      } else {
        event.isShow = false;
      }
      return event;
    });

    // create a new array from the array with correctly marked isShow prop
    disasterToFilter.forEach((element) => {
      if (element.isShow) tempArray.push(element);
    });

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

        //   onMapReady={
        //     async()=>{
        //       console.log("Map is ready");
        //       let camera = await mapRef.current.getCamera();
        //       console.log("camera center lat and long:" );

        //       console.log(camera.center.latitude, camera.center.longitude );

        //  //     trendsApi(camera.center.latitude,camera.center.longitude );


              
            
        //     }
        //   }

          onRegionChangeComplete={async (NewRegion) => {
                  
            let mapBoundry = await mapRef.current.getMapBoundaries();
           
            setCameraRegion({
              cameraLatitude: NewRegion.latitude,
              cameraLongitude: NewRegion.longitude,
              cameraNELatitude: mapBoundry.northEast.latitude,
              cameraNELongitude:mapBoundry.northEast.longitude,
            
            }
            );

            trendsApi(NewRegion.latitude,NewRegion.longitude);
        
            // tweetApi(trendsResults[0],NewRegion.latitude,NewRegion.longitude ,20);
            console.log("map region change complete");

            
          }}
        >
          {filteredDisasters.map((marker: EventEntity, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(marker.currentLat),
                longitude: parseFloat(marker.currentLong),
              }}
              title={marker.title}
              description={marker.category}
              tracksViewChanges={false}
              onPress={() => {
                toggleModal();
                dispatch(actions.setCurrentDisaster(marker));
              }}
            >
              <DisasterPin size={50} category={marker.category} />
            </Marker>
          ))}

          <WeatherOverlay category={weatherFilter.value} />
        </MapView>

        <CustomModal
          title={currentDisaster.title}
          sourceLink={currentDisaster.sourceLink}
          visable={isModalVisible}
          disaster={currentDisaster}
          toggleModal={toggleModal}
          tweets = {tweets}
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

        {/*current location icon button that shows on bottom right of the map */}
        <IconButton
          icon="crosshairs-gps"
          style={iconOnMap.location}
          color={Colors.blue900}
          size={40}
          onPress={() => {
            animateToUser();
          }}
        />

        {/* twitter icon button that shows on bottom left of the map */}
        {/* a twitter modal will pop up on when clicked */}
        <View style={iconOnMap.twitter}>
          <TwitterComponent
             cameraRegion={cameraRegion} 
             trendsResult={trendsResults} 
            // tweetResult={tweetResults}
            />
        </View>


        <Switch
          value={toggleMap}
          onValueChange={() => {
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
const iconOnMap = StyleSheet.create({
  location: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },

  twitter: {

    position: "absolute",
    left: 5,
    bottom: 5,
    
    backgroundColor:"transparent",

    alignItems:"center",
    // justifyContent:"center",
  },
});

export default MapScreen;
