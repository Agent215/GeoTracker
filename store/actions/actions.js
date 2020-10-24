export const SET_CURRENT_DISASTER = "SET_CURRENT_DISASTER";
export const RENDER_DISASTER = "RENDER_DISASTER";
export const SET_DISASTER_FILTER = "SET_DISASTER_FILTER";
export const SET_WEATHER_FILTER = "SET_WEATHER_FILTER";


export const setCurrentDisaster = (disaster) => {
    return { type: SET_CURRENT_DISASTER, disaster: disaster }
};

export const setWeatherFilter = (weatherFilter) => {
    return { type: SET_WEATHER_FILTER, weatherFilter: weatherFilter }
};


export const setDisasterFilter = (disasterFilter) => {
    return { type: SET_DISASTER_FILTER, disasterFilter: disasterFilter }
};


