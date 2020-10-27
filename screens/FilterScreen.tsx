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
    { label: 'Temperature', value: 'Temperature', },
    { label: 'Precipitation', value: 'Precipitation', },
    { label: 'Cloud Cover', value: 'Cloud Cover', },
    { label: 'Wind Speed', value: 'Wind Speed', },
    { label: 'Barometric Pressure', value: 'Barometric Pressure', },
    { label: 'None', value: 'none' }
  ]

  let event = [
    { label: 'All Events', value: 'all' },
    { label: 'Drought', value: 'drought' },
    { label: 'Dust and Haze', value: 'dustHaze' },
    { label: 'Earthquakes', value: 'earthquakes' },
    { label: 'Floods', value: 'floods' },
    { label: 'Landslides', value: 'landslides' },
    { label: 'Manmade', value: 'manmade' },
    { label: 'Sea and Lake Ice', value: 'seaLakeIce' },
    { label: 'Severe Storms', value: 'severeStorms' },
    { label: 'Snow', value: 'snow' },
    { label: 'Temperature Extremes', value: 'tempExtremes' },
    { label: 'Volcanoes', value: 'volcanoes' },
    { label: 'Water Color', value: 'waterColor' },
    { label: 'Wildfires', value: 'wildfires' },
    { label: 'None', value: 'none' }
  ]

  const [weatherValue, setWeatherValue] = useState(null);
  const [weatherItems, setWeatherItems] = useState(weather);
  let weatherController;

  const [eventValue, setEventValue] = useState(null);
  const [eventItems, setEventItems] = useState(event);
  let eventController;

  return (

    <View style={styles.container}>

      <DropDownPicker
        items={weatherItems}
        controller={instance => weatherController = instance}
        onChangeList={(items, callback) => {
          new Promise((resolve, reject) => resolve(setWeatherItems(items)))
            .then(() => callback())
            .catch(() => { });
        }}
        defaultValue={weatherValue}
        dropDownMaxHeight={600}
        placeholder='Select Weather'
        containerStyle={{ flex: 3, height: 50 }}
        onChangeItem={(item) => { dispatch(actions.setWeatherFilter(item)); }}
      />

      <DropDownPicker
        items={eventItems}
        controller={instance => eventController = instance}
        dropDownMaxHeight={500}
        onChangeList={(items, callback) => {
          new Promise((resolve, reject) => resolve(setEventItems(items)))
            .then(() => callback())
            .catch(() => { });
        }}
        defaultValue={eventValue}
        placeholder='Select Event'
        containerStyle={{ flex: 3, height: 50 }}
        onChangeItem={(item) => { dispatch(actions.setDisasterFilter(item)); }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },

});

export default FilterScreen;