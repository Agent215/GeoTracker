import { SET_CURRENT_DISASTER } from '../actions/actions';
import { SET_FILTERED_DISASTERS } from '../actions/actions'
import { SET_DISASTER_FILTER } from '../actions/actions';
import { SET_WEATHER_FILTER } from '../actions/actions';
import { SAVE_DISASTER } from '../actions/actions'
import { UNSAVE_DISASTER } from '../actions/actions'
import { SET_DATE_FILTER } from '../actions/actions';
<<<<<<< HEAD
import { SET_HEADER_DATE } from '../actions/actions';
=======
import { SET_ISGIBSVISIBLE } from '../actions/actions'
>>>>>>> staging


const initialState = {

    isGibsVisible: false,
    currentDisaster: "",
    disasterFilter: "",
    weatherFilter: "",
    filteredDisasters: [],
    savedDisasters: [],
<<<<<<< HEAD
    headerDate: "no date set",

=======
>>>>>>> staging
    startDate: new Date(2020, 8, 1),  //if triggered, default value 2020/10/1
    endDate: new Date(),    //if griggered, default value is current date
};


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_DISASTER:
            return {
                ...state,
                currentDisaster: action.disaster
            };

        case SET_HEADER_DATE:
            return {
                ...state,
                headerDate: action.headerDate
            }

        case SET_DISASTER_FILTER:

            return {
                ...state,
                disasterFilter: action.disasterFilter
            };
<<<<<<< HEAD
=======

>>>>>>> staging

        case SET_WEATHER_FILTER:

            return {
                ...state,
                weatherFilter: action.weatherFilter
            };

        case SET_DATE_FILTER:
            return {
                ...state,
                startDate: action.startDate,
                endDate: action.endDate
            };
<<<<<<< HEAD

=======
>>>>>>> staging
        case SET_FILTERED_DISASTERS:

            return {
                ...state,
                filteredDisasters: action.filteredDisasters
            };

        case SAVE_DISASTER:

            const savedIndex = state.savedDisasters.findIndex(disaster => disaster.id === action.saveDisaster.id)
            if (savedIndex >= 0) {  // if we already saved the event dont add

                return {
                    ...state,
                    savedDisasters: state.savedDisasters
                }
            } else {
                return {
                    ...state,
                    savedDisasters: state.savedDisasters.concat(action.saveDisaster)
                };
            }
        case UNSAVE_DISASTER:

            const unSavedIndex = state.savedDisasters.findIndex(disaster => disaster.id === action.unsaveDisaster.id)
            if (unSavedIndex >= 0) { // splice out event to unsave
                const updatedSavedDisaster = [...state.savedDisasters];
                updatedSavedDisaster.splice(unSavedIndex, 1);
                return { ...state, savedDisasters: updatedSavedDisaster };
            }

        case SET_ISGIBSVISIBLE:

            return {
                ...state,
                isGibsVisible: action.isGibsVisible
            };

        default:
            return state;
    }
};