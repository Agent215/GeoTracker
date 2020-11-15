import { SET_CURRENT_DISASTER } from '../actions/actions';
import { SET_FILTERED_DISASTERS } from '../actions/actions'
import { SET_DISASTER_FILTER } from '../actions/actions';
import { SET_WEATHER_FILTER } from '../actions/actions';
import { SAVE_DISASTER } from '../actions/actions'
import { UNSAVE_DISASTER } from '../actions/actions'
import {SET_DATE_FILTER} from '../actions/actions';
import { SET_SAVED_DISASTERS } from '../actions/actions';
import { DataStore } from '@aws-amplify/datastore';
import { EventEntity }  from '../../models';


const initialState = {

    currentDisaster: "",
    reRender: false,
    disasterFilter: "",
    weatherFilter: "",
    filteredDisasters: [],
    savedDisasters: [],

    startDate:new Date(2019,0,1),  //if triggered, default value 2019/1/1
    endDate:new Date(),    //if griggered, default value is current date


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
        case SET_DATE_FILTER:
            return {
                ...state,
                startDate:action.startDate,
                endDate:action.endDate
            };   
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
                DataStore.save(new EventEntity({
                    title: action.saveDisaster.title,
                    category: action.saveDisaster.category,
                    sourceLink: action.saveDisaster.sourceLink,
                    locationList: "",
                    isClosed: action.saveDisaster.isClosed,
                    currentLat: action.saveDisaster.currentLat,
                    currentLong: action.saveDisaster.currentLong,
                    eventId: action.saveDisaster.id,
                    currentDate: action.saveDisaster.currentDate
                  }),
                  (p) => p.title('beginsWith', '[Amplify]'));
                DataStore.start();
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

        case SET_SAVED_DISASTERS:
            return {
                ...state,
                savedDisasters: action.savedDisasters
            }

        default:
            return state;
    }
};