import React from "react";
import styled from "styled-components";
import MonthlyHome from "../../Components/MonthlyTrackerComponents/MonthlyHome";

import './MonthlyMode.css'

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
height: 100vh;
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



const Profile=()=>{

  return (
    <HomeBody>
      <Container>
        <MonthlyHome />
      </Container>
    </HomeBody>
  )

}
export default Profile