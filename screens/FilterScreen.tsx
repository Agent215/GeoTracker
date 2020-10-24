import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Switch } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/actions";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

function FilterScreen() {

  const dispatch = useDispatch();

  let weather = [
    {label: 'Temperature', value: 'Temperature',},
    {label: 'Precipitation', value: 'Precipitation',},
    {label: 'Cloud Cover', value: 'Cloud Cover',},
    {label: 'Wind Speed', value: 'Wind Speed',},
    {label: 'Barometric Pressure', value: 'Barometric Pressure',},
  ]

  let event = [
    {label: 'All Events', value: 'all'},
    {label: 'Drought', value: 'drought'},
    {label: 'Dust and Haze', value: 'dustHaze'},
    {label: 'Earthquakes', value: 'earthquakes'},
    {label: 'Floods', value: 'floods'},
    {label: 'Landslides', value: 'landslides'},
    {label: 'Manmade', value: 'manmade'},
    {label: 'Sea and Lake Ice', value: 'seaLakeIce'},
    {label: 'Severe Storms', value: 'severeStorms'},
    {label: 'Snow', value: 'snow'},
    {label: 'Temperature Extremes', value: 'tempExtremes'},
    {label: 'Volcanoes', value: 'volcanoes'},
    {label: 'Water Color', value: 'waterColor'},
    {label: 'Wildfires', value: 'wildfires'},
  ]

  const [weatherValue, setWeatherValue] = useState(null);
  const [weatherItems, setWeatherItems] = useState(weather);
  let weatherController;

  const [eventValue, setEventValue] = useState(null);
  const [eventItems, setEventItems] = useState(event);
  let eventController;
  
  
  //const [selectedEvents, setSelectedEvents] = useState("drought");
  
  const [isWeatherEnabled, setWeatherIsEnabled] = useState(false);
  const toggleWeatherSwitch = () => setWeatherIsEnabled(previousState => !previousState);
  const [isEventEnabled, setEventIsEnabled] = useState(false);
  const toggleEventSwitch = () => setEventIsEnabled(previousState => !previousState);
  
  return (

    <View style={styles.container}>
          
            <DropDownPicker
            items={weatherItems}
            controller={instance => weatherController = instance}
            onChangeList={(items, callback) => {
                new Promise((resolve, reject) => resolve(setWeatherItems(items)))
                    .then(() => callback())
                    .catch(() => {});
            }}
            defaultValue={weatherValue}
            placeholder='Select Weather'
            containerStyle={{flex:3, height: 50}}
            onChangeItem={(item)=> { dispatch(actions.setWeatherFilter(item));}}
            />
            <Switch
              style={{flex:1, height: 30}}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isWeatherEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleWeatherSwitch}
              value={isWeatherEnabled}
            />
            <DropDownPicker
            items={eventItems}
            controller={instance => eventController = instance}
            onChangeList={(items, callback) => {
                new Promise((resolve, reject) => resolve(setEventItems(items)))
                    .then(() => callback())
                    .catch(() => {});
            }}
            defaultValue={eventValue}
            placeholder='Select Event'
            containerStyle={{flex:3, height: 50}}
            onChangeItem={(item)=> { dispatch(actions.setDisasterFilter(item));}}
            />
            <Switch
              style={{flex:1, height: 30}}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEventEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleEventSwitch}
              value={isEventEnabled}
            />
          </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  groupBox: {
    height: 150,
    alignItems: 'stretch',
  },
  doubleGroup: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  textBox: {
    flex: 1,
    fontSize: 24,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  switchBox: {
    width: 50
  }
});

export default FilterScreen;