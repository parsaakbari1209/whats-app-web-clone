import { Button } from '@material-ui/core'
import React from 'react'
import '../styles/Login.css'
import logo from '../assets/WhatsApp_Logo_1.png'
import { auth, provider } from '../firebase.js'
import { actionTypes } from '../context/reducer.js'
import { useStateValue } from '../context/StateProvider.js'

function Login() {

    const [{}, dispatch] = useStateValue()

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch((error) => alert(error.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src={logo} alt="not found!"/>
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
