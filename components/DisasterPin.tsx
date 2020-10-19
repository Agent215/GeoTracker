import DroughtPin from '../assets/Pins/DroughtPin.svg';
import DustStormPin from '../assets/Pins/DustStormPin.svg';
import EarthquakePin from '../assets/Pins/EarthquakePin.svg';
import ExtremeTempPin from '../assets/Pins/ExtremeTempPin.svg';
import FloodPin from '../assets/Pins/FloodPin.svg';
import IcebergPin from '../assets/Pins/IcebergPin.svg';
import LandslidesPin from '../assets/Pins/LandslidesPin.svg';
import ManmadePin from '../assets/Pins/ManmadePin.svg';
import SevereStormPin from '../assets/Pins/SevereStormPin.svg';
import VolcanoPin from '../assets/Pins/VolcanoPin.svg'
import WildfirePin from '../assets/Pins/WildfirePin.svg'
import SnowFallPin from '../assets/Pins/SnowFallPin.svg'

import React from 'react';




/* This function creates the correct custom marker using an SVG file,
then returns this component. It takes two props, category and size to display. */

const DisasterPin = (props) => {

    /* add categories to ENUM object, not sure how to extract the width and height here,
    there is probably a better way to do this so we dont have to repeat the height and width everytime.*/
    const categorySVG = {
        ["drought"]: <DroughtPin width={props.size} height={props.size} />,
        ["duststorm"]: <DustStormPin width={props.size} height={props.size} />,
        ["earthquake"]: <EarthquakePin width={props.size} height={props.size} />,
        ["extremeTemp"]: <ExtremeTempPin width={props.size} height={props.size} />,
        ["flood"]: <FloodPin width={props.size} height={props.size} />,
        ["iceberg"]: <IcebergPin width={props.size} height={props.size} />,
        ["landslide"]: <LandslidesPin width={props.size} height={props.size} />,
        ["manmade"]: <ManmadePin width={props.size} height={props.size} />,
        ["severestorm"]: <SevereStormPin width={props.size} height={props.size} />,
        ["snowfall"]: <SnowFallPin width={props.size} height={props.size} />,
        ["volcano"]: <VolcanoPin width={props.size} height={props.size} />,
        ["wildfire"]: <WildfirePin width={props.size} height={props.size} />
    }

    const eventPin = categorySVG[props.category];

    if (!eventPin) {
        console.log("CustomMarker.js/EventPin() - No event of type" + props.event + " found");
        return null
    };

    return (eventPin);

}
