export const SET_CURRENT_DISASTER = "SET_CURRENT_DISASTER";
export const RENDER_DISASTER = "RENDER_DISASTER";
export const SET_DISASTER_FILTER = "SET_DISASTER_FILTER";
export const SET_WEATHER_FILTER = "SET_WEATHER_FILTER";
export const SET_FILTERED_DISASTERS = "SET_FILTERED_DISASTERS";
export const SAVE_DISASTER = "SAVE_DISASTER";
export const UNSAVE_DISASTER = "UNSAVE_DISASTER";
export const SET_HEADER_DATE = "SET_HEADER_DATE"
export const SET_ISGIBSVISIBLE = "SET_ISGIBSVISIBLE"
export const SET_SAVED_DISASTERS = "SET_SAVED_DISASTERSc"


export const SET_DATE_FILTER = "SET_DATE_FILTER"

export const setHeaderDate = (headerDate) => {
    return { type: SET_HEADER_DATE, headerDate: headerDate }
}

export const setCurrentDisaster = (disaster) => {
    return { type: SET_CURRENT_DISASTER, disaster: disaster }
};

export const setWeatherFilter = (weatherFilter) => {
    return { type: SET_WEATHER_FILTER, weatherFilter: weatherFilter }
};


export const setDisasterFilter = (disasterFilter) => {
    return { type: SET_DISASTER_FILTER, disasterFilter: disasterFilter }
};

export const setDateFilter = (startDate, endDate) => {
    return { type: SET_DATE_FILTER, startDate: startDate, endDate: endDate }
};

export const setFilteredDisasters = (filteredDisasters) => {
    return { type: SET_FILTERED_DISASTERS, filteredDisasters: filteredDisasters }
};

export const saveDisaster = (saveDisaster) => {
    return { type: SAVE_DISASTER, saveDisaster: saveDisaster }
};

export const unSaveDisaster = (unsaveDisaster) => {

    return { type: UNSAVE_DISASTER, unsaveDisaster: unsaveDisaster }
}

export const setSavedDisasters = (savedDisasters) => {
    return { type: SET_SAVED_DISASTERS, savedDisasters: savedDisasters }
};

export const setIsGibsVisible = (isGibsVisible) => {

    return { type: SET_ISGIBSVISIBLE, isGibsVisible: isGibsVisible }
}



