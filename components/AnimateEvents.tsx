import React from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import { useState, useRef } from "react";
import { StyleSheet, Image, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { Fontisto } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

import * as actions from "../store/actions/actions";
import { Text, View } from "../components/Themed";
import { isWithinInterval } from "date-fns/esm";



/*
on Play press
DisastersInRange = FiltereDisasters  // save The filteredDisaters for playback

const ShowMarkerOnDay = () => {

    tempArray = [];   // reset temp array
    // go through all events and mark which ones need to be filtered.
    const disastersOnDay = DisastersInRange.map((event) => {

        let startDate_ISO = event.currentDate.toISOString();

        let endDate;
        if (event.isClosed == null) {        // id isClosed is null then event is open so set endate to today
            let endDate = new Date().toISOString();
        }
        else { endDate = event.isClosed }   // else isClosed = endDate

        if (isWithinInterval(currentDate, { start: startDate_ISO, endDate })) { event.isShow = true }
        else {
            event.isShow = false;
        }
        return event
    });


    // create a new array from the array with correctly marked isShow prop
    disasterToFilter.forEach(element => {
        if (element.isShow) tempArray.push(element)
    })
    // send only the filtered events to the redux store
    dispatch(actions.setFilteredDisasters(tempArray));
};
*/