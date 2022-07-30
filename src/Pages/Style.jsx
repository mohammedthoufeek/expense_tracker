import styled from "styled-components";
import { Link } from "react-router-dom";
import './Form.css'
// .home, .about, .contact, .notfound ,.product, .signup 


export const Body = styled.div`
font-family: Montserrat;
height: 90vh;
display: flex;
justify-content: center;
align-items: center;
margin: 0 auto ;
overflow: hidden;
position: relative;
opacity: 1;
overflow: auto;
background: #e2a9e5;
background: -moz-linear-gradient(-45deg, #e2a9e5 15%, #2b94e5 100%);
background: -webkit-linear-gradient(-45deg, #e2a9e5 15%,#2b94e5 100%);
background: linear-gradient(135deg, #e2a9e5 15%,#2b94e5 100%);
@media only screen and (max-width:480px){  
  @media screen and (max-height: 720px) {
    overflow: scroll;
  }
overflow: scroll;
}
// height : -webkit-fill-avilable;

`;

export const FormContainer = styled.div`
  background: linear-gradient(135deg, #e2a9e5 15%,#2b94e5 100%);
  border-radius: 10px;
  width: 385px;
  max-width: 100%;
  min-height: 480px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 14px 28px rgba(0, 0, 0, .25),0px 10px 20px rgba(0, 0, 0, .22);
  @media only screen and (max-width:960px){  
    width: 340px;
    min-height: 440px;  
}
`;

export const FormTag = styled.form`
  font-family: 'Times New Roman', Times, serif;
  opacity: 1;
  background: #e2a9e5;
  background: -moz-linear-gradient(-45deg, #e2a9e5 15%, #2b94e5 100%);
  background: -webkit-linear-gradient(-45deg, #e2a9e5 15%,#2b94e5 100%);
  background: linear-gradient(135deg, #e2a9e5 15%,#2b94e5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  padding: 50px 50px;
  text-align: center;
  @media screen and (max-width:600px) {
    padding: 0 50px;
   }
`;

export const SocialContainer = styled.div`
  background-color: rgb(27, 26, 26);
  width: 100%;
  border: 2px soild black;
  border-radius: 15px;
  margin: 20px 0 10px 0;
  cursor: pointer;
  align-items: center;
  & button{
    border: 2px solid rgb(80, 80, 80);
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    padding: 10px;
  }
  & span{
    color: #fff;
    transform: translateX(100%);
  }
`;
export const FormTitle = styled.h1`

@media screen and (max-width:600px) {
  font-size: 16px;
  margin: 20px 0;
}
`;

export const InputBox = styled.input`
  border-radius: 5px;
  margin: 0px 10px;
  font-family: 'Times New Roman', Times, serif;
  border: none;
  background-color: #d3e4f1;
  width: 100%;
  margin: 5px 0;
  padding: 5px;
  outline: none;
  &:active{
  transform: scale(.98);

  } 
`;

export const TermsLink = styled(Link)`
text-decoration: none;
`;

export const SubmitLink = styled.button`
  font-family: 'Times New Roman', Times, serif;
  text-decoration: none;
  text-align: center;
  color: rgb(255, 255, 255);
  background-color: rgb(0, 0, 0);
  border-radius: 20px;
  padding: 10px 20px;
  width: 50%;
  border: none;
  margin: 20px auto;
  font-weight: bold;
  cursor: pointer;  
  &:active{
  transform: scale(.9);

  }
`;

// export const RegisterContainer = styled.div`
//   right: 0;
//   width:100%;   
// `;

export const InputCheckBox = styled.input`
  border-radius: 5px;
  margin: 0px 10px;
  font-family: 'Times New Roman', Times, serif;
  border: none;
  background-color: rgba(199, 199, 199, 0.658);
  width: 100%;
  margin: 5px 0;
  padding: 5px;
  outline: none;
  transform: translate(-140px, 20px);
  @media only screen and (max-width:960px){
    transform: translate(-130px, 23px);

}

`;

// Terms and Conditions 

export const TermsPageHeader = styled.div`
  background:  linear-gradient(to top right, #000000 0%, #3d3d3d 100%);
  width: 350px;
  height: 35px;  
  border: none;
  border-radius: 20px;
  position: absolute;
  top: 20px;
  right: 50%;
  transform: translateX(50%);
  text-align: center;
  color: #fff;
  font-family: 'Times New Roman', Times, serif;
  @media only screen and (max-width:960px){
    font-size: 12px;
    width: 260px;
    padding: 5px 0;  
}

`;

export const TermsPageContant = styled.div`
  margin: 20px 0 0 0 ; 
  height: 70vh;
  min-width: 85vw;  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;  
  overflow: hidden;
  box-shadow: 0px 14px 28px rgba(0, 0, 0, .25),0px 10px 20px rgba(0, 0, 0, .22);
  &h2{
  font-family: 'Times New Roman', Times, serif;
  }
  @media only screen and (max-width:960px){  
    height: 60vh;
}
`;

export const ContactFormTagWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70%;
  @media only screen and (max-width:480px){  
    margin-top: 2rem;
}
`;

export const ContactFormTag = styled.form`
  margin: 20px 0 0 0 ; 
  height: 60vh;  
  min-width: 40vw;  
  opacity: 1;
  background: #e2a9e5;
  background: -moz-linear-gradient(-45deg, #e2a9e5 15%, #2b94e5 100%);
  background: -webkit-linear-gradient(-45deg, #e2a9e5 15%,#2b94e5 100%);
  background: linear-gradient(135deg, #e2a9e5 15%,#2b94e5 100%);  

  border-radius: 10px;  
  overflow: hidden;
  box-shadow: 0px 14px 28px rgba(0, 0, 0, .25),0px 10px 20px rgba(0, 0, 0, .22);
  
  @media only screen and (max-width:960px){  
    height: 50vh;
    min-width: 80vw;
}
`;
export const ContactInputBox = styled.input`
  border-radius: 5px;
  margin: 10px;
  border: none;
  background-color: #d3e4f1;
  height: 2rem;
  width: 70%;
  margin: 5px 0;
  padding: 5px;
  outline: none;
  font-weight:bold;
  &:active{
    transform: scale(.96);

  } 
  @media only screen and (max-width:480px){ 
    width: 80%;
    margin : 7px;
    padding: 10px;
}
`;

export const ContactInputMessageBox = styled.textarea`
  border-radius: 5px;
  margin: 10px;
  border: none;
  resize: none;
  background-color:  #d3e4f1;
  width: 70%;
  margin: 5px 0;
  padding: 5px;
  outline: none;
  font-weight:bold;

  &:active{
  transform: scale(.96);
  } 
  @media only screen and (max-width:480px){ 
    width: 80%;
    margin : 7px;
    padding: 10px;
}
`; 

export const ContactFormTitle = styled.h1`
 text-align: center;
 margin: 40px 0 0 0;
 font-family: 'Times New Roman', Times, serif;
`;

export const ContactSubmitLink = styled.button`
  font-family: 'Times New Roman', Times, serif;
  text-decoration: none;
  font-size: 18px;
  text-align: center;
  color: rgb(255, 255, 255);
  background-color: rgb(0, 0, 0);
  border-radius: 20px;
  padding: 10px 20px;
  width: 25%;
  border: none;
  margin: 20px auto;
  font-weight: bold;
  cursor: pointer;  
  &:active{
  transform: scale(.9);

  }
`;


export const TermsAcceptButton = styled.button`
  color: #fff;
  background-color: rgba(58, 58, 58, 0.952);
  border-radius: 20px;
  padding: 10px 30px;
  width: fit-content;
  border: none;
  margin: 20px auto;
  font-weight: bold;
  cursor: pointer;  
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  font-size: large;

`;

export const FormContain = styled.div`
  background-color:  #ffff;
  margin: 20px 0 0 15px;
  width: fit-content;
  position: relative;
  left: 65px;
  border-radius: 30px;
  overflow: hidden;
`;
export const RLToggleButton = styled.button`
  padding: 10px 25px;
  border-radius: 30px;
  cursor: pointer;
  border: none;  
  background-color:  #ffff;
  background: transparent;
  position: relative;
  font-weight: bold;
`;

export const LoginCheckBox = styled.input`
transform: translate(-115px, 21px);
cursor: pointer;
width: 100%;
margin: 5px 0;
padding: 5px;
outline: none;
@media only screen and (max-width:960px){
    transform: translate(-115px, 22px);
}
`;


// spinner

export const SpinnerCenter = styled.div`
display: flex;
justify-content : center;
height: 90vh;
align-items: center;
background: #e2a9e5;
background: -moz-linear-gradient(-45deg, #e2a9e5 15%, #2b94e5 100%);
background: -webkit-linear-gradient(-45deg, #e2a9e5 15%,#2b94e5 100%);
background: linear-gradient(135deg, #e2a9e5 15%,#2b94e5 100%); 

`;

// forgotpassword

export const ForgotPassWordClick = styled.span`
color: #0000ff;
cursor: pointer;
margin: 10px 0 0 0;
`;

