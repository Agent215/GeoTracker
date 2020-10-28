import { SET_CURRENT_DISASTER } from '../actions/actions';
import { SET_FILTERED_DISASTERS } from '../actions/actions'
import { SET_DISASTER_FILTER } from '../actions/actions';
import { SET_WEATHER_FILTER } from '../actions/actions';
import { SAVE_DISASTER } from '../actions/actions'
import { SET_URL_TILE } from '../actions/actions'


const initialState = {

    currentDisaster: "",
    reRender: false,
    disasterFilter: "",
    weatherFilter: "",
    filteredDisasters: [],
    savedDisasters: [],
   

};


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_DISASTER:
            return {
                ...state,
                currentDisaster: action.disaster
            };
        case SET_DISASTER_FILTER:

            return {
                ...state,
                disasterFilter: action.disasterFilter
            };
        case SET_WEATHER_FILTER:

            return {
                ...state,
                weatherFilter: action.weatherFilter
            };
        case SET_FILTERED_DISASTERS:

            return {
                ...state,
                filteredDisasters: action.filteredDisasters
            };

        case SAVE_DISASTER:

            return {
                ...state,
                savedDisasters: state.savedDisasters.concat(action.saveDisaster)
            };
       

        default:
            return state;
    }
};