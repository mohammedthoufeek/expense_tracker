import React from 'react'
import {Outlet ,Navigate} from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { useProfile } from '../../Context/profile.context';
import { SpinnerCenter } from '../../Pages/Style';


const PrivateRoute = () => {
    const {profile, isLoading} = useProfile();

if(isLoading && !profile){
  return(
    <SpinnerCenter>
    <ClimbingBoxLoader  />
    </SpinnerCenter>
  )
}

    if(!profile && !isLoading){
      
        return (
          <>
        <Navigate to='/login' />
        
        </>
    )}
  return (
    <Outlet/>
  )
}

export default PrivateRoute;