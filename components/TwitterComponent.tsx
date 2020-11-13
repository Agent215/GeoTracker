import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, FlatList } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { red100 } from "react-native-paper/lib/typescript/src/styles/colors";
import useResults from "../hooks/useResult";


function TwitterComponent(props) {

  const [isModalVisible, setModalVisible] = useState(false);
  const [trendsApi, results, errorMessage] = useResults();


  let [trending, setTrending] = useState([
    { rank: 1, name: "a trending name1" },
    { rank: 2, name: "a trending name2" },
    { rank: 3, name: "a trending name3" },
    { rank: 4, name: "a trending name4" },
    { rank: 5, name: "a trending name5" },
    { rank: 6, name: "a trending name6" },
    { rank: 7, name: "a trending name7" },
    { rank: 8, name: "a trending name8" },
    { rank: 9, name: "a trending name9" },
    { rank: 10, name: "a trending name10" },
    { rank: 11, name: "a trending name11" },
    { rank: 12, name: "a trending name12" },
    { rank: 13, name: "a trending name13" },
    { rank: 14, name: "a trending name14" },
    { rank: 15, name: "a trending name15" },
    { rank: 16, name: "a trending name16" },
    { rank: 17, name: "a trending name17" },
    { rank: 18, name: "a trending name18" },
    { rank: 19, name: "a trending name19" },
    { rank: 20, name: "a trending name20" },
    { rank: 21, name: "a trending name21" },
    { rank: 22, name: "a trending name22" },
    { rank: 23, name: "a trending name23" },
    { rank: 24, name: "a trending name24" },
    { rank: 25, name: "a trending name25" },
    { rank: 26, name: "a trending name26" },
    { rank: 27, name: "a trending name27" },
    { rank: 28, name: "a trending name28" },
    { rank: 29, name: "a trending name29" },
    { rank: 30, name: "a trending name30" },
  ]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ flex: 1, alignSelf: "center", padding: 10 }}
        onPress={
          () => {
          toggleModal();
          console.log("tw component line 62");
          // console.log(props);
          console.log(results);
          console.log(errorMessage);
          
          
          
          }
          
        }
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
            <ScrollView
              persistentScrollbar={true}
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
            
              <Text style={{fontSize:20}}>Map Camera latitude: {props.cameraRegion.cameraLatitude} </Text>
              <Text style={{fontSize:20}}>Map Camera longtitude: {props.cameraRegion.cameraLongitude} </Text>
              <Text style={{fontSize:20}}>Map Camera Northeast latitude: {props.cameraRegion.cameraNELatitude} </Text>
              <Text style={{fontSize:20}}>Map Camera Northeast longtitude: {props.cameraRegion.cameraNELongitude} </Text>

              <Text style={{ fontSize: 25, fontWeight: "bold" }}>Trending</Text>

              <FlatList
              style={{height:200}}
                keyExtractor={(item) => item.name}
                data={trending}
                renderItem={({ item }) => (
                  <Text style={styles.trendingText}>{item.name}</Text>
                )}
              ></FlatList>
            </ScrollView>
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
});

export default TwitterComponent;
