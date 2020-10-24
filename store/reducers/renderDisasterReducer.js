import { RENDER_DISASTER } from '../actions/actions'

const initialState = {

    reRender : false
};


export default (state = initialState, action) => {
    switch (action.type) {
        case RENDER_DISASTER:
            
            console.log("render changed!!"); 
            return {
                ...state,
                reRender:!state.reRender
            }
        default:
            return state;
    }
};