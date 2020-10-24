export const SET_CURRENT_DISASTER = "SET_CURRENT_DISASTER";
export const setCurrentDisaster = (disaster) => {
    return { type: SET_CURRENT_DISASTER, disaster: disaster }
};


export const ADD_COUNTER = 'ADD_COUNTER';
export const changeCounter =() => {
    return {type: ADD_COUNTER}
};


export const RENDER_DISASTER ="RENDER_DISASTER"
export const setRenderDisaster =() => {
    return {type: RENDER_DISASTER}
};

