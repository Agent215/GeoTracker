import * as React from "react";
import { useState } from "react";
import { StyleSheet, Image,Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions/actions";
import { Text, View } from "../components/Themed";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Fontisto } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

function FilterScreen() {
  const dispatch = useDispatch();

  let weather = [
    { label: "Temperature", value: "Temperature" },
    { label: "Precipitation", value: "Precipitation" },
    { label: "Cloud Cover", value: "Cloud Cover" },
    { label: "Wind Speed", value: "Wind Speed" },
    { label: "Barometric Pressure", value: "Barometric Pressure" },
    { label: "None", value: "none" },
  ];

  let event = [
    { label: "All Events", value: "all" },
    { label: "Drought", value: "drought" },
    { label: "Dust and Haze", value: "dustHaze" },
    { label: "Earthquakes", value: "earthquakes" },
    { label: "Floods", value: "floods" },
    { label: "Landslides", value: "landslides" },
    { label: "Manmade", value: "manmade" },
    { label: "Sea and Lake Ice", value: "seaLakeIce" },
    { label: "Severe Storms", value: "severeStorms" },
    { label: "Snow", value: "snow" },
    { label: "Temperature Extremes", value: "tempExtremes" },
    { label: "Volcanoes", value: "volcanoes" },
    { label: "Water Color", value: "waterColor" },
    { label: "Wildfires", value: "wildfires" },
    { label: "None", value: "none" },
  ];

  const [weatherValue, setWeatherValue] = useState(null);
  const [weatherItems, setWeatherItems] = useState(weather);
  let weatherController;

  const [eventValue, setEventValue] = useState(null);
  const [eventItems, setEventItems] = useState(event);
  let eventController;

  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(
    false
  );

  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const initialStartDate = new Date(2019,0,1);
  const initialEndDate = new Date();
  const [startDate, setStartDate] = useState(initialStartDate);

  const [endDate, setEndDate] = useState(initialEndDate);

  //test commit

  let eventItem=null;
  let weatherItem=null;
  const setEventItem=(eventItemPicked) => {
    eventItem=eventItemPicked;
  }
  const setWeatherItem=(weatherItemPicked) => {
    weatherItem = weatherItemPicked;
  }


  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleStartDateConfirm = (date) => {
    console.log("Start Date Picked: ", date);

    //VALID start date chosen
    if (checkValidDateRange(date, endDate)) {
      console.log("valid start date!!!!");
      setStartDate(date);

      hideStartDatePicker();
    }
    //invalid start date chosen
    else {
      console.log("invalid starting date");

      setStartDate(date);

      hideStartDatePicker();
    }
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndDateConfirm = (date) => {
    console.log("End Date Picked: ", date);

    //valid end date chosen
    if (checkValidDateRange(startDate, date)) {
      console.log("valid end date!!");
      setEndDate(date);
      hideEndDatePicker();
    }
    //invalid end date chosen
    else {
      console.log("invalid end date");
      setEndDate(date);
      hideEndDatePicker();
    }
  };

  //idea:
  // have a function to set the date range first,
  // then dispatch somthing to the redux store.
  const checkValidDateRange = (startDate, endDate) => {
    // console.log("check validation start: " + startDate);
    // console.log("check validation end: " + endDate);
    return endDate >= startDate;
  };

  return (
    <View style={styles.grandContainer}>
      <View style={styles.datePickerContianer}>
        <View
          style={{ flexDirection: "row", flex: 1, backgroundColor: "white" }}
        >
          <Text
            style={{ flex: 3, fontSize: 16, color: "black" }}
          >{`Start date: ${startDate.toDateString()}`}</Text>

          <TouchableOpacity
            style={{ flex: 1, backgroundColor: "white" }}
            onPress={showStartDatePicker}
          >
            <Fontisto name="date" size={35} color="green" />
            <DateTimePickerModal
              // date={initialStartDate}
              // isDarkModeEnabled={true}
              isVisible={isStartDatePickerVisible}
              mode="date"
              display="spinner"
              onConfirm={handleStartDateConfirm}
              onCancel={hideStartDatePicker}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{ flexDirection: "row", flex: 1, backgroundColor: "white" }}
        >
          <Text
            style={{ flex: 3, fontSize: 16, color: "black" }}
          >{`End date:  ${endDate.toDateString()}`}</Text>

          <TouchableOpacity style={{ flex: 1 }} onPress={showEndDatePicker}>
            <Fontisto name="date" size={35} color="green" />

            <DateTimePickerModal
              isVisible={isEndDatePickerVisible}
              // isDarkModeEnabled={true}
              mode="date"
              display="spinner"
              onConfirm={handleEndDateConfirm}
              onCancel={hideEndDatePicker}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <DropDownPicker
          items={weatherItems}
          controller={(instance) => (weatherController = instance)}
          onChangeList={(items, callback) => {
            new Promise((resolve, reject) => resolve(setWeatherItems(items)))
              .then(() => callback())
              .catch(() => {});
          }}
          defaultValue={weatherValue}
          dropDownMaxHeight={300}
          placeholder="Select Weather"
          containerStyle={{ flex: 3, height: 50 }}
          selectedLabelStyle={{color:"blue"}}
          
          onChangeItem={(item) => {
            setWeatherItem(item);
          }}
        />

        <DropDownPicker
          items={eventItems}
          controller={(instance) => (eventController = instance)}
          dropDownMaxHeight={300}
          onChangeList={(items, callback) => {
            new Promise((resolve, reject) => resolve(setEventItems(items)))
              .then(() => callback())
              .catch(() => {});
          }}
          defaultValue={eventValue}
          placeholder="Select Event"
          containerStyle={{ flex: 3, height: 50 }}
          selectedLabelStyle={{color:"blue"}}
          onChangeItem={(item) => {
            
            // console.log("item filter is:");
            // console.log(item);
            setEventItem(item);
            
          }}
        />
      </View>

      
      <View style={styles.buttonContainer}>

        <TouchableOpacity
            style={{flexDirection:"row",
                  zIndex:-1,
                  alignSelf:"center",
                   alignItems:"flex-start",
                   width:"48%"
            }}
            onPress={() => {
            
            //eventItem is empty by default,
            // only triger event filter if event dropdown is changed 
            if(eventItem==null)
            {//donothing for default event filter option, hence reduce render burden
            }
            else{
              console.log("event filter triggered!");
              dispatch(actions.setDisasterFilter(eventItem));

            }

            //weatehrItem is empty by default,
            //only triger weatehr filter if weaterh dropdown is changed.
            if(weatherItem==null)
            {//do nothing for default weather filter option, hence reduce render burden              
            }
            else{
              console.log("weather filter triggered!");
              dispatch(actions.setWeatherFilter(weatherItem));
            }

            
            //only triger date filter if the date range is valid
            if(checkValidDateRange(startDate,endDate)){
              console.log("date filter triggered");
              dispatch(actions.setDateFilter(startDate,endDate));
            }

          }}
        >
         
         <Image
          style={{ resizeMode:"stretch", flex:1,}}
         source={require("../assets/Icons/FilterButton.png")}></Image>

        </TouchableOpacity>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grandContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "white",
  },

  filterContainer: {
    flex: 3.5,
    flexDirection: "row",
    // backgroundColor: "purple",
    // ...Platform.select({
    //   ios: {
       
    //   },
    //   android: {
        
    //   }
    // })
    
    // The solution: Apply zIndex to any device except Android
    ...(Platform.OS !== 'android' && {
      zIndex: 10
    }),
        
  },

  datePickerContianer: {
    
    justifyContent: "space-evenly",
    alignItems: "stretch",
    flex: 1,
    flexDirection: "column",
    // backgroundColor: "white",
  },
  buttonContainer: {
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center",
       height:"28%",
      //  width:"30%",
      //  zIndex:-1, //freeze up the dropdown button, bug of the component    
       
    // backgroundColor: "green",
  },
});

export default FilterScreen;
