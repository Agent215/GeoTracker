import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Switch } from 'react-native';
//import { Picker } from 'react-native';
//import { Picker } from '@react-native-community/picker'
//import { Dropdown } from 'react-native-material-dropdown'
//import ModalDropdown from 'react-native-modal-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

function FilterScreen() {
  let weather = [
    {label: 'Temperature', value: 'Temperature',},
    {label: 'Precipitation', value: 'Precipitation',},
    {label: 'Cloud Cover', value: 'Cloud Cover',},
    {label: 'Wind Speed', value: 'Wind Speed',},
    {label: 'Barometric Pressure', value: 'Barometric Pressure',},
  ]

  let event = [
    {label: 'All Events', value: 'All Events'},
    {label: 'Drought', value: 'Drought'},
    {label: 'Dust and Haze', value: 'Dust and Haze'},
    {label: 'Earthquakes', value: 'Earthquakes'},
    {label: 'Floods', value: 'Floods'},
    {label: 'Landslides', value: 'Landslides'},
    {label: 'Manmade', value: 'Manmade'},
    {label: 'Sea and Lake Ice', value: 'Sea and Lake Ice'},
    {label: 'Severe Storms', value: 'Severe Storms'},
    {label: 'Snow', value: 'Snow'},
    {label: 'Temperature Extremes', value: 'Temperature Extremes'},
    {label: 'Volcanoes', value: 'Volcanoes'},
    {label: 'Water Color', value: 'Water Color'},
    {label: 'Wildfires', value: 'Wildfires'},
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
            containerStyle={{width: 180, height: 50}}
            onChangeItem={item => setWeatherValue(item.value)}
            />
            <Switch
              style={{width: 50, height: 50}}
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
            containerStyle={{width: 180, height: 50}}
            onChangeItem={item => setEventValue(item.value)}
            />
            <Switch
              style={{width: 50, height: 50}}
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