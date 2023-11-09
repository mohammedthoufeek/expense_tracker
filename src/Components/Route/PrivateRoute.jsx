import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { useProfile } from '../../ContextApi/profile.context';

import './css/Loading.css'
import logo from '../../assests/images/et_logo.png'

const PrivateRoute = () => {
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    return (
      <div className='loader-div'>
        <img src={logo} alt=""  />
        <PropagateLoader />
      </div>
    )
  }

  if (!profile && !isLoading) {

    return (
      <>
        <Navigate to='/login' />

      </>
    )
  }
  return (
    <Outlet />
  )
}

export default PrivateRoute;