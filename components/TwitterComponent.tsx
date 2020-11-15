import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { Button } from "react-native-paper";
import useTwitterTweetsResults from "../hooks/useTwitterTweetsResult";

import { AntDesign } from "@expo/vector-icons";

function TwitterComponent(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  let [trending, setTrending] = useState([]);
  let [tweets, setTweets] = useState([]);
  let [trendTitle, setTrendTitle] = useState("");

  const [tweetApi, tweetResults, tweetErrorMessage] = useTwitterTweetsResults();

  //One degree of latitude equals approximately 364,000 feet (69 miles),
  //One-degree of longitude equals 288,200 feet (54.6 miles)
  const getRadius = (lat1, lat2, long1, long2) => {
    return Math.abs(lat1 - lat2) >= Math.abs(long1 - long2)
      ? Math.abs(lat1 - lat2) * 69
      : Math.abs(long1 - long2) * 54.6;
  };

  let radius = getRadius(
    props.cameraRegion.cameraLatitude,
    props.cameraRegion.cameraNELatitude,
    props.cameraRegion.cameraLongitude,
    props.cameraRegion.cameraNELongitude
  );
  // console.log("radius is "+radius);

  useEffect(() => {
    console.log("Twitter component first render...");
    console.log(props.trendsResult);
    let temArray = [];
    temArray = props.trendsResult.trends;

    console.log("temp Array is");
    console.log(temArray);

    if (temArray != undefined) {
      temArray.forEach((trend) => {
        tweetApi(
          trend,
          props.cameraRegion.cameraLatitude,
          props.cameraRegion.cameraLongitude,
          radius
        );
        // console.log(tweetResults);
      });
    }

  }, [trending]);

  useEffect(() => {
    if (tweetResults != undefined) {

      if (tweetResults[0] = undefined) {
        tweetResults.shift();
       
       }

       setTweets(tweetResults.tweets);
      

      // console.log("in useEffect");
      // console.log(tweets);
    }
  }, [tweetResults]);

  useEffect(()=> {

    console.log("useEffect Tweets")
    console.log(tweets);

  }, [tweets])

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };




  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ flex: 1, alignSelf: "center", padding: 10 }}
        onPress={() => {
          toggleModal();

          let trendsData = props.trendsResult.trends.map((trend, index) => {
            return { name: trend, id: index };
          });

          setTrending(trendsData);

          // console.log(props.tweetResults);

          //tweetApi(trendsData[0].name ,props.cameraRegion.cameraLatitude,props.cameraRegion.cameraLongitude,20);
        }}
      >
        <View style={styles.buttonContainer}>
          <AntDesign name="twitter" size={40} color="#95e4f8" />
        </View>
      </TouchableOpacity>

      <Modal
        avoidKeyboard={true}
        scrollOffset={2}
        isVisible={isModalVisible}
      // onBackdropPress={() => setModalVisible(false)}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <View
              // persistentScrollbar={true}
              style={{
                flex: 1,
                backgroundColor: "#5794a7",
                opacity: 0.85,
                borderRadius: 15,
                marginBottom: 5,

                padding: 8,
                paddingLeft: 10,
              }}
            >
              {/* <Text style={{fontSize:20}}>Map Camera latitude: {props.cameraRegion.cameraLatitude} </Text>
              <Text style={{fontSize:20}}>Map Camera longtitude: {props.cameraRegion.cameraLongitude} </Text>
              <Text style={{fontSize:20}}>Map Camera Northeast latitude: {props.cameraRegion.cameraNELatitude} </Text>
              <Text style={{fontSize:20}}>Map Camera Northeast longtitude: {props.cameraRegion.cameraNELongitude} </Text>

              <Text style={{ fontSize: 25, fontWeight: "bold" }}>Trending</Text> */}

              <FlatList
                persistentScrollbar={true}
                style={{ height: 200, borderWidth: 1 }}
                keyExtractor={(item) => item.id.toString()}
                data={trending}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setTrendTitle(item.name);
                      //  setTweets(tweetResults.tweets);
                    }}
                  >
                    <Text style={styles.trendingText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              ></FlatList>

              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                Tweet of trending:{"\n"}
                {trendTitle}{" "}
              </Text>



              <FlatList
              persistentScrollbar={true}
                style={{ height: 300, borderWidth:1 }}
                keyExtractor={(item) => item.id.toString()}
                data={tweets}
                renderItem={({ item }) => (
                
                  <View style={{marginVertical:8}}>
                    <Text style={styles.tweetUserText}>{item.user}:</Text>                 
                  
                   <Text style={styles.tweetText} >{item.text}</Text>

                  </View>
         
                )}
              ></FlatList>
            </View>
          </View>

          <Button
            style={{ borderRadius: 15 }}
            mode="contained"
            // contentStyle={buttonContentStyle}
            onPress={toggleModal}
          >
            Close
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor:"transparent",
  },

  buttonContainer: {
    //supposed to show shadow in android but it doesn't
    //https://stackoverflow.com/questions/45972506/creating-a-ui-with-box-shadow-in-react-native
    elevation: 5,

    //shadow effect on IOS
    backgroundColor: "#2E9298",
    borderRadius: 15,
    padding: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 2.0,
  },

  trendingText: {
    fontSize: 20,
    marginVertical: 5,
    color: "blue",
  },

  tweetUserText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tweetText: {
    fontSize: 16,
  },
});

export default TwitterComponent;
