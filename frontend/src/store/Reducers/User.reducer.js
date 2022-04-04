import { actionTypes } from "../Actions/User.action"

const initialState = {
    user: {
        
    },
    selectedUser: {

    }
}

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return {
            ...state,
            user: {...state.user,...payload}
        }
    
    case actionTypes.SHOW:
        return {
            ...state,
            selectedUser: payload === 'clear' ? {} : payload
        }

    default:
        return state
    }
}

export default userReducer
