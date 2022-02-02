import { actionTypes } from "../Actions/Auth.actions";

const initialState = {
    credentials: {
        email: '',
        password: '',
        provider: '',
        accesToken : '',
    },
    success: false,
    errors: {}
}

const AuthReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return { ...state,
        credentials: {
            ...state.credentials,
            ...payload
        }}
    
    case actionTypes.SUCCESS:
        return { ...state, success: payload}

    case actionTypes.ERROR:
    return { ...state, errors: {...state.errors, ...payload}}

    default:
        return state
    }
}

export default AuthReducer