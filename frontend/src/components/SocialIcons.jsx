import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'
import { useDispatch } from 'react-redux'
import { SocialIcon  } from 'react-social-icons'
import { login } from '../store/Actions/Auth.actions'

const GoogleIcon = props => {

    const dispatch = useDispatch()
    

    const responseGoogle = (response) => {
        let credentials = {
            access_token: response.accessToken,
            provider: response.wc.idpId
        }

        if(typeof response !== 'undefined'){
            dispatch(login(credentials))
        }
    }

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
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}

const FacebookIcon = props => {

    return (
        <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={res => console.log(res)}
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


                                    