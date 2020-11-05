import * as React from "react";
import { useState, useRef } from "react";
import { StyleSheet, Image, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions/actions";
import { Text, View } from "../components/Themed";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Fontisto } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

function FilterScreen() {
  const dispatch = useDispatch();

  let weather = [
    { label: "Temperature", value: "temp" },
    { label: "Precipitation", value: "precipitation" },
    { label: "Cloud Cover", value: "clouds" },
    { label: "Wind Speed", value: "wind" },
    { label: "Barometric Pressure", value: "pressure" },
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

  const [weatherValue, setWeatherValue] = useState({ label: null, value: null });
  const [eventValue, seteventValue] = useState({ label: null, value: null });
  let weatherController;    // use these controller to access methods on filters
  let eventController;
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(
    false
  );
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const startDateOnPicker = useRef(new Date(2019, 0, 1));
  const endDateOnPicker = useRef(new Date());
  const [startDate, setStartDate] = useState(new Date(2019, 0, 1));
  const [endDate, setEndDate] = useState(new Date());


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
      // console.log("valid start date!!!!");
      setStartDate(date);
      hideStartDatePicker();
    }
    //invalid start date chosen
    else {
      // console.log("invalid starting date");

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
      // console.log("valid end date!!");
      setEndDate(date);
      hideEndDatePicker();
    }
    //invalid end date chosen
    else {
      // console.log("invalid end date");
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
      <View style={styles.buttonContainer}>
        <Button
          icon="play-circle-outline"
          mode="contained"
          contentStyle={{ backgroundColor: "green" }}
          labelStyle={{ fontSize: 20 }}
          onPress={() => {
            //eventItem is empty by default,
            // only triger event filter if event dropdown is changed
            if (eventValue == null) {
              //donothing for default event filter option, hence reduce render burden
              console.log("event Item " + eventValue)
            } else {
              console.log("event filter triggered!");
              dispatch(actions.setDisasterFilter(eventValue));
            }

            //weatehrItem is empty by default,
            //only triger weatehr filter if weaterh dropdown is changed.
            if (weatherValue == null) {
              //do nothing for default weather filter option, hence reduce render burden
              console.log("weather Item " + weatherValue)
            } else {
              console.log("weather filter triggered!");
              dispatch(actions.setWeatherFilter(weatherValue));
            }

            //only triger date filter if the date range is valid
            if (checkValidDateRange(startDate, endDate)) {
              console.log("date filter triggered");
              dispatch(actions.setDateFilter(startDate, endDate));
            }
          }}
        >
          Start Filter
        </Button>
      </View>

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
              date={startDateOnPicker.current}
              // isDarkModeEnabled={true}
              isVisible={isStartDatePickerVisible}
              mode="date"
              display="spinner"
              onConfirm={(date) => {
                handleStartDateConfirm(date);
                startDateOnPicker.current = date;
              }}
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
              date={endDateOnPicker.current}
              // isDarkModeEnabled={true}
              mode="date"
              display="spinner"
              onConfirm={(date) => {
                handleEndDateConfirm(date);
                endDateOnPicker.current = date;
              }
              }
              onCancel={hideEndDatePicker}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <DropDownPicker
          items={weather}
          controller={(instance) => (weatherController = instance)}
          defaultValue={null}
          dropDownMaxHeight={300}
          placeholder="Select Weather"
          containerStyle={{ flex: 3, height: 50 }}
          selectedLabelStyle={{ color: "blue" }}
          onChangeItem={(item) => {
            console.log("weather filter is:");
            console.log(item);
            setWeatherValue(item);
          }}
        />

        <DropDownPicker
          items={event}
          controller={(instance) => (eventController = instance)}
          dropDownMaxHeight={300}
          defaultValue={null}
          placeholder="Select Event"
          containerStyle={{ flex: 3, height: 50 }}
          selectedLabelStyle={{ color: "blue" }}
          onChangeItem={(item) => {
            console.log("event filter is:");
            console.log(item);
            seteventValue(item);
          }}
        />
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
    // The solution: Apply zIndex to any device except Android
    ...(Platform.OS !== "android" && {
      zIndex: 10,
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
    // alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
  },
});

export default FilterScreen;
