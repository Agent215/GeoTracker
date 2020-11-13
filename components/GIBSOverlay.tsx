/**
 * Custom component to build an array of strings that range over a date and then return a urlTile object to be loaded
 * into the mapview. The intent is to change urlTiles using an external counter tied to setTimeout at approximately 1
 * second per tile.
 */

import { UrlTile } from "react-native-maps";
import React from "react"



const GIBSOverlay = (props) => {

    let gibsTile = null;
    if(props.gibsVisible && (props.category != undefined || props.category != "" || props.category != "none")){    
        //tempUrl is built into 
        let gibsUrl = urlBuilder(props.category, props.date)
        gibsTile = (<UrlTile 
        urlTemplate={gibsUrl}
        maximumZ={6}
        flipY={false}
        key={Date.now()}
        />)
    };

    return (gibsTile);
}

function urlBuilder(category, date){
    let urlStart = 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/';       //url being built
    let layer = category;                                                       //category of url                                                        //date of url string for testing

    //begin building URL
    let tempUrl = urlStart;

    //handle layer of url using matching GIBS category string
    if (layer == "clouds") tempUrl = tempUrl + 'MODIS_Aqua_Cloud_Phase_Optical_Properties/default/';
    if (layer == "temp") tempUrl = tempUrl + 'MODIS_Terra_Land_Surface_Temp_Day/default/';
    if (layer == "precipitation") tempUrl = tempUrl + 'IMERG_Precipitation_Rate/default/';
    if (layer == "wind") tempUrl = tempUrl + 'SSMI_DMSP_F17_Wind_Speed_Over_Oceans_Ascending/default/';
    if (layer == "pressure") tempUrl = tempUrl + 'MODIS_Terra_Cloud_Top_Pressure_Day/default/';

    //handle date of url
    tempUrl = tempUrl + date;

    //if clouds a different suffix is needed that other weather overlays
    if (layer == "clouds" || layer == "temp") {
        tempUrl = tempUrl + '/GoogleMapsCompatible_Level7/';
    }
    else {
        tempUrl = tempUrl + '/GoogleMapsCompatible_Level6/';
    };
    
    //add tail of url template
    tempUrl = tempUrl + '{z}/{y}/{x}.png';
    console.log("Url is: " + tempUrl)

    //return completed url string
    return tempUrl;
}

export default GIBSOverlay;