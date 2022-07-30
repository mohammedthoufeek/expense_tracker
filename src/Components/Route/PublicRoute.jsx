import React from 'react'
import {Outlet ,Navigate} from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { useProfile } from '../../Context/profile.context';
import { SpinnerCenter } from '../../Pages/Style';

const PublicRoute = () => {


  const {profile, isLoading} = useProfile();

    
if(isLoading && !profile){
  return(
    <SpinnerCenter>
    <ClimbingBoxLoader  />
    </SpinnerCenter>
      )
}

    if(profile && !isLoading){
      
        return (          
        <Navigate to='/' />           
        )
    }

  return (
    <Outlet/>
  )
}

export default PublicRoute;