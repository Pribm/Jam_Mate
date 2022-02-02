import { actionTypes } from "../Actions/Genres.action"

const initialState = {
    genres: [],
    selectedGenres: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return { ...state, genres: payload }

    default:
        return state
    }
}
