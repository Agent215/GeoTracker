import { SET_CURRENT_DISASTER } from '../actions/actions'

const initialState = {

    currentDisaster : "null"
};


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_DISASTER:
            return {
                ...state,
                currentDisaster: action.disaster
            }
        default:
            return state;
    }
};