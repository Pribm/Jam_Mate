import { HttpAuth } from "../../config/Http"

export const actionTypes = {
    CHANGE: 'BAND_CHANGE',
    INDEX: 'BAND_INDEX',
    STORE: 'BAND_STORE',
    UPDATE: 'BAND_UPDATE',
    DELETE: 'BAND_DELETE'
}

export const change = (payload) => ({
  type: actionTypes.CHANGE,
  payload
})

const indexResponse = (payload) => ({
  type: actionTypes.INDEX,
  payload
})

export const index = query => (dispatch) => {
  HttpAuth.get('app/band'+new URLSearchParams(query)).then(res => {
    if(typeof res !== 'undefined'){
      dispatch(indexResponse(res.data))
    }
  })
}


export const store = (payload) => dispatch => {
  HttpAuth.post('app/band', payload).then(res => {
    if(typeof res !== 'undefined'){
      console.log(res)
    }
  })
}
