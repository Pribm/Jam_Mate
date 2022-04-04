import { Button, ButtonBase, InputBase } from '@mui/material'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { MdArrowBack, MdEmail, MdLogin, MdPassword } from 'react-icons/md'
import { changeAlert } from '../../store/Actions/Alert.action'
import { register as regiserAction } from '../../store/Actions/Auth.actions'
import { useSelector } from 'react-redux'

export default function SignUp({setSignUp, dispatch}) {

    const [signupData, setSignupData] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const errors = useSelector(state => state.AuthReducer.errors)

    const register = () => {
        if(signupData.password !== signupData.confirmPassword){
            dispatch(changeAlert({open: true, msg: 'the password fields does not match.'}))
        }else if(signupData.name === '' || signupData.email === '' || signupData.password === ''){
            dispatch(changeAlert({open: true, msg: 'All field must be filled to register your account'}))
        }
        else{
            dispatch(regiserAction(signupData))
        }
    }

    return (
        <>
            <div className="col-md-6 mt-auto mt-md-0 bg-dark p-4 text-center">

            <img src={process.env.REACT_APP_PUBLIC_URL+"/img/JAM_MATE.svg"} alt="logo_JAM_MATE" height={80} className={'mb-4'}/>

                <InputBase
                    type={'text'}
                    value={signupData.name}
                    onChange={text => {
                        setSignupData({...signupData, name: text.target.value})
                        delete errors.name
                    }}
                    fullWidth
                    placeholder='User Name'
                    className='input-custom ps-4 py-2 text-white bg-black my-3'
                    endAdornment={(<FaUserCircle size={'2em'} className='text-white ms-2 me-4' />)}
                />
                {errors.name && <strong className='text-danger'>{errors.name}</strong>}

                <InputBase
                    type={'email'}
                    value={signupData.email}
                    onChange={text => {
                        setSignupData({...signupData, email: text.target.value})
                        delete errors.email
                    }}
                    fullWidth
                    placeholder='Email'
                    className='input-custom ps-4 py-2 text-white bg-black my-3'
                    endAdornment={(<MdEmail size={'2em'} className='text-white ms-2 me-4' />)}
                />
                {errors.email && <strong className='text-danger'>{errors.email}</strong>}

                <InputBase
                    type={'password'}
                    value={signupData.password}
                    onChange={text => {
                        setSignupData({...signupData, password: text.target.value})
                        delete errors.password
                    }}
                    fullWidth
                    placeholder='Password'
                    className='input-custom ps-4 py-2 text-white bg-black my-3'
                    endAdornment={(<MdPassword size={'2em'} className='text-white ms-2 me-4' />)}
                />
                {errors.password && <strong className='text-danger'>{errors.password}</strong>}

                <InputBase
                    type={'password'}
                    value={signupData.confirmPassword}
                    onChange={text => setSignupData({...signupData, confirmPassword: text.target.value})}
                    fullWidth
                    placeholder='Confirm password'
                    className='input-custom ps-4 py-2 text-white bg-black my-3'
                    endAdornment={(<MdPassword size={'2em'} className='text-white ms-2 me-4' />)}
                />

                <ButtonBase
                    sx={{ width: '100%' }}
                    color='primary'
                    className='text-white py-2 mt-3 bg-primary'
                    onClick={register}
                    >
                    Sign Up
                    <MdLogin size='1.5em' className='ms-2' />
                </ButtonBase>

                <Button variant='outlined' onClick={() => setSignUp(false)} className='mt-4'>
                    <MdArrowBack className='me-2'/>
                    Back to Login
                </Button>
            </div>
        </>
    )
}
