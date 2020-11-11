/**
 * Custom component to build an array of strings that range over a date and then return a urlTile object to be loaded
 * into the mapview. The intent is to change urlTiles using an external counter tied to setTimeout at approximately 1
 * second per tile.
 */

import { UrlTile } from "react-native-maps";
import React from "react"



const GIBSOverlay = (props) => {

<<<<<<< HEAD
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
=======
   // console.log(props.category.value + " category in gibs")
    let tempUrl = urlBuilder(props.category, props.date)

   if (props.category == "" || props.category == null || props.category == undefined || props.category == "none") { return null }
   else {
        let gibsTile = (<UrlTile

            urlTemplate={tempUrl}
            maximumZ={19}
            flipY={false}

        />)
        return (gibsTile);
    }



}

function urlBuilder(category, date) {
    let urlStart = 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/';                        //url being built

    let layer = category;             //category of url
    let urlDate = date;          //date of url string for testing

    //while loop to build url strings for building urlTiles for GIBSOverlay set in date range
    //while(firstDate != lastDate/*TODO: function from date-fns to add a day */){
    let tempUrl = urlStart;     //string to hold url string being built
>>>>>>> a8c1b61e12bda232e29288d1004a5af468329567

    //handle layer of url using matching GIBS category string
    if (layer == undefined) {
        tempUrl = '';
        console.log('Category undefined.')
        return tempUrl;
    }
<<<<<<< HEAD
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
=======
    if (layer == "") {
        tempUrl = '';
        return tempUrl;
    }
    if (layer == "clouds") tempUrl = tempUrl + 'MODIS_Aqua_Cloud_Phase_Optical_Properties/default/';
    if (layer == "temp") tempUrl = tempUrl + 'MODIS_Terra_Land_Surface_Temp_Day/default/';
    if (layer == "precipitation") tempUrl = tempUrl + 'IMERG_Precipitation_Rate/default/';
    if (layer == "wind") tempUrl = tempUrl + 'SSMI_DMSP_F17_Wind_Speed_Over_Oceans_Ascending/default/';
    if (layer == "pressure") tempUrl = tempUrl + 'MODIS_Terra_Cloud_Top_Pressure_Day/default/';
    if (layer == "none" || layer == "") {
        tempUrl = '';
        return tempUrl;
    }
    //handle date of url
    tempUrl = tempUrl + date;      //TODO: add date-fns and parse then format date from provided
    /*uncomment if tileMatrixSet is used later//handle tile matrix set to be associated with zoom level
    if(layer == 'clouds') tempUrl = tempUrl + '';
    if(layer == 'temp') tempUrl = tempUrl + '';
    if(layer == 'precipitation') tempUrl = tempUrl + '';
    if(layer == 'wind') tempUrl = tempUrl + '';
    if(layer == 'pressure') tempUrl = tempUrl + '';
    */
    //remove this if tile matrix set is not all the same thing
    if (layer == "clouds" || layer == "temp") { tempUrl = tempUrl + '/GoogleMapsCompatible_Level7/'; }
    else {
        tempUrl = tempUrl + '/GoogleMapsCompatible_Level6/';
    }

    //add tail of url template
    tempUrl = tempUrl + '{z}/{y}/{x}.png';
    // console.log("Url is: " + tempUrl)
    //add temp url to end of url array
    //urlArray.push(tempUrl)
    //console.log("Length of urlArry: " + urlArray.length);
    //}
    //return urlArray;
    console.log(tempUrl)
>>>>>>> a8c1b61e12bda232e29288d1004a5af468329567
    return tempUrl;
}

export default GIBSOverlay;