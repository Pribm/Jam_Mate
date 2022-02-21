import React from 'react'
import { useNavigate } from 'react-router-dom'
import { change, login } from '../../store/Actions/Auth.actions'
import { useDispatch, useSelector } from 'react-redux'
import './Login.css'
import SignIn from './SignIn'
import SignUp from './SignUp'

export default function Login() {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const credentials = useSelector(state => state.AuthReducer.credentials)

    const success = useSelector(state => state.AuthReducer.success)

    const [signUp, setSignUp] = React.useState(false)

    React.useEffect(() => {

        if (success) {
            navigate('/home', { replace: true })
        }

    }, [success])

    const credentialsLogin = () => {
        dispatch(login(credentials))
    }

    return (
        <>
            <div className="container-fluid min-vh-100 bg-black background-login position-relative">
                <div className="container">
                    <div className="row align-items-center min-vh-100">
                        {
                            !signUp ?
                            <SignIn credentialsLogin={credentialsLogin} dispatch={dispatch} change={change} credentials={credentials} setSignUp={setSignUp}/>
                            :
                            <SignUp setSignUp={setSignUp} dispatch={dispatch}/>
                        }
                        <div className="col-md-6">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
