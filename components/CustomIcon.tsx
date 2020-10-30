import Drought from '../assets/Icons/drought.svg';
import DustStorm from '../assets/Icons/dustStorm.svg';
import Earthquakes from '../assets/Icons/earthQuake.svg';
import TempExtremes from '../assets/Icons/extremeTemp.svg';
import Floods from '../assets/Icons/flood.svg';
import SeaLakeIce from '../assets/Icons/SeaLakeIce.svg';
import RockMudSlide from '../assets/Icons/rockMudSlide.svg';
import Manmade from '../assets/Icons/manmade.svg';
import SevereStorm from '../assets/Icons/severeStorm.svg';
import Volcano from '../assets/Icons/volcano.svg'
import Wildfire from '../assets/Icons/wildfire.svg'
import SnowFall from '../assets/Icons/snowFall.svg'

import React from 'react';


/* This function creates the correct custom icon using an SVG file,
then returns this component. It takes two props, category and size to display. */
const DisasterIcon = (props) => {

    /* add categories to ENUM object, not sure how to extract the width and height here,
    there is probably a better way to do this so we dont have to repeat the height and width everytime.*/
    const categorySVG = {
        ["drought"]: <Drought width={props.size} height={props.size} />,
        ["dustHaze"]: <DustStorm width={props.size} height={props.size} />,
        ["earthquakes"]: <Earthquakes width={props.size} height={props.size} />,
        ["tempExtremes"]: <TempExtremes width={props.size} height={props.size} />,
        ["floods"]: <Floods width={props.size} height={props.size} />,
        ["seaLakeIce"]: <SeaLakeIce width={props.size} height={props.size} />,
        ["landslides"]: <RockMudSlide width={props.size} height={props.size} />,
        ["manmade"]: <Manmade width={props.size} height={props.size} />,
        ["severeStorms"]: <SevereStorm width={props.size} height={props.size} />,
        ["snow"]: <SnowFall width={props.size} height={props.size} />,
        ["volcanoes"]: <Volcano width={props.size} height={props.size} />,
        ["wildfires"]: <Wildfire width={props.size} height={props.size} />
    }

    const eventIcon = categorySVG[props.event.category];
    console.log("This is " + props.event.category);
    if (!eventIcon) {
        console.log("CustomIcon.js/EventIcon() - No event of type" + props.event + " found");
        return null
    };

    return (eventIcon);

}

export default DisasterIcon;