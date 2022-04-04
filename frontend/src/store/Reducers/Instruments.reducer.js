import { actionTypes } from "../Actions/Instruments.action"

const initialState = {
    instruments: [],
    selectedInstruments: []
}

const IntrumentsReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return {...state, selectedInstruments: payload}

    case actionTypes.INDEX:
        if(!payload.message){
            payload = {...state, instruments: [...payload]}
        }
        return { ...state, ...payload }

    default:
        return state
    }
}

export default IntrumentsReducer
