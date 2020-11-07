import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//const startDate = useSelector((state) => state.disaster.startDate); // start date of the time range from date picker
//const endDate = useSelector((state) => state.disaster.endDate); //end date of time range from date picker

//const [animationDate, setAnimationDate] = useState(startDate)
//const [isActive, setIsActive] = useState(false)

//let startDate_ISO = startDate.toISOString();
//let endDate_ISO = endDate.toISOString();

//This function starts or pauses the animation.
 //const toggleAnimation = () => { 
    //setIsActive(!isActive)
//}

//This function resets back to the start date.
//const resetAnimation = () => {
   // setAnimationDate(startDate),
    //setIsActive(false)
//}
/*
useEffect(() => {
    let interval = null
    if (isActive){
        interval = setInterval(() => {
            setAnimationDate(startAnimationDate => startAnimationDate + 1)
        }, 1500)
    }else if ((!isActive) || animationDate.getDate() == endDate.getDate()){
        clearInterval(interval)
    }
    return () => clearInterval(interval)
}, [isActive, animationDate])

*/