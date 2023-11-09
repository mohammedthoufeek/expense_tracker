import React, { useRef } from 'react'
import './Register.css'

import { useProfile } from "../../../ContextApi/profile.context";
import firebase from 'firebase/app';


import { FaGoogle } from "react-icons/fa";

export let defaultName = '';

const Register = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { registerUser, SignInWithProvider, setIsRgisteration } = useProfile();

  // register with mail-id password

  const signUp = e => {
    e.preventDefault();
    defaultName = nameRef.current.value;
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    if (email && password && name) {

      registerUser(email, password, name);
    }
  }

  // register with google

  const SignUpwithGoogle = () => {
    SignInWithProvider(new firebase.auth.GoogleAuthProvider());
    setIsRgisteration(true)

  }
  return (
    <div className="register-container">
      <span className='register-main-title' >Sign-Up</span>
      <div className="register-google-button">
        <div className="register-google-icon">
          <FaGoogle />
        </div>
        <h4 className='register-google-title' onClick={SignUpwithGoogle}>Sign-Up with Google</h4>
      </div>
      <div className="register-type-seporator">
        -------------------- (Or) --------------------
      </div>
      <div className="register-form-input-div">
        <input ref={nameRef} className='register-form-input' type="text" placeholder='Name' />
        <input ref={emailRef} className='register-form-input' type="text" placeholder='Mail-ID' />
        <input ref={passwordRef} className='register-form-input' type="password" placeholder='Password' />
      </div>
      <div className="register-tern-div">
        <input type="checkbox" id="checkbox" />
        <span className='register-term-txt'>I have accepted all the Terms and Conditions </span>
      </div>
      <button className="register-submit-btn" onClick={signUp}>Sign-Up</button>
    </div>
  )
}

export default Register