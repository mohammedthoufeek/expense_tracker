import React, { useRef } from 'react'
import './Login.css'

import { FaGoogle } from "react-icons/fa";
import { useProfile } from '../../../ContextApi/profile.context';
import firebase from 'firebase/app';


const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { SignInUser, forgotPassword, SignInWithProvider } = useProfile();

  // login with mail-id password

  const signIn = e => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email && password) {
      SignInUser(email, password);

    }
    else {
      emailRef.current.focus()
    }
  }
  const onClickForgotPassword = () => {
    const email = emailRef.current.value;
    if (email) {
      forgotPassword(email).then(() => {
        emailRef.current.value = "";
      });
    }
    else {
      emailRef.current.focus();

    }
  };

  // login with google

  const SignInwithGoogle = () => {
    SignInWithProvider(new firebase.auth.GoogleAuthProvider());

  }

  return (
    <div className="login-container">
      <span className='login-main-title' >Sign-In</span>
      <div className="login-google-button" onClick={SignInwithGoogle}>
        <div className="login-google-icon">
          <FaGoogle />
        </div>
        <h4 className='login-google-title'>Sign-In with Google</h4>
      </div>
      <div className="login-type-seporator">
        -------------------- (Or) --------------------
      </div>
      <div className="login-form-input-div">
        <input ref={emailRef} className='login-form-input' type="text" placeholder='Mail-ID' />
        <input ref={passwordRef} className='login-form-input' type="password" placeholder='Password' />
      </div>
      <div className="login-remember-div">
        <input type="checkbox" id="checkbox" />
        <span className='login-remember-txt'>Remember My Password</span>
      </div>
      <span className='login-forgot-txt' onClick={onClickForgotPassword} >Forgot Password?</span>
      <button className="login-submit-btn" onClick={signIn}>Sign-In</button>
    </div>
  )
}

export default Login