import React from "react";
import styled from "styled-components";
import HomeComponent from "../../Components/TrackerComponents/HomeComponent";
import { useProfile } from "../../ContextApi/profile.context";
import { toast } from 'react-toastify';
import Draggable from 'react-draggable';
const HomeBody = styled.div`
margin-top: 0;
/* background: #e2a9e5;
background: -moz-linear-gradient(-45deg, #e2a9e5 15%, #2b94e5 100%);
background: -webkit-linear-gradient(-45deg, #e2a9e5 15%,#2b94e5 100%);
background: linear-gradient(135deg, #e2a9e5 15%,#2b94e5 100%);   */
background-color: rgb(228,228,228);
min-height: 100vh;
height: 100%;
min-width: 100%;

`;

const Container = styled.div`
display: flex;
flex-direction: column;
align-items : center;
font-family: Montserrat;

`;
const Headerdiv = styled.div`
margin: 100px 0 0 0;
width: 100%;
color:black;
font-size : 25px;
font-weight : bold;
text-align: center;

@media only screen and (max-width:960px){  
  font-size : 18px;
}
`;



function Home() {

  const { profile } = useProfile();

  if (!profile) {
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


  return (
    <HomeBody>
      <Container>
        <Headerdiv>
        </Headerdiv>
        <HomeComponent />
      </Container>
    </HomeBody>
  )

}

export default Home;
