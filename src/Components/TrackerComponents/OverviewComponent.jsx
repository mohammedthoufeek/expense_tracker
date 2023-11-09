import React, { useState } from 'react'
import styled from "styled-components";
import { database } from '../../misc/Firebase';
import firebase from 'firebase/app';
import { useProfile } from '../../ContextApi/profile.context'
import { toast } from 'react-toastify';
import './TrackerComponent-css/TrackerComponent.css'

//uid

import { uid } from 'uid/secure'

// icons**********

import { IoMdInformationCircle } from "react-icons/io";


const Container = styled.div`
/* background: linear-gradient(135deg, #e2a9e5 15%,#2b94e5 100%); 
 */
// background-color: #116466;
background-color: #50AE56;
display: flex;
flex-direction: column;
font-family: Montserrat;
align-items : center;
padding : 10px ;
border-radius: 4px;
box-shadow: 0px 14px 28px rgba(0, 0, 0, .25),0px 10px 20px #00000019;
margin: 10px;
width:100%;

`;
const Balance = styled.div`
display:flex;
width:100%;
flex-direction: row;
justify-content:space-between;
align-items : center;
font-size:18px;

`;
const AddButton = styled.button`
background:black;
color:white;
padding: 5px 10px;
border-radius: 4px;
cursor:pointer;
font-weight:bold;
font-size:15px;
  &:active{
   
    transform: scale(0.98);
    /* Scaling button to 0.98 to its original size */
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    /* Lowering the shadow */

  }`;


const NewTransactionContainer = styled.div`
display:flex;
flex-direction : column;
border :1px solid #e6e8e9;
gap : 10px;
padding: 15px 20px;
margin: 20px;
width:100%;
box-sizing: border-box;
& input {
  outline:none;
  padding:10px 12px;
  border-radius: 4px;
  border :1px solid #e6e8e9;
 
}
`;
const RadioBox = styled.div`
display:flex;
flex-direction : row;
width:100%;
align-items:center;
gap: 10px;
 & input , label{
  cursor: pointer;
 }

`;
const Expense = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
`;
const ExpenseBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  padding: 15px 20px;
  width: 135px;
  font-size: 14px;
  & span{
    font-weight: bold;
    font-size: 20px;
    color: ${(props) => (props.isIncome ? "green" : "red")};

  }`;
const OverviewComponent = (props) => {

  const NewTransactionView = (props) => {
    const [amount, setAmount] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState("EXPENSE");
    const { profile } = useProfile();

    const newTransaction = async (profile) => {

      var uuid = uid();

      try {
        await database
          .ref(`/profiles/${profile.uid}/values`)
          .push({
            id: uuid,
            amount: amount,
            desc: desc,
            type: type,
            timeStamp: firebase.database.ServerValue.TIMESTAMP,
            dateAndTime: Date.now()
          })
          .then(
            toast.success('Transation Added...!', {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          )
          .catch(alert);
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    }
    const clickedNewTransaction = () => {
      newTransaction(profile);
      setIsAddClicked(false);
    }
    return (
      <NewTransactionContainer>

        <input required placeholder='Amount' value={amount} type="number" onChange={(e) => { setAmount(e.target.value) }} />
        <input required placeholder='Description' value={desc} onChange={(e) => { setDesc(e.target.value) }} />
        <RadioBox>
          <input required type="radio" id="expense" name="TxnType" value="EXPENSE" checked={type === "EXPENSE"} onChange={(e) => setType(e.target.value)} />
          <label htmlFor="expense">Expense</label>
          <input required type="radio" id="income" name="TxnType" value="INCOME" checked={type === "INCOME"} onChange={(e) => setType(e.target.value)} />
          <label htmlFor="income">Income</label>
        </RadioBox>
        <AddButton onClick={amount && desc && clickedNewTransaction}>Add Transaction</AddButton>

      </NewTransactionContainer>
    )
  }
  const [isAddClicked, setIsAddClicked] = useState(false);

  return (
    <Container>

      <Balance>
        Balance : ₹{parseInt(props.income) - parseInt(props.expense)}
        <div className='addInfo-Wrapper  '  >
          <AddButton onClick={() => {
            setIsAddClicked(!isAddClicked)
          }}>{isAddClicked ? "Cancel" : "Add"}</AddButton>
          <div className='tooltip-home' >
            <IoMdInformationCircle style={{ fontSize: '20px' }} />
            <span class="tooltiptext-home">
              About Expense tracker
            </span>
          </div>
        </div >

      </Balance>
      {isAddClicked && <NewTransactionView setIsAddClicked={setIsAddClicked} newTransaction={props.newTransaction} />}
      <Expense>
        <ExpenseBox isIncome={false}>
          Expense<span>₹{props.expense}</span>
        </ExpenseBox>
        <ExpenseBox isIncome={true}>
          Income<span>₹{props.income}</span>
        </ExpenseBox>
      </Expense>
    </Container>
  )
}

export default OverviewComponent

