
import { FaGoogle } from "react-icons/fa";
import { ForgotPassWordClick, FormTag, FormTitle, InputBox, LoginCheckBox, SocialContainer, SubmitLink } from "./Style";
import styled from "styled-components";
import { useRef } from "react";
import { useProfile } from "../Context/profile.context";
import  firebase from 'firebase/app';


const GoogleButton = styled.button`
transform: translateX(-130%);
@media only screen and (max-width:480px){
  transform: translateX(-90%);

}
@media only screen and (max-width:960px){
  transform: translateX(-90%);

}

`;
const GoogleSignInTitle =styled.div`
color: #fff;
display: inline-block;
 transform: translateX(-20px);
`;

function LogIn() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
const { SignInUser , forgotPassword , SignInWithProvider } = useProfile();


// login with google



    // login with mail-id password

    const signIn = e =>{
        e.preventDefault();
          const email = emailRef.current.value;
          const password = passwordRef.current.value;

         if (email && password) {
          SignInUser(email, password);
         
         }
         else{
          emailRef.current.focus()
         }
    }
    const onClickForgotPassword = () => {
      const email = emailRef.current.value;
      if (email){
        forgotPassword(email).then(() => {
          emailRef.current.value = "";
        });
      }
      else{
        emailRef.current.focus();

      }
    };
  

const SignInwithGoogle =()=>{
  SignInWithProvider(new firebase.auth.GoogleAuthProvider());

}

  return (

          <FormTag action="/">
            <FormTitle>Log-In</FormTitle>
            <SocialContainer 
            onClick={SignInwithGoogle}
            >              
              <GoogleButton>
                <FaGoogle />
              </GoogleButton>
              <GoogleSignInTitle>Sign-In with Google</GoogleSignInTitle>
            </SocialContainer>

            <InputBox ref={emailRef}  required type="email" placeholder="MAIL-ID" />
            <InputBox ref={passwordRef} required type="password" placeholder="PASSWORD" />
            <LoginCheckBox type="checkbox" id="checkbox" />
            <span>Remember My Password</span>
            <ForgotPassWordClick onClick={onClickForgotPassword}>Forgot Password?</ForgotPassWordClick>
            
            <SubmitLink  type="submit" onClick={signIn}>
          LOG-IN
           </SubmitLink>
          </FormTag>
          

  );
}

export default LogIn;


