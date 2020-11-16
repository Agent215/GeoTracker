import { UrlTile } from "react-native-maps";
import React from "react"


/**
 * This is not an elegent solution 
 * The urlTemplate prop in the UrlTile prop seems to not rerender with a variable or state passed
 * This is a hacky work around. 
 */
const WeatherOverlay = (props) => {

    let weather;
    let clouds = (
        <UrlTile
            key={Date.now()}
            urlTemplate={'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=f0f9f21de27e796dc9cb4943c6a34ecc'}
            maximumZ={19}
            flipY={false}
          
        />

    );
    let temp = (
        <UrlTile
            key={Date.now()}
            urlTemplate={'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=242e0063ccc5945c78753d4abe86d54a'}
            maximumZ={19}
            flipY={false}
          
        />

    );
    let precip = (
        <UrlTile
            key={Date.now()}
            urlTemplate={'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=242e0063ccc5945c78753d4abe86d54a'}
            maximumZ={19}
            flipY={false}
           
        />

    );
    let pressure = (
        <UrlTile
            key={Date.now()}
            urlTemplate={'https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=242e0063ccc5945c78753d4abe86d54a'}
            maximumZ={19}
            flipY={false}
           
        />

    );
    let wind = (
        <UrlTile
            key={Date.now()}
            urlTemplate={'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=242e0063ccc5945c78753d4abe86d54a'}
            maximumZ={19}
            flipY={false}
          
        />

    );
    let none = (
        null

    );

    if (props.category == undefined) weather = none;
    if (props.category == "") weather = none;
    if (props.category == "clouds") weather = clouds;
    if (props.category == "temp") weather = temp;
    if (props.category == "precipitation") weather = precip;
    if (props.category == "wind") weather = wind;
    if (props.category == "pressure") weather = pressure;
    if (props.category == "none") weather = none;

    if (props.gibsVisible) weather = none

    return (
        weather)

}


export default WeatherOverlay;