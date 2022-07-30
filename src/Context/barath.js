// import Header from "./components/Header";
// import Tasks from "./components/tasks";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import AddEvent from "./components/Addevent";
// import { FaTimes, FaPlus } from "react-icons/fa";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   orderBy,
//   query,
//   serverTimestamp,
//   setDoc,
// } from "firebase/firestore";
// import db from "../firebase/firebase-config";
// import { useUserContext } from "../context/userContext";
// import { defaultName } from "../components/signup";

// const Todo = () => {
//   const [showAdd, setshowAdd] = useState(false);
//   const { user } = useUserContext();
//   const CollectionId = user.displayName + user.uid;
//   const [tasks, setTasks] = useState([{ text: "Loading....", id: "initial" }]);
//   const handleDelete = async (id) => {
//     setTasks(tasks.filter((x) => x.id !== id));
//     try {
//       const docRef = doc(db, CollectionId, `${id}`);
//       await deleteDoc(docRef);
//     } catch (e) {}
//   };
//   const addEvent = async (newTask) => {
//     try {
//       // var today = new Date();
//       // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//       // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//       // var dateTime = date+' '+time;

//       const collectionRef = collection(db, CollectionId);
//       const docRef = await addDoc(collectionRef, newTask);

//       const newTaskObj = {
//         ...newTask,
//         timestamp: serverTimestamp(),
//         id: docRef.id,
//       };
//       const newDoc = doc(db, CollectionId, docRef.id);
//       await setDoc(newDoc, newTaskObj);
//     } catch (e) {}
//   };

//   const showAddEvent = () => setshowAdd(!showAdd);

//   useEffect(() => {
//     const q = query(collection(db, CollectionId), orderBy("timestamp", "desc"));

//     const unsub = onSnapshot(q, (snapshot) =>
//       setTasks(() => snapshot.docs.map((doc) => doc.data()))
//     );

//     return unsub;
//   }, []);

//   return (
//     <div className="container-task">
//       <Header
//         btnMain={
//           showAdd ? (
//             <FaTimes style={{ color: "red" }} />
//           ) : (
//             <FaPlus style={{ color: "blue" }} />
//           )
//         }
//         btnTitle={showAdd ? "Close" : "Add Task"}
//         btnColor={showAdd ? "red" : "Blue"}
//         onshow={showAddEvent}
//         title="Todo Web Application"
//       />
//       {showAdd && <AddEvent onAdd={addEvent} />}
//       {tasks.length > 0 ? (
//         <Tasks onDelete={handleDelete} tasks={tasks} />
//       ) : (
//         <p style={{ textAlign: "center", marginTop: "40px" }}>
//           No Task To Show...!
//         </p>
//       )}
//     </div>
//   );
// };

// export default Todo;


// {
//   "rules": {
//     "profiles":{
//       "$user_id":{
//         ".read":"$user_id === auth.uid",
//         ".write":"$user_id === auth.uid"
//       }
//     },
//     ".read": false,
//     ".write": false
//   }
// }


// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import OverViewComponent from "./OverViewComponent";
// import TransactionsComponent from "./TransactionsComponent";

// const Container = styled.div`
//   background-color: white;
//   color: #0d1d2c;
//   display: flex;
//   flex-direction: column;
//   padding: 10px 22px;
//   font-size: 18px;
//   width: 360px;
//   align-items: center;
//   justify-content: space-between;
// `;

// const HomeComponent = (props) => {
//     const [transactions, updateTransaction] = useState([]);
//     const [expense, updateExpense] = useState(0);
//     const [income, updateIncome] = useState(0);

//     const calculateBalance = () => {
//         let exp = 0;
//         let inc = 0;
//         transactions.map((payload) =>
//             payload.type === "EXPENSE"
//                 ? (exp = exp + payload.amount)
//                 : (inc = inc + payload.amount),
//         );
//         updateExpense(exp);
//         updateIncome(inc);
//     };
//     useEffect(() => calculateBalance(), [transactions]);

//     const addTransaction = (payload) => {
//         const transactionArray = [...transactions];
//         transactionArray.push(payload);
//         updateTransaction(transactionArray);
//     };
//     return (
//         <Container>
//             <OverViewComponent
//                 expense={expense}
//                 income={income}
//                 addTransaction={addTransaction}
//             />
//             {transactions?.length ? (
//                 <TransactionsComponent transactions={transactions} />
//             ) : (
//                 ""
//             )}
//         </Container>
//     );
// };
// export default HomeComponent;


// import { SMTPClient } from 'emailjs';

// const client = new SMTPClient({
// 	user: nameRef.current.value,
// 	password: 'password',
// 	host: 'smtp.your-email.com',
// 	ssl: true,
// });

// try {
// 	const message = await client.sendAsync({
// 		text: messageRef.current.value,
// 		from: emailRef.current.value,
// 		to: "jaivishnu063@gmail.com",
// 		cc: 'mohammedthoufeek.it20@bitsathy.ac.in',
// 		subject: subjectRef.current.value,
// 	});
// 	console.log(message);
// } catch (err) {
// 	console.error(err);
// }



// const Cell =styled.div`
//   display: flex;
//   flex-direction: row;
//   background-color: white;
//   width: 20rem;
//   color: #0d1d2c;
//   padding: 10px 15px;
//   margin: 10px 0 10px 0;
//   font-size: 14px;
//   border-radius: 2px;
//   border: 1px solid #e6e8e9;
//   align-items: center;
//   font-weight: normal;
//   justify-content: space-between;
//   border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};  
//   `;
//   const TnxDetailWrapper = styled.div`
//      display: block;
 
//   `;

// const AddTnxDetailWrapper = styled.div`
//      display: block;
//      background-color: aqua;

//   `;


// const TransactionComponent = (props) => {

//   const [searchText, updateSearchText] = useState("");
//   const [filteredTransaction, updateTxn] = useState(props.transactions);


// const TransactionCell = (props) => {
//   return (
//     <Cell isExpense={props.item?.type === "EXPENSE"}>
//       <TnxDetailWrapper>
//       <span>{props.item?.desc}</span>
        
//       <span>${props.item?.amount}</span>
//       </TnxDetailWrapper>
      
//       <AddTnxDetailWrapper>
//       <span>{props.item?.dateAndTime.toString()}</span>
//       </AddTnxDetailWrapper>
//     </Cell>
//   );
// };




// import React, { useRef, useState } from "react";
import {Body, ContactFormTag, ContactFormTagWrapper, ContactFormTitle, ContactInputBox, ContactInputMessageBox, ContactSubmitLink} from "./Style"
// import { toast } from 'react-toastify';
// import emailjs from 'emailjs-com';


// function Contact() {

//     const [value , setValue] = useState({
//         name : '',
//         email : '',
//         subject : '',
//         message : ''
//     });
//     const form = useRef(null);
//     const emailRef = useRef(null);
//     const nameRef = useRef(null);
//     const messageRef = useRef(null);
//     const subjectRef = useRef(null);

//   const clickHandler = ()=>{
//     toast.success('Message Sent...!', {
//       position: "top-center",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });


//     setValue({
//         name : nameRef.current.value,
//         email : emailRef.current.value,
//         subject : subjectRef.current.value,
//         message : messageRef.current.value
//       })
//       console.log(value);

//   }




//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs.send('service_2i9bm8i', 'template_m4xhek4', form.current, '28AjKegQKZyj66htw')
//       .then((result) => {
//           console.log("success",result.text);
//       }, (error) => {
//           console.log(error.text);
//       });
//   };


//   return (
//     <>
      // <Body>          
      //     <ContactFormTag ref={form} onSubmit={sendEmail}>
      //   <ContactFormTitle>Send E-Mail</ContactFormTitle>
      //   <ContactFormTagWrapper>
      //   <ContactInputBox  required ref={nameRef} name="user_name"  type="text" placeholder="NAME" />
      //   <ContactInputBox  required ref={emailRef} name="user_email" type="email" placeholder="MAIL-ID" />
      //   <ContactInputBox  required ref={subjectRef} name="user_sub" type="text" placeholder="SUBJECT" />
      //   <ContactInputMessageBox  required ref={messageRef} name="user_message" type="text" placeholder="MESSAGE" />

      //   <ContactSubmitLink type="submit" value="Send" onClick={clickHandler}>
      //     SEND
      //   </ContactSubmitLink>
      //   </ContactFormTagWrapper>
             
      // </ContactFormTag>

            
      //   </Body>
//     </>
//   );}
// export default Contact;


import React,  { useRef } from "react";
import {Body} from "./Style"
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';


function Contact() {

    const form = useRef();
  const clickHandler = ()=>{
    toast.success('Message Sent...!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });


  

  }




  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.send('service_2i9bm8i', 'template_m4xhek4', form.current, '28AjKegQKZyj66htw')
      .then((result) => {
          console.log("success",result.text);
      }, (error) => {
          console.log(error.text);
      });
  };


  return (
  
               
      <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Sub</label>
      <input type="text" name="user_sub" />
      <label>Message</label>
      <textarea name="message"/>
      <input onClick={clickHandler} type="submit" value="Send" />
    </form>
      

  );}
export default Contact;


