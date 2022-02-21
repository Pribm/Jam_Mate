import React from 'react'
import { InputBase, ButtonBase, Button } from '@mui/material'
import { MdLogin, MdPassword } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'

export default function SignIn({credentials, dispatch, change, credentialsLogin, setSignUp}) {
    return (
        <>
            <div className="col-md-6 mt-auto mt-md-0 text-center bg-dark p-4">
                <img src="img/JAM_MATE.svg" alt="logo_JAM_MATE" height={80} className={'mb-4'}/>
                <InputBase
                    value={credentials.email}
                    onChange={text => dispatch(change({ email: text.target.value }))}
                    fullWidth
                    placeholder='Login'
                    className='input-custom ps-4 py-2 text-white bg-black my-2'
                    endAdornment={(<FaUserCircle size={'2em'} className='text-white ms-2 me-4' />)}
                />

                <InputBase
                    value={credentials.password}
                    onChange={text => dispatch(change({ password: text.target.value }))}
                    fullWidth
                    type={'password'}
                    placeholder='Password'
                    className='ps-4 py-2 text-white bg-black my-2'
                    endAdornment={(<MdPassword size={'2em'} className='text-white ms-2 me-4' />)}
                />

                <ButtonBase
                    onClick={credentialsLogin}
                    sx={{ width: '100%' }}
                    color='primary'
                    className='text-white py-2 mt-4 bg-primary'>
                    Sign In
                    <MdLogin size='1.5em' className='ms-2' />
                </ButtonBase>

                <div className="d-flex justify-content-center text-white mt-3">
                    <p>Forgot Password?</p>
                </div>

                <div className="text-center mt-3">
                    <Button variant='outlined' onClick={() => setSignUp(true)}>
                        Create Account
                    </Button>
                </div>
            </div>
        </>
    )
}
