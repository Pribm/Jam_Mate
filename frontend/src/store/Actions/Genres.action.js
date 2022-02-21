import { HttpAuth } from "../../config/Http"

export const actionTypes = {
    CHANGE: 'CHANGE_GENRES',
    INDEX: 'INDEX_GENRES'
}

export const changeGenres = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

export const indexResponse = (payload) => ({
  type: actionTypes.INDEX,
  payload
})


export const index = () => dispatch => {
    return HttpAuth.get('app/genres').then(res => {
        dispatch(indexResponse(res.data))
    })
}