// import React, { useRef } from "react";
// import { auth } from "../misc/Firebase";
// import { FormTag, FormTitle, InputBox, InputCheckBox, SubmitLink, TermsLink} from "./Style"
// const  Register=() =>{
//   const nameRef = useRef(null);
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);
 
//   const signUp = e =>{
//       e.preventDefault();
//       auth.createUserWithEmailAndPassword(    
//           emailRef.current.value,
//           passwordRef.current.value
//       ).then( async ()=>{
//        await auth.currentUser.updateProfile( {displayName: nameRef.current.value})
       
//       })
//       .then(user=>{
//         console.log(user);
//         console.log(nameRef.current.value);
//       }).catch(err=>{
//           console.log(err)
//       })
//   }
 
//   return (
//       <FormTag action="/">
//         <FormTitle>Create Account</FormTitle>

//         <span></span>
//         <InputBox ref={nameRef} required type="text" placeholder="NAME" />
//         <InputBox ref={emailRef} required type="email" placeholder="MAIL-ID" />
//         <InputBox ref={passwordRef} required type="password" placeholder="PASSWORD" />
//         <InputCheckBox required type="checkbox" />

//         <span>
//           I have accepted all the
//           <TermsLink to="/terms-and-conditions">
//             Terms and Conditions
//           </TermsLink>
//         </span>
//         <SubmitLink type="submit" onClick={signUp} >
//           REGISTER
//         </SubmitLink>
//       </FormTag>
//   );
// }
// export default Register;


import React, { useRef } from "react";
import { useProfile } from "../Context/profile.context";
import { FormTag, FormTitle, InputBox, InputCheckBox, SubmitLink, TermsLink} from "./Style"
export let defaultName = '';
const  Register=() =>{
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const {registerUser} = useProfile();
 
  const signUp = e =>{
    e.preventDefault();
    defaultName = nameRef.current.value;
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    if (email && password && name){

      registerUser(email, password, name);  
    } 
  }
  return (
      <FormTag action="/">
        <FormTitle>Create Account</FormTitle>

        <span></span>
        <InputBox ref={nameRef} required type="text" placeholder="NAME" />
        <InputBox ref={emailRef} required type="email" placeholder="MAIL-ID" />
        <InputBox ref={passwordRef} required type="password" placeholder="PASSWORD" />
        <InputCheckBox required type="checkbox" />

        <span>
          I have accepted all the
          <TermsLink to="/terms-and-conditions">
            Terms and Conditions
          </TermsLink>
        </span>
        <SubmitLink type="submit" onClick={signUp} >
          REGISTER
        </SubmitLink>
      </FormTag>
  );
}
export default Register;
