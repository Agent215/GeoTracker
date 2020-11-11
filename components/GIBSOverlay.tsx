/**
 * Custom component to build an array of strings that range over a date and then return a urlTile object to be loaded
 * into the mapview. The intent is to change urlTiles using an external counter tied to setTimeout at approximately 1
 * second per tile.
 */

import { UrlTile } from "react-native-maps";
import React from "react"



const GIBSOverlay = (props) => {

    //tempUrl is built into 
    let gibsUrl = urlBuilder(props.category, props.date)
    let gibsTile = (<UrlTile 
    urlTemplate={gibsUrl}
    maximumZ={19}
    flipY={false}
    />)

    return (gibsTile);
}

function urlBuilder(category, date){
    let urlStart = 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/';       //url being built
    let layer = category;                                                       //category of url                                                        //date of url string for testing

    //begin building URL
    let tempUrl = urlStart;

    //handle layer of url using matching GIBS category string
    if (layer == undefined) {
        tempUrl = '';
        console.log('Category undefined.')
        return tempUrl;
    }
    if (layer == ""){
        tempUrl = '';
        return tempUrl;
    }
    if (layer == "clouds") tempUrl = tempUrl + 'VIIRS_SNPP_Cloud_Effective_Radius/default/';
    if (layer == "temp") tempUrl = tempUrl + 'AIRS_L2_Surface_Skin_Temperature_Day/default/';
    if (layer == "precipitation") tempUrl = tempUrl + 'IMERG_Precipitation_Rate/default/';
    if (layer == "wind") tempUrl = tempUrl + 'CYGNSS_L3_Wind_Speed_Daily/default/';
    if (layer == "pressure") tempUrl = tempUrl + 'AIRS_L2_RelativeHumidity_500hPa_Day/default/';
    if (layer == "none"){
        tempUrl = '';
        return tempUrl;
    }

    //handle date of url
    tempUrl = tempUrl + date;

    //if clouds a different suffix is needed that other weather overlays
    if (layer == "clouds") {
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