import React from "react"; 
import styled from "styled-components";
import HomeComponent from "../Components/TrackerComponents/HomeComponent";
import { useProfile } from "../Context/profile.context";
import { defaultName } from "./Register";
import { toast } from 'react-toastify';

const HomeBody = styled.div`
margin-top: 0;
background: #e2a9e5;
background: -moz-linear-gradient(-45deg, #e2a9e5 15%, #2b94e5 100%);
background: -webkit-linear-gradient(-45deg, #e2a9e5 15%,#2b94e5 100%);
background: linear-gradient(135deg, #e2a9e5 15%,#2b94e5 100%);  
min-height: 90vh;
height: 100%;
`;

const Container = styled.div`
display: flex;
flex-direction: column;
align-items : center;
font-family: Montserrat;

`;
const Header = styled.span`
margin-top: 30px;
color:black;
font-size : 25px;
font-weight : bold;
@media only screen and (max-width:960px){  
  transform: translateX(-25%);
  font-size : 18px;
}
`;



function Home() {

  const {profile} = useProfile();
 
  if(!profile){
    {
      toast.info('Login to Enter...!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }








  
  
  return(
    <HomeBody>      
  <Container>
    <Header>
       {`Hey, ${profile.displayName ? profile.displayName : defaultName} ...!`}

        </Header>
    
    <HomeComponent/>
  </Container> 
    </HomeBody>
  ) 
  
}

export default Home;
