import { actionTypes } from "../Actions/Band.action"

const initialState = {
    band: {},
    bands: [],
    errors: []
}

const bandReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case actionTypes.CHANGE:
        return { ...state, band: (payload === 'clear') ? {} : {...state.band, ...payload} }
      
      case actionTypes.ERROR:
        return { ...state, errors: payload}

    case actionTypes.INDEX:
        return {...state, bands: [...payload]}
    
    case actionTypes.DELETE:
        return {...state, bands: state.bands.filter(band => band.id !== payload)}


  default:
    return state
  }
}

export default bandReducer
