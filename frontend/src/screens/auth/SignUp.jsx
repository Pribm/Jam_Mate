import React from 'react'
import { useNavigate } from 'react-router-dom'

import { register } from '../../store/Actions/Auth.actions'

import { useDispatch, useSelector } from 'react-redux'

export default function SignIn() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const errors = useSelector(state => state.AuthReducer.errors)
    const success = useSelector(state => state.AuthReducer.success)

    const [credentials, setCredentials] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    return (
        <>

        </>
    )
}
