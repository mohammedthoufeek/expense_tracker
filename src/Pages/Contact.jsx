
import React,  { useRef } from "react";
import {Body, ContactFormTag, ContactFormTagWrapper, ContactFormTitle, ContactInputBox, ContactInputMessageBox, ContactSubmitLink} from "./Style"
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';


function Contact() {

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_2i9bm8i', 'template_m4xhek4', form.current, '28AjKegQKZyj66htw')
      .then((result) => {
        toast.success('Message Sent...!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }); 
          console.log("success",result.text);
      }, (error) => {
          console.log(error.text);
      });
  };


  return (
  
               
<Body>    
        <ContactFormTag ref={form} onSubmit={sendEmail}>
        <ContactFormTitle>Send E-Mail</ContactFormTitle>
        <ContactFormTagWrapper>
        <ContactInputBox  required  name="user_name"  type="text" placeholder="NAME" />
        <ContactInputBox  required  name="user_email" type="email" placeholder="MAIL-ID" />
        <ContactInputBox  required  name="user_sub" type="text" placeholder="SUBJECT" />
        <ContactInputMessageBox cols="30" rows="5"  required  name="user_message" type="text" placeholder="MESSAGE" />

        <ContactSubmitLink type="submit" value="Send">
          SEND
        </ContactSubmitLink>
        </ContactFormTagWrapper>
             
      </ContactFormTag>

            
</Body>
      

  );} 
export default Contact;


