
import { View, Text } from 'react-native';
import DisasterPin from "../components/CustomMarker";
import CustomModal from "../components/CustomModal";
import { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/actions";
import React, { useState } from 'react';

const EventMarkersOnMap = ({ events, callback }) => {


  const dispatch = useDispatch();
  const currentDisaster = useSelector(
    (state) => state.disaster.currentDisaster
  );

 //set current disaster on press of pin and call togglemodal callback
  const markerPress = (disaster) => {
    dispatch(actions.setCurrentDisaster(disaster));
    callback();
  };

  return (
    <View>
      {
        events.map
          (
            (marker, index) => {
              if (marker.isShow) {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: marker.LatL,
                      longitude: marker.LongL
                    }}
                    title={marker.title}
                    description={marker.description}
                    onPress={() => { markerPress(marker) }}
                  >
                    <DisasterPin
                      size={50}
                      category={marker.description}
                    />
                  </Marker>

                );
              }
            }
          )
      }
    </View>
  );
};

export default EventMarkersOnMap;