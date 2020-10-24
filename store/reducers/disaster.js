import { SET_CURRENT_DISASTER } from '../actions/actions'
import { RENDER_DISASTER } from '../actions/actions'

const initialState = {

    currentDisaster: "null",
    reRender : false
};


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_DISASTER:
            return {
                ...state,
                currentDisaster: action.disaster
            };
        case RENDER_DISASTER:

            console.log("render changed!!");
            return {
                ...state,
                reRender: !state.reRender
            };

        default:
            return state;
    }
};