import { changeLoading } from './Loading.action'
import {Http, HttpAuth} from  '../../config/Http'

import { changeAlert } from './Alert.action'


export const actionTypes = {
    CHANGE : 'AUTH_CHANGE',
    SUCCESS : 'AUTH_SUCCESS',
    ERROR: 'AUTH_ERROR'
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
    
    HttpAuth.post('/register', data).then(res => {
        if(typeof res !== 'undefined'){

            if(res.data.access_token){
                localStorage.setItem('access_token', res.data.access_token)
            }

            if(res.status === 400) {
                dispatch(error(res.data.errors))
            }
        }
    })
}

export const responseSocialLogin = payload => dispatch => {
        
    let userData = {}
    let provider = ''

    //FACEBOOK PROVIDER
    if(payload.graphDomain){
        provider = payload.graphDomain

        userData = {
            name: payload.name,
            email: payload.email,
            thumbnail: payload.picture.data.url
        }
    }
    //GOOGLE PROVIDER
    if(typeof payload.tokenObj !== 'undefined' && payload.tokenObj.idpId) {
        provider = payload.tokenObj.idpId

        userData = {
            name: payload.profileObj.name,
            email: payload.profileObj.email,
            thumbnail: payload.profileObj.imageUrl,
            socialAccessToken: payload.accessToken,
        }
    }

    dispatch(change({
        provider,
        accesToken : payload.accessToken,
    }))
}

export const login = (credentials) => dispatch => {

    let loginData = {}
    
   if(credentials.provider !== '' && credentials.accesToken !== ''){
        dispatch(changeLoading({open: true}))
        loginData = {
            grant_type: 'social',
            client_id: 2,
            client_secret: process.env.REACT_APP_OAUTH_CLIENT_ID,
            provider: credentials.provider,
            access_token: credentials.accesToken
        }
   }else{
        dispatch(changeLoading({open: true, msg: 'Loading user data...'}))
        loginData = {
            grant_type: 'password',
            client_id: 2,
            client_secret: 'TRSinrpLzniWzgsrg7IfeAdr7JzboeSyyZD4C3er',
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



