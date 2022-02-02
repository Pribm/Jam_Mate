import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'
import { SocialIcon  } from 'react-social-icons'
import { responseSocialLogin } from '../store/Actions/Auth.actions'
import { useDispatch } from 'react-redux'

const GoogleIcon = props => {
    const dispatch = useDispatch()
    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
                <SocialIcon
                    onClick={renderProps.onClick}
                    network='google'
                    className={`${props.hidden && 'd-none'} mx-2 cursor-pointer`}
                    style={{ height: '30px', width: '30px' }}
                />
            )}
            onSuccess={res => dispatch(responseSocialLogin(res))}
            onFailure={res => dispatch(responseSocialLogin({}))}
            cookiePolicy={'single_host_origin'}
        />
    )
}

const FacebookIcon = props => {
    const dispatch = useDispatch()
    return (
        <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={res => dispatch(responseSocialLogin(res))}
        render={
            renderProps => (<SocialIcon
            network='facebook'
            className={`${props.hidden && 'd-none'} mx-2 cursor-pointer`}
            style={{ height: '30px', width: '30px' }}
            onClick={renderProps.onClick} />)}
        />
    )
}

export {
    GoogleIcon,
    FacebookIcon
}


                                    