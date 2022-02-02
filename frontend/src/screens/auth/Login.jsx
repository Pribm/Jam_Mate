import React from 'react'
import { useNavigate } from 'react-router-dom'
import { change, login, responseSocialLogin } from '../../store/Actions/Auth.actions'
import { useDispatch, useSelector } from 'react-redux'
import { InputBase, ButtonBase, Button} from '@mui/material' 
import { MdLogin, MdPassword } from 'react-icons/md'
import {FaUserCircle} from 'react-icons/fa'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin  from 'react-facebook-login'
import './Login.css'

export default function Login() {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const credentials = useSelector(state => state.AuthReducer.credentials)

    const success = useSelector(state => state.AuthReducer.success)

    const loggedUser = useSelector(state => state.UserReducer.user)

    React.useEffect(() => {

        if(credentials.provider !== ''){
            dispatch(login(credentials))
        }

        if(success){
            navigate('/home', {replace:true})
        }

    }, [success, credentials.provider, loggedUser])

    const credentialsLogin = () => {
        dispatch(login(credentials))
    }

    return (
        <>
           <div className="container-fluid min-vh-100 bg-black background-login position-relative">
            <div className="row">
                <div className="col-md-6 text-center text-md-start position-relative h-100 col-12 p-md-5">
                    <img src="img/JAM_MATE.png" alt="" height={'80px'} className='m-md-4 mt-4'/>

                    
                    <div className="col-md-6 bg-dark p-4 mt-5 ms-md-4">
                        <InputBase
                        value={credentials.email}
                        onChange={text => dispatch(change({email: text.target.value}))}
                        fullWidth
                        placeholder='Login'
                        className='input-custom ps-4 py-2 text-white bg-black'
                        endAdornment={(<FaUserCircle size={'2em'} className='text-white ms-2 me-4'/>)}
                        />

                        <InputBase
                        value={credentials.password}
                        onChange={text => dispatch(change({password: text.target.value}))}
                        fullWidth
                        type={'password'}
                        placeholder='Password'
                        className='mt-5 ps-4 py-2 text-white bg-black'
                        endAdornment={(<MdPassword size={'2em'} className='text-white ms-2 me-4'/>)}
                        />

                        <ButtonBase
                        onClick={credentialsLogin}
                        sx={{width: '100%'}}
                        color='primary'
                        className='text-white py-2 mt-5 bg-primary'>
                            Sign In
                            <MdLogin size='1.5em' className='ms-2'/>
                        </ButtonBase>

                        <div className="d-flex mt-4 justify-content-between">
                            <div className="text-white" style={{fontSize: '.8em'}}>
                                remember me
                            </div>

                            <div className="text-white" style={{fontSize: '.8em'}}>
                                Forgot password?
                            </div>
                        </div>

                        <p className="text-white text-center mt-2">
                            Or
                        </p>
                        <div className="d-flex justify-content-center">
                            <GoogleLogin
                            className='flex-grow-1 d-flex justify-content-center'
                            onSuccess={res => {
                                dispatch(responseSocialLogin(res))
                            }}
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} 
                            />
                        </div>

                        <div className="d-flex justify-content-center">
                            <FacebookLogin
                            buttonStyle={{marginRight: '10px'}}
                            textButton='   Sign in with Facebook'
                            containerStyle={{width: '100%', backgroundColor: '#3b5998', marginTop: '1em', paddingTop: '.25em',paddingBottom: '.25em', display: 'flex', justifyContent: 'center', borderRadius: '2px'}}
                            fields='name, email, picture'
                            cssClass="btn text-white"
                            icon="fa-facebook"
                            callback={res => {
                                dispatch(responseSocialLogin(res))
                            }}
                            appId={process.env.REACT_APP_FACEBOOK_APP_ID} 
                            />
                        </div>
                    </div>

                    <div className="col-md-6 text-center ms-4 text-white mt-2">
                        <p>Not a member?</p>
                        <Button variant='outlined'>
                            Create Account
                        </Button>
                    </div>
                   
                </div>
            </div>
           </div>
        </>
    )
}
