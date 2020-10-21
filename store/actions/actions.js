export const SET_CURRENT_DISASTER = "SET_CURRENT_DISASTER";


export const setCurrentDisaster = (disaster) => {
    return { type: SET_CURRENT_DISASTER, disaster: disaster }
}