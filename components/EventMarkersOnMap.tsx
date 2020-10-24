
import {View, Text} from 'react-native';
import DisasterPin from "../components/CustomMarker";
import CustomModal from "../components/CustomModal";
import {  Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/actions";
import React, { useState } from 'react';

const EventMarkersOnMap = ({events}) => {
    console.log("from another world");
    console.log(events);


    const dispatch = useDispatch();
  const currentDisaster = useSelector(
    (state) => state.disaster.currentDisaster
  );
    

    return(
        <View>
          {
              events.map
              (
                (marker) =>{         
                 if(marker.isShow){
                 return(         
                   <Marker
                     key={marker.id}
                     coordinate={{
                       latitude: marker.LatL,
                       longitude: marker.LongL
                     }}
                     title={marker.title}
                     description={marker.description}
                     
                   >
                     <DisasterPin
                       size={50}
                       category={marker.description}
                     />
                   </Marker>
     
                 );}
                 }
               )
          }
        </View>
    );
};

export default EventMarkersOnMap;