import { actionTypes } from "../Actions/Alert.action"

const initialState = {
    open : false,
    class : 'error',
    autoHideDuration: '2000',
    msg: 'error'
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return { ...state, ...payload }

    default:
        return state
    }
}
