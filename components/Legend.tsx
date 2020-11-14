import CloudsLegend from '../assets/openWeatherKeys/cloudsKey.svg'
import PrecipitationKey from '../assets/openWeatherKeys/precipitationKey.svg'
import PressureKey from '../assets/openWeatherKeys/pressureKey.svg'
import TemperatureKey from '../assets/openWeatherKeys/temperature.svg'
import WindKey from '../assets/openWeatherKeys/windKey.svg';

import GibsCloudsKeyfrom from '../assets/gibsKeys/MODIS_Terra_Cloud_Phase_Optical_Properties_V.svg';
import GibsPrecipitationKey from '../assets/gibsKeys/AMSR2_Surface_Precipitation_Rate_Day_H.svg';
import GibsPressureKey from '../assets/gibsKeys/MODIS_Terra_Cloud_Top_Pressure_Day_H.svg';
import GibsTemperatureKey from '../assets/gibsKeys/MODIS_Terra_Land_Surface_Temp_Day_H.svg';
import GibsWindKey from '../assets/gibsKeys/SSMI_Wind_Speed_Over_Oceans_Ascending_H.svg';

import React from 'react';




/* This function creates the correct weather Legeend using an SVG file,
then returns this component. It takes two props, category and size to display. */
const WeatherLegend = (props) => {

    let weatherKey;
    /* add categories to ENUM object, not sure how to extract the width and height here,
    there is probably a better way to do this so we dont have to repeat the height and width everytime.*/
    const openWeatherSVG = {
        ["clouds"]: <CloudsLegend style={{ marginTop: 40 }} width={props.size} />,
        ["precipitation"]: <PrecipitationKey style={{ marginTop: 40 }} width={props.size} />,
        ["pressure"]: <PressureKey style={{ marginTop: 40 }} width={props.size} />,
        ["temp"]: <TemperatureKey style={{ marginTop: 40 }} width={props.size} />,
        ["wind"]: <WindKey style={{ marginTop: 40 }} width={props.size} />,
        ["none"]: null,

    }

    const gibsSVG = {
        ["clouds"]: <GibsCloudsKeyfrom style={{ marginTop: 30 , marginRight:250}} width={props.size -100} />,
        ["precipitation"]: <GibsPrecipitationKey style={{ marginTop: 30 }} width={props.size -100} />,
        ["pressure"]: <GibsPressureKey style={{ marginTop: 30 }} width={props.size -100} />,
        ["temp"]: <GibsTemperatureKey style={{ marginTop: 30 }} width={props.size -100} />,
        ["wind"]: <GibsWindKey style={{ marginTop: 30 }} width={props.size -100} />,
        ["none"]: null,

    }

    if (props.gibsVisible) {
         weatherKey = gibsSVG[props.category];

    } else {
         weatherKey = openWeatherSVG[props.category];
    }


    if (!weatherKey) {
        console.log("Legend.tsx/WeatherLegend() - No weather of type" + props.category + " found");
        return null
    };

    return (weatherKey);

}

export default WeatherLegend;