import React from 'react'
import './Navbar.css';
import { CgProfile } from 'react-icons/cg';
import { auth } from "../../misc/Firebase";
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';



const SignOutClick = styled.button`
  background-color: transparent;
  border: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 15px;
  font-weight: 402.5;
  &:hover{
    background-color: #f1f1f1
  }
`;

const OnSignOutClicked=()=>{
    auth.signOut().then(
      toast.success('Sign-Out Successful...!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    )
  }

const LoginAfterProfile = () => {
  return (
    <>
  <div class="dropdown">
 <span className='login-logo' > <CgProfile  value={{ color: '#fff'}} /></span>
  <div class="dropdown-content">
  <Link to='/' >Profile</Link>
  <SignOutClick onClick={OnSignOutClicked} >Sign-Out</SignOutClick>
  </div>
</div>
    </>
  )
}

export default LoginAfterProfile