import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
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

  const initialStartDate = new Date();
  const initialEndDate = new Date();
  const [startDate, setStartDate] = useState(initialStartDate);

  const [endDate, setEndDate] = useState(initialEndDate);

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleStartDateConfirm = (date) => {
    console.log("Start Date Picked: ", date);
    setStartDate(date);
    hideStartDatePicker();
  };


  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndDateConfirm = (date) => {
    console.log("End Date Picked: ", date);
    setEndDate(date);
    hideEndDatePicker();
  };

  return (
    <View style={styles.grandContainer}>
      <View style={styles.datePickerContianer}>
        <View style={{ flexDirection: "row", flex: 1, backgroundColor: "white" }}>
          <Text
            style={{ flex: 3, fontSize: 16, color: "black" }}
          >{`Start date: ${startDate.toDateString()}`}</Text>

          <TouchableOpacity style={{ flex: 1, backgroundColor: "white" }} onPress={showStartDatePicker} >
            <Fontisto name="date" size={35} color="black" />
            <DateTimePickerModal
              isVisible={isStartDatePickerVisible}
              mode="date"
              display="spinner"
              onConfirm={handleStartDateConfirm}
              onCancel={hideStartDatePicker}

            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", flex: 1, backgroundColor: "white" }}>
          <Text
            style={{ flex: 3, fontSize: 16, color: "black" }}
          >{`End date:  ${endDate.toDateString()}`}</Text>

          <TouchableOpacity style={{ flex: 1 }} onPress={showEndDatePicker}>
            <Fontisto name="date" size={35} color="black" />

            <DateTimePickerModal
              isVisible={isEndDatePickerVisible}
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
              .catch(() => { });
          }}
          defaultValue={weatherValue}
          dropDownMaxHeight={400}
          placeholder="Select Weather"
          containerStyle={{ flex: 3, height: 50 }}
          onChangeItem={(item) => {
            dispatch(actions.setWeatherFilter(item));
          }}
        />

        <DropDownPicker
          items={eventItems}
          controller={(instance) => (eventController = instance)}
          dropDownMaxHeight={400}
          onChangeList={(items, callback) => {
            new Promise((resolve, reject) => resolve(setEventItems(items)))
              .then(() => callback())
              .catch(() => { });
          }}
          defaultValue={eventValue}
          placeholder="Select Event"
          containerStyle={{ flex: 3, height: 50 }}
          onChangeItem={(item) => {
            dispatch(actions.setDisasterFilter(item));
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
    backgroundColor: "white"
  },

  filterContainer: {
    flex: 4,
    flexDirection: "row",
    // backgroundColor: "purple",
  },

  datePickerContianer: {
    justifyContent: "space-evenly",
    alignItems: "stretch",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "green",
  },
});

export default FilterScreen;
