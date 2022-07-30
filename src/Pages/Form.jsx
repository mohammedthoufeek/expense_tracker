import React, { useState } from "react";
import LogIn from "./LogIn";
import Register from "./Register";
import {Body,FormContain,FormContainer, RLToggleButton} from "./Style"

function Form() {
  const [login, setLogin] = useState(true);
  const handleRegisterClick = () => {
    setLogin(false);
  };
  const handleLogInClick = () => {
    setLogin(true);
  };
  return (
    <>
      <Body>
        <FormContainer>
          <FormContain>
            <RLToggleButton
              style={
                login
                  ? {
                      backgroundColor: "rgba(0, 0, 0, 0.952)",
                      color: "white",
                      transition: ".5 s",
                    }
                  : { backgroundColor: "white" }
              }
              
              onClick={handleLogInClick}
            >
             LOGIN
            </RLToggleButton>
            <RLToggleButton
              style={
                login
                  ? { backgroundColor: "white" }
                  : {
                      backgroundColor: "rgba(3, 3, 3, 0.952)",
                      color: "white",
                      transition: ".5 s",
                    }
              }
              
              onClick={handleRegisterClick}
            >
              REGISTER
            </RLToggleButton>
          </FormContain>
          {login ? <LogIn /> : <Register  />}
        </FormContainer>
      </Body>
    </>
  );
}

export default Form;
