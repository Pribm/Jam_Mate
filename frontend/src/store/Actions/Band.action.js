import { URL } from "../../config/App"
import { HttpAuth } from "../../config/Http"
import { changeAlert } from './Alert.action'
import { changeLoading } from './Loading.action'

export const actionTypes = {
    CHANGE: 'BAND_CHANGE',
    INDEX: 'BAND_INDEX',
    STORE: 'BAND_STORE',
    UPDATE: 'BAND_UPDATE',
    DELETE: 'BAND_DELETE',
    ERROR: 'BAND_ERROR'
}

export const change = (payload) => ({
  type: actionTypes.CHANGE,
  payload
})

export const error = payload => ({
  type: actionTypes.ERROR,
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


export const store = (data) => dispatch => {
  if(!data){
    HttpAuth.post('app/band').then(res => {
      if(typeof res !== 'undefined'){
        dispatch(change(res.data))
      }
    })
  }else{
    dispatch(changeLoading({open: true, msg: 'Saving Band...'}))
    return HttpAuth.post('app/band/'+data.id+'?_method=PUT', data).then(res => {
      dispatch(changeLoading({open: false, msg: 'Saving Band...'}))
      if(typeof res !== 'undefined'){
        if(res.data.errors){
          dispatch(error(res.data.errors))
        }else{
          dispatch(index())
          dispatch(change('clear'))
          return 'created'
        }
      }
    })
  }
}

export const uploadImage = (data, image_type, id) => dispatch => {

  dispatch(changeLoading({open:true, msg:'uploading image'}))
  HttpAuth.post(`app/band/${image_type}/${id}`, data).then(res => {
    dispatch(changeLoading({open:false, msg:'uploading image'}))
    if(typeof res !== 'undefined'){
      if(res.data.success){
        dispatch(change({ [image_type] : res.data.success}))
      }

      if(res.data.error){
        dispatch(changeAlert({open:true, msg: res.data.error, class: 'error'}))
      }
    }
  })
}

export const getBandImage = (userId, stagemap_url, bandId, image_cattegory) => {
  return URL.root+`thumb/${userId}/${stagemap_url}?s=bands/${bandId}/${image_cattegory}`
}
