import React, { useState } from 'react'
import './Form.css'

import Login from './Login/Login'
import Register from './Register/Register'

const Form = () => {

  const [isSignIn, setIsSignIn] = useState(true)

  return (
    <div className="form-container-main">
      <div className="form-container">
        <div className="from-toggle-div"  >

          <button className='form-toggle-btn' style={
            isSignIn
              ? {
                backgroundColor: "rgba(0, 0, 0, 0.952)",
                color: "white",
                transition: ".5 s",
              }
              : { backgroundColor: "white" }
          }
            onClick={() => setIsSignIn(true)}
          >Sign-In</button>

          <button className='form-toggle-btn' style={
            isSignIn
              ? { backgroundColor: "white" }
              : {
                backgroundColor: "rgba(3, 3, 3, 0.952)",
                color: "white",
                transition: ".5 s",
              }
          }
            onClick={() => setIsSignIn(false)}
          >Sign-Up</button>
        </div>
        <div className="form-toggle-contact">
          {isSignIn ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  )
}

export default Form