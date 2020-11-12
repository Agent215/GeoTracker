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
          
            urlTemplate={'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=52621d09b1f91b7e4cbc93777fb2801b'}
            maximumZ={19}
            flipY={false}
        />

    );
    let temp = (
        <UrlTile
          
            urlTemplate={'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=52621d09b1f91b7e4cbc93777fb2801b'}
            maximumZ={19}
            flipY={false}
        />

    );
    let precip = (
        <UrlTile
           
            urlTemplate={'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=52621d09b1f91b7e4cbc93777fb2801b'}
            maximumZ={19}
            flipY={false}
        />

    );
    let pressure = (
        <UrlTile
          
            urlTemplate={'https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=52621d09b1f91b7e4cbc93777fb2801b'}
            maximumZ={19}
            flipY={false}
        />

    );
    let wind = (
        <UrlTile
           
            urlTemplate={'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=52621d09b1f91b7e4cbc93777fb2801b'}
            maximumZ={19}
            flipY={false}
        />

    );
    let none = (
        null

    );

    if (props.category == undefined) weather = null;
    if (props.category == "") weather = null;
    if (props.category == "clouds") weather = clouds;
    if (props.category == "temp") weather = temp;
    if (props.category == "precipitation") weather = precip;
    if (props.category == "wind") weather = wind;
    if (props.category == "pressure") weather = pressure;
    if (props.category == "none") weather = null;
    if (props.gibsVisible) weather = null





    return (
        weather)

}


export default WeatherOverlay;