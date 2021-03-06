import { changeLoading } from './Loading.action'
import {Http, HttpAuth} from  '../../config/Http'
import { changeAlert } from './Alert.action'


export const actionTypes = {
    CHANGE : 'AUTH_CHANGE',
    SUCCESS : 'AUTH_SUCCESS',
    ERROR: 'AUTH_ERROR',
    FORGOT_RESPONSE: 'FORGOT_EMAIL_RESPONSE'
}

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

export const success = (payload) => ({
    type: actionTypes.SUCCESS,
    payload
})

export const error = (payload) => ({
    type: actionTypes.ERROR,
    payload
})

export const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_profile_data')
    window.location.replace('/')
}

export const register = data => dispatch => {
    dispatch(changeLoading({open: true}))
    HttpAuth.post('/register', data).then(res => {
        dispatch(changeLoading({open: false}))
        if(typeof res !== 'undefined'){
            if(res.data.access_token){
                localStorage.setItem('access_token', res.data.access_token)
                dispatch(success(true))
            }

            if(res.status === 400) {
                dispatch(error(res.data.errors))
            }
        }
    })
}



export const login = (credentials) => dispatch => {

    let loginData = {}
    
        dispatch(changeLoading({open: true, msg: 'Loading user data...'}))
        
        if(credentials.access_token !== '' && credentials.provider !== ''){
            loginData = {
                grant_type: 'social',
                client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
                client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
                access_token: credentials.access_token,
                provider: credentials.provider
            }
            
            
        }else{
            loginData = {
                grant_type: 'password',
                client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
                client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
                username: credentials.email,
                password: credentials.password
            }
        }

    return Http.post('oauth/token', loginData)
        .then(res => {

            dispatch(changeLoading({ open: false }))

            if (typeof res !== 'undefined') {
                if (res.data.access_token) {
                    localStorage.setItem('access_token', res.data.access_token)
                    dispatch(success(true))
                }
            }
        })
        .catch(error => {
            dispatch(changeLoading({ open: false }))
            if (typeof error.response !== 'undefined') {
                if (error.response.status === 401 || error.response.status === 400) {
                    dispatch(changeAlert({ open: true, msg: 'wrong email or password ', class: 'error' }))
                } else {
                    dispatch(changeAlert({ open: true, msg: error.response.data.message, class: 'error' }))
                }
            }
        })
}

export const forgotPassword = email => dispatch => {
    return HttpAuth.post('forgot', {email}).then(res => {
        if(res.status === 200){
            dispatch(changeAlert({open:true, msg: res.data.message, class: 'success'}))
        }else{
            dispatch(error(res.data.errors))
        }
        return res.status
    })
}

export const resetPassword = data => dispatch => {
    return HttpAuth.post('reset', data).then(res => {
        if(res.status === 200){
            dispatch(changeAlert({open:true, msg: res.data.message, class: 'success'}))
        }else{
            dispatch(error(res.data.errors))
        }
        return res.status
    })
}



