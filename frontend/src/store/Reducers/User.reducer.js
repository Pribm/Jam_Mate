import { actionTypes } from "../Actions/User.action"

const initialState = {
    user: {
        
    },
    instruments: [],
    genres: [],
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return {
            ...state,
            ...payload,
            user: {
                ...state.user, ...payload.user
            }
        }

    default:
        return state
    }
}
