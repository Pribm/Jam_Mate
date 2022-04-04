import { HttpAuth } from "../../config/Http"
import { changeAlert } from "./Alert.action"
import { changeLoading } from './Loading.action'

export const actionTypes = {
    CHANGE : 'CHANGE_USER',
    SHOW: 'SHOW_USER'
}

export const loadUserData = () => dispatch => {
    return HttpAuth.get('app/user').then(res => {
        if(typeof res !== 'undefined'){
            dispatch(changeUser(res.data))
        }
    })
}

export const changeUser = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

const showResponse = payload => ({
    type: actionTypes.SHOW,
    payload
})

export const show = id => dispatch => {
    return HttpAuth.get('network/users/'+id).then(res => {
        dispatch(showResponse(res.data))
    })
}

export const updateUser = (data) => dispatch => {
    dispatch(changeLoading({open: true}))
    HttpAuth.put('app/user', data).then(res => {

        dispatch(changeLoading({open: false}))
        if(typeof res !== 'undefined'){
            if(res.data.error){
                dispatch(changeAlert({open: true, class: 'error', msg: res.data.error}))
            }
            dispatch(changeAlert({open: true, class: 'success', msg: 'user profile was updated'}))
            dispatch(changeUser(res.data))
        }
    })
}

export const uploadThumbnail = thumbImage => dispatch => {
    return HttpAuth.post('app/tumbnailUpdate', thumbImage).then(res => {
        if(res.data.error){
            dispatch(changeAlert({open: true, class: 'error', msg: res.data.error}))
            return
        }
        dispatch(changeUser({profile_image: res.data, profile_image_is_custom: 1}))
        return res.data
    })
}






