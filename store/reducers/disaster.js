import { SET_CURRENT_DISASTER } from '../actions/actions';
import { RENDER_DISASTER } from '../actions/actions';
import { SET_DISASTER_FILTER } from '../actions/actions';
import { SET_WEATHER_FILTER } from '../actions/actions';

const initialState = {

    currentDisaster: "null",
    reRender: false,
    disasterFilter: "all",
    weatherFilter: "none",

};


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_DISASTER:
            return {
                ...state,
                currentDisaster: action.disaster
            };
        case SET_DISASTER_FILTER:

            console.log("setting disater filter");
            return {
                ...state,
                disasterFilter: action.disasterFilter
            };
        case SET_WEATHER_FILTER:
            console.log("setting weather filter");
            return {
                ...state,
                weatherFilter: action.weatherFilter
            };

        default:
            return state;
    }
};