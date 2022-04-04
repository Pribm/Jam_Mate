import { Button, ButtonBase, CircularProgress, InputBase, Typography } from '@mui/material'
import React from 'react'
import { MdArrowBack, MdEmail, MdSend } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { forgotPassword } from '../../store/Actions/Auth.actions'

export const Forgot = ({setResetPassword, dispatch}) => {

    const [email, setEmail] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)

    const errors = useSelector(state => state.AuthReducer.errors)

    return (
        <div className="col-md-6 mt-auto mt-md-0 bg-dark p-4 text-center">

            <img src={process.env.REACT_APP_PUBLIC_URL + "/img/JAM_MATE.svg"} alt="logo_JAM_MATE" height={80} className={'mb-4'} />

            <Typography className='text-white'>
                Enter the email in which your user was registered. ;)
            </Typography>

            <InputBase
                type={'email'}
                value={email}
                onChange={e => {
                    setEmail(e.target.value)
                    errors.email && delete errors.email
                }}
                fullWidth
                placeholder='Email'
                className='input-custom ps-4 py-2 text-white bg-black my-3'
                endAdornment={(<MdEmail size={'2em'} className='text-white ms-2 me-4' />)}
            />
            {
                errors.email && <strong className='text-danger'>{errors.email[0]}</strong>
            }
            {
                isLoading &&
                <div className='d-flex align-items-center justify-content-center'>
                    <h6 className='text-white me-2'>Sending email</h6>
                    <CircularProgress size={'1.5rem'}/>
                </div>
            }
            <ButtonBase
                sx={{ width: '100%' }}
                color='primary'
                className='text-white py-2 mt-3 bg-primary'
                onClick={() => {
                    setLoading(true)
                    dispatch(forgotPassword(email)).then(res => {
                        setLoading(false)
                        if(res === 200) {
                            setEmail('')
                        }
                    })
                }}
            >
                Submit
                <MdSend size='1.5em' className='ms-2' />
            </ButtonBase>

            <Button variant='outlined' onClick={() => setResetPassword(false)} className='mt-4'>
                <MdArrowBack className='me-2' />
                Back to Login
            </Button>
        </div>
    )
}

