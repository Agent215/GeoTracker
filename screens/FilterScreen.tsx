import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Switch } from 'react-native';
//import { Picker } from 'react-native';
//import { Picker } from '@react-native-community/picker'
import { Dropdown } from 'react-native-material-dropdown'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

function FilterScreen() {
  let weatherValues = [
    {value: 'Temperature',},
    {value: 'Precipitation',},
    {value: 'Cloud Cover',},
    {value: 'Wind Speed',},
    {value: 'Barometric Pressure',},
  ]

  let eventValues = [
    {value: 'All Events'},
    {value: 'Drought'},
    {value: 'Dust and Haze'},
    {value: 'Earthquakes'},
    {value: 'Floods'},
    {value: 'Landslides'},
    {value: 'Manmade'},
    {value: 'Sea and Lake Ice'},
    {value: 'Severe Storms'},
    {value: 'Snow'},
    {value: 'Temperature Extremes'},
    {value: 'Volcanoes'},
    {value: 'Water Color'},
    {value: 'Wildfires'},
  ]

  const [selectedWeather, setSelectedWeather] = useState("temp");
  const [selectedEvents, setSelectedEvents] = useState("drought");
  const [isWeatherEnabled, setWeatherIsEnabled] = useState(false);
  const toggleWeatherSwitch = () => setWeatherIsEnabled(previousState => !previousState);
  const [isEventEnabled, setEventIsEnabled] = useState(false);
  const toggleEventSwitch = () => setEventIsEnabled(previousState => !previousState);
  return (

    <View style={styles.container}>
      <View style={styles.groupBox}>
        <Text style={styles.textBox}>Weather</Text>
          <View style={styles.doubleGroup}>
            <Dropdown
              label='Choose Weather'
              data={weatherValues}
              containerStyle={{flex:1}}              
            />
            <Switch
              style={styles.switchBox}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isWeatherEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleWeatherSwitch}
              value={isWeatherEnabled}
            />
          </View>
      </View>
      <View style={styles.groupBox}>
        <Text style={styles.textBox}>Events</Text>
        <View style={styles.doubleGroup}>
          <Dropdown
            label='Choose Event'
            data={eventValues}
            containerStyle={{flex:1}}
          />
          <Switch
            style={styles.switchBox}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEventEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleEventSwitch}
            value={isEventEnabled}
          />

        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#eaeaea',
    alignItems: 'stretch',
  },
  groupBox: {
    height: 150,
    alignItems: 'stretch',
    borderTopColor: 'darkgray',
    borderTopWidth: 1,
    backgroundColor: 'lightgray'
  },
  doubleGroup: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderBottomColor: 'darkgray',
    borderBottomWidth: 1,
    backgroundColor: 'lightgray'
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