import { HttpAuth } from "../../config/Http"

export const actionTypes = {
    CHANGE : 'CHANGE_INSTRUMENTS',
    INDEX: 'INSTRUMENTS_INDEX'
}

export const changeInstruments = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

export const index = data => dispatch => {
    return HttpAuth.get('app/instruments?'+new URLSearchParams(data)).then(res => {
        dispatch(changeInstruments(res.data))
    })
}



