import { HttpAuth } from "../../config/Http";
import { changeAlert } from "./Alert.action";
import {changeLoading} from './Loading.action'
import { index as postsIndex } from "./Post.action";

export const actionTypes = {
    CHANGE: 'CHANGE_FOLLOWS',
    INDEX: 'INDEX_FOLLOW',
    STORE: 'STORE_FOLLOW',
    SHOW: 'SHOW_FOLLOW',
    DELETE: 'DELETE_FOLLOW'
}

export const change = (payload) => ({
  type: actionTypes.CHANGE,
  payload,
});

const indexResponse = (payload) => ({
  type: actionTypes.INDEX,
  payload,
});

export const followsIndex = query => dispatch => {
    HttpAuth.get('network/users?'+new URLSearchParams(query)).then(res => {
        if(typeof res !== 'undefined'){
            dispatch(indexResponse(res.data))
        }
    })
}

export const store = user => dispatch => {
  dispatch(changeLoading({open: true}))
  return HttpAuth.post('network/following', {followed_user_id: user.id}).then(() => {
    dispatch(changeLoading({open: false}))
    dispatch(postsIndex())
  })
}


export const show = id => dispatch => {
  
  HttpAuth.get('network/following/'+id).then(res => {
    if(typeof res !== 'undefined'){
      if(res.data.user){
        dispatch(change(res.data.user))
      }

      if(res.data.error){
        dispatch(change('clear'))
      }
    }
  })
} 
const unfollowResponse = (payload) => ({
  type: actionTypes.DELETE,
  payload
})


export const unfollow = id => dispatch => {
  dispatch(changeLoading({open: true}))
  return HttpAuth.delete('network/following/'+id).then(res => {
    dispatch(changeLoading({open: false}))
    if(typeof res !== 'undefined'){
      if(res.data.success){
        dispatch(changeAlert({open: true, msg: res.data.success, class: 'success'}))
        dispatch(unfollowResponse(res.data.follower))
        dispatch(followsIndex())
        dispatch(postsIndex())
      }

      if(res.data.error){
        dispatch(changeAlert({open: true, msg: res.data.error, class: 'error'}))
      }
    }
  })
}

