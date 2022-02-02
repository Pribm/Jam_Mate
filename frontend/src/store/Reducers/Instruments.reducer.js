import { actionTypes } from "../Actions/Instruments.action"

const initialState = {
    instruments: [],
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        if(!payload.message){
            payload = {...state, instruments: [...payload]}
        }
        return { ...state, ...payload }

    default:
        return state
    }
}
