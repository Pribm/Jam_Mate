import { actionTypes } from "../Actions/Genres.action"

const initialState = {
    genres: [],
    selectedGenres: []
}

const GenresReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.INDEX:
        return { ...state, genres: payload }
    
    case actionTypes.CHANGE:
        return {...state, selectedGenres: payload}

    default:
        return state
    }
}

export default GenresReducer
