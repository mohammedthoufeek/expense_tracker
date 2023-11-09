import React from 'react'
import {Outlet ,Navigate} from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { useProfile } from '../../ContextApi/profile.context';
// import { SpinnerCenter } from '../../Pages/Style';
import './css/Loading.css'

const PublicRoute = () => {


  const {profile, isLoading} = useProfile();

    
if(isLoading && !profile){
  return(
    <div className='loader-div'>
        <PropagateLoader />
      </div>
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