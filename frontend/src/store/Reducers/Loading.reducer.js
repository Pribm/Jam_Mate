import { actionTypes } from '../Actions/Loading.action'

const initialState = {
    open: false,
    msg: 'Loading...'
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return { ...state, ...payload }

    default:
        return state
    }
}
