import { HttpAuth } from "../../config/Http";
import { changeLoading } from "./Loading.action";
import {changeAlert} from './Alert.action'

export const actionTypes = {
    CHANGE: 'CHANGE_POST',
    INDEX: 'POST_INDEX',
    UPDATE: 'POST_UPDATE',
    DELETE: 'POST_DELETE'
}

export const changePost = (payload) => ({
  type: actionTypes.CHANGE,
  payload,
});

const indexResponse = (payload) => ({
  type: actionTypes.INDEX,
  payload,
});

export const index = query => dispatch => {
  changeLoading({open: true})
  return HttpAuth.get(`posts?${new URLSearchParams(query)}`).then(res => {
      if(typeof res !== 'undefined'){
        if(res.status === 200){
          changeLoading({open: false})
          dispatch(indexResponse(res.data))
        }
      }
  })
}

export const store = () => dispatch => { 
  return HttpAuth.post('/posts').then(res => (typeof res !== 'undefined') && dispatch(changePost(res.data)))
}

export const updateResponse = (payload) => ({
  type: actionTypes.UPDATE,
  payload,
});


export const update = post => dispatch => {
  return HttpAuth.put('/posts/'+post.id, post).then(res => {
    if(typeof res !== 'undefined'){
      dispatch(updateResponse(res.data))
      dispatch(store())
    }
  })
}

export const destroyResponse = (payload) => ({
  type: actionTypes.DELETE,
  payload,
});


export const destroy = id => dispatch => {
  HttpAuth.delete('/posts/'+id).then(res => {
    if(typeof res !== 'undefined'){
      if(res.data.success){
        dispatch(destroyResponse(id))
      }
    }
  })
}

