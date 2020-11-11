import CloudsLegend from '../assets/openWeatherKeys/cloudsKey.svg'
import PrecipitationKey from '../assets/openWeatherKeys/precipitationKey.svg'
import PressureKey from '../assets/openWeatherKeys/pressureKey.svg'
import TemperatureKey from '../assets/openWeatherKeys/temperature.svg'
import WindKey from '../assets/openWeatherKeys/windKey.svg';

import React from 'react';




/* This function creates the correct weather Legeend using an SVG file,
then returns this component. It takes two props, category and size to display. */
const WeatherLegend = (props) => {

    /* add categories to ENUM object, not sure how to extract the width and height here,
    there is probably a better way to do this so we dont have to repeat the height and width everytime.*/
    const categorySVG = {
        ["clouds"]: <CloudsLegend style={{ marginTop: 50 }} width={props.size} />,
        ["precipitation"]: <PrecipitationKey style={{ marginTop: 50 }} width={props.size} />,
        ["pressure"]: <PressureKey style={{ marginTop: 50 }} width={props.size} />,
        ["temp"]: <TemperatureKey style={{ marginTop: 50 }} width={props.size} />,
        ["wind"]: <WindKey style={{ marginTop: 50 }} width={props.size} />,
        ["none"]: null,

    }

    const weatherKey = categorySVG[props.category];

    if (!weatherKey) {
        console.log("Legend.tsx/WeatherLegend() - No weather of type" + props.category + " found");
        return null
    };

    return (weatherKey);

}

export default WeatherLegend;