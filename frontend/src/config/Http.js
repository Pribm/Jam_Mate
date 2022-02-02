import axios from "axios"

import {URL} from './App'

export const Http = axios.create({
    baseURL: URL.root,
    withCredentials: false,
    headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
})

export const HttpAuth = axios.create({
    baseURL: URL.api,
})

HttpAuth.interceptors.request.use(
    async (config) => {
        config.headers.authorization = 'Bearer ' + await localStorage.getItem('access_token')
        return config
    },
)

HttpAuth.interceptors.response.use(response => {
    return response
}, error => {
    if(error.response){
        if(error.response.status == 401){
            localStorage.removeItem('access_token')
            window.location.replace('/')
        }
        return error.response
    }
})