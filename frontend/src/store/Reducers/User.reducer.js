import { actionTypes } from "../Actions/User.action"

const initialState = {
    user: {
        
    },
    instruments: [],
    genres: [],
    selectedUser: {

    }
}

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return {
            ...state,
            ...payload,
            user: {
                ...state.user, ...payload.user
            }
        }
    
    case actionTypes.SHOW:
        return {
            ...state,
            selectedUser: payload
        }

    default:
        return state
    }
}

export default userReducer
