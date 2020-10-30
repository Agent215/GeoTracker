import DroughtPin from '../assets/Pins/DroughtPin.svg';
import DustHazePin from '../assets/Pins/DustHazePin.svg';
import EarthquakesPin from '../assets/Pins/EarthquakesPin.svg';
import TempExtremesPin from '../assets/Pins/TempExtremesPin.svg';
import FloodsPin from '../assets/Pins/FloodsPin.svg';
import SeaLakeIcePin from '../assets/Pins/SeaLakeIcePin.svg';
import LandslidesPin from '../assets/Pins/LandslidesPin.svg';
import ManmadePin from '../assets/Pins/ManmadePin.svg';
import SevereStormsPin from '../assets/Pins/SevereStormsPin.svg';
import VolcanoesPin from '../assets/Pins/VolcanoesPin.svg'
import WildfiresPin from '../assets/Pins/WildfiresPin.svg'
import SnowPin from '../assets/Pins/SnowPin.svg'

import React from 'react';




/* This function creates the correct custom marker using an SVG file,
then returns this component. It takes two props, category and size to display. */
const DisasterPin = (props) => {

    /* add categories to ENUM object, not sure how to extract the width and height here,
    there is probably a better way to do this so we dont have to repeat the height and width everytime.*/
    const categorySVG = {
        ["drought"]: <DroughtPin width={props.size} height={props.size} />,
        ["dustHaze"]: <DustHazePin width={props.size} height={props.size} />,
        ["earthquakes"]: <EarthquakesPin width={props.size} height={props.size} />,
        ["tempExtremes"]: <TempExtremesPin width={props.size} height={props.size} />,
        ["floods"]: <FloodsPin width={props.size} height={props.size} />,
        ["seaLakeIce"]: <SeaLakeIcePin width={props.size} height={props.size} />,
        ["landslides"]: <LandslidesPin width={props.size} height={props.size} />,
        ["manmade"]: <ManmadePin width={props.size} height={props.size} />,
        ["severeStorms"]: <SevereStormsPin width={props.size} height={props.size} />,
        ["snow"]: <SnowPin width={props.size} height={props.size} />,
        ["volcanoes"]: <VolcanoesPin width={props.size} height={props.size} />,
        ["wildfires"]: <WildfiresPin width={props.size} height={props.size} />
    }

    const eventPin = categorySVG[props.category];

    if (!eventPin) {
        console.log("CustomMarker.js/EventPin() - No event of type" + props.event + " found");
        return null
    };

    return (eventPin);

}

export default DisasterPin;