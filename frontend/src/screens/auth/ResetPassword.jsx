import { Button, ButtonBase, InputBase } from '@mui/material'
import React from 'react'
import { MdArrowBack, MdPassword, MdSend } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { resetPassword } from '../../store/Actions/Auth.actions'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {

    const dispatch = useDispatch()
    const errors = useSelector(state => state.AuthReducer.errors)
    const navigate = useNavigate()

    const { token } = useParams()

    const [state, setState] = React.useState({
        password: '',
        password_confirm: '',
        token
    })

    return (
        <div className="container-fluid min-vh-100 bg-black background-login position-relative">
            <div className="container">
                <div className="row align-items-center min-vh-100">
                    <div className="col-md-6 mt-auto mt-md-0 bg-dark p-4 text-center">

                        <img src={process.env.REACT_APP_PUBLIC_URL + "/img/JAM_MATE.svg"} alt="logo_JAM_MATE" height={80} className={'mb-4'} />

                        <InputBase
                            type={'password'}
                            value={state.password}
                            onChange={e => {
                                setState({...state, password: e.target.value})
                                errors.password && delete errors.password
                            }} 
                            fullWidth
                            placeholder='Password'
                            className='input-custom ps-4 py-2 text-white bg-black my-3'
                            endAdornment={(<MdPassword size={'2em'} className='text-white ms-2 me-4' />)}
                        />
                        {errors.password && <strong className='text-danger'>{errors.password[0]}</strong>}

                        <InputBase
                            type={'password'}
                            value={state.password_confirm}
                            onChange={e => {
                                setState({...state, password_confirm: e.target.value})
                                errors.password_confirm && delete errors.password_confirm
                            }} 
                            fullWidth
                            placeholder='Confirm password'
                            className='input-custom ps-4 py-2 text-white bg-black my-3'
                            endAdornment={(<MdPassword size={'2em'} className='text-white ms-2 me-4' />)}
                        />

                        {errors.password_confirm && <strong className='text-danger'>{errors.password_confirm[0]}</strong>}

                        <ButtonBase
                            sx={{ width: '100%' }}
                            color='primary'
                            className='text-white py-2 mt-3 bg-primary'
                            onClick={() => dispatch(resetPassword(state))}
                        >
                            Reset Password
                            <MdSend size='1.5em' className='ms-2' />
                        </ButtonBase>

                        <Button
                        onClick={() => navigate({pathname: '/'})}
                        variant='outlined'
                        className='mt-4'>
                            <MdArrowBack className='me-2' />
                            Back to Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    )
}

