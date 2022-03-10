import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function Login() {

    const navigate = useNavigate(); //programmatically navigate
    const [email, setEmail] = useState(''); //useState('') is default
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault() //prevent refresh on react
        // do firebase login
        signInWithEmailAndPassword(auth, email, password) //firebase v9 
            .then((auth)=>{
                navigate('/')
            })
            .catch(error => alert(error.message))
    }
    const register = e => {
        e.preventDefault() //prevent refresh on react
        // do firebase register
        createUserWithEmailAndPassword(auth, email, password) //firebase v9 
            .then((auth)=>{
                // it successfully created a new user with email and password
                console.log(auth)
                if (auth) {
                    navigate('/') //redirect to home page
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <Link to="/">
                <img 
                    className='login_logo'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                    alt=''
                />
            </Link>

            <div className='login_container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} /> {/* setEmail dynamic just as user input and trap input into {email} */}

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login_signInButton'>Sign In</button>
                </form>
                <p>
                    By signing-in you agree to AMAZON FAKE CLONE(HJ) Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice. 
                </p>
                <button onClick={register} className='login_registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
