import React, { useEffect, useState } from "react";
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

  // console.log(props.tweetResult.tweets);
  
  let [trending, setTrending] = useState([]);
  let [tweets, setTweets]=useState(props.tweetResult.tweets);

  let [trendTitle, setTrendTitle] = useState("");

  const [tweetApi, tweetResults, tweetErrorMessage] = useTwitterTweetsResults();

  const [isModalVisible, setModalVisible] = useState(false);


  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };



  //One degree of latitude equals approximately 364,000 feet (69 miles),
  //One-degree of longitude equals 288,200 feet (54.6 miles)
  const getRadius =(lat1, lat2, long1,long2) => {
    
    return Math.abs(lat1-lat2)>=Math.abs(long1-long2)?Math.abs(lat1-lat2)*69:Math.abs(long1-long2)*54.6;
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ flex: 1, alignSelf: "center", padding: 10 }}
        onPress={() => {
          toggleModal();
          // console.log("tw component line 62");
          
          let trendsData = props.trendsResult.trends.map((trend,index) => {
            return { name: trend, id:index };
          });
    
          console.log(trendsData);
          setTrending(trendsData);
          
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
              <Text style={{fontSize:20}}>Map Camera Northeast longtitude: {props.cameraRegion.cameraNELongitude} </Text> */}

              <Text style={{ fontSize: 25, fontWeight: "bold" }}>Trending</Text>

              <FlatList
                persistentScrollbar={true}
                style={{ height: 200,  borderWidth:1}}
                keyExtractor={(item) => item.id.toString()}
                data={trending}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={   () => {

                      setTrendTitle(item.name);

                      console.log("\n\n\n\n\n");
                      // console.log(item.name);

                      
                      let radius = getRadius(
                        props.cameraRegion.cameraLatitude,
                        props.cameraRegion.cameraNELatitude,
                        props.cameraRegion.cameraLongitude,
                        props.cameraRegion.cameraNELongitude
                        )
                        console.log(radius);
                       tweetApi(item.name,props.cameraRegion.cameraLatitude,props.cameraRegion.cameraLongitude,radius);

                      let tweetsData = tweetResults.tweets;
                     
                      console.log(tweetsData);
                      setTweets(tweetResults.tweets);
                      // console.log(tweets);
                    }}
                  >
                    <Text style={styles.trendingText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              ></FlatList>


              <Text style={{ fontSize: 25, fontWeight: "bold" }}>Tweet of trending:{"\n"}{trendTitle} </Text>
              <FlatList
              persistentScrollbar={true}
                style={{ height: 300, borderWidth:1 }}
                keyExtractor={(item) => item.id.toString()}
                data={tweets}
                renderItem={({ item }) => (
                
              
                    <Text style={styles.tweetText}>{item.user}: {item.text}</Text>
         
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
  },

  tweetText:{
    fontSize: 16,
    marginVertical: 8,
  }
});

export default TwitterComponent;
