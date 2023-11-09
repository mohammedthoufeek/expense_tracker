import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { toast } from 'react-toastify';
import './Monthly-tracker-css/Monthly.css'


// useProfile **************
import { useProfile } from '../../ContextApi/profile.context';


//database****************
import firebase from 'firebase/app';
import { database } from '../../misc/Firebase';
import MonthlyShowData from './MonthlyShowData';


// icons********************
import { MdDeleteSweep } from "react-icons/md";



const Container = styled.div`
background-color: #50AE56;
display: flex;
flex-direction: column;
font-family: Montserrat;
align-items : center;
padding : 10px ;
border-radius: 4px;
box-shadow: 0px 14px 28px rgba(0, 0, 0, .25),0px 10px 20px #00000019;
margin-top: 20vh;
width:100%;
height:100%;

`;
const Balance = styled.div`
display:flex;
width:100%;
flex-direction: row;
justify-content:space-between;
align-items : center;
font-size:18px;
gap:20px


`;
const AddAndDotWrapper = styled.div`
display:flex;
justify-content:center;
align-items : center;
flex-direction: row;
gap:20px


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


const ExpenseBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  margin: 10px;
  border: 1px solid #e6e8e9;
  padding: 15px 20px;
  width: 100%;
  font-size: 14px;
  text-align:center;
  & span{
    font-weight: bold;
    font-size: 20px;
    color: green;

  }`;


const MonthlyOverview = (props) => {

  const [addToggleButton, setAddToggleButton] = useState(false);
  const [amount, setAmount] = useState(null);
  const [desc, setDesc] = useState('');

  const [expenseId, setexpenseId] = useState(null)
  const [incomeProp, setIncomeProp] = useState(null)

  const [deleteClicked, setDeleteClicked] = useState(false)

  // contextAppi****************
  const { profile, DeleteHandle ,InfoDownApi } = useProfile();





  useEffect(() => {
    setIncomeProp(props.income)
    console.log(incomeProp);
  })

  console.log(props);

  useEffect(() => {
    database
      .ref(`/profiles/${profile.uid}/monthly`)
      .on("value", function (snapshot) {
        snapshot.forEach(function (child) {
          setexpenseId(child.key)
        })
      });
  })


  // set expense to database****************
  const newTransaction = (profile) => {

    setAddToggleButton(false);

    try {

      database
        .ref(`/profiles/${profile.uid}/monthly/${expenseId}/Aexpense`)
        .push({
          expense: amount,
          desc: desc,
          timeStamp: firebase.database.ServerValue.TIMESTAMP,
          dateAndTime: Date.now()
        })
        .then(
          toast.success('Expense Added...!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }),
        )
        .catch(alert);
    }

    catch (error) {

    }
  }

  const clickedNewTransaction = () => {

    if (amount && desc) {

      newTransaction(profile);
      setAmount()
      setDesc()
    }
  }

  const handleIncomeDelete = (obj) => {
    database
      .ref(`/profiles/${profile.uid}/monthly/${obj}/`).remove()
      .then(
        toast.success('Income Deleted...!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
    console.log('obj', obj);
  }

  const DeleteClickHandle = () => {
    handleIncomeDelete(props.incomeId)
    setDeleteClicked(true)
    DeleteHandle(true)
    InfoDownApi(false)
  }

  return (
    <>
      <Container>

        <Balance>
          Monthly Mode
          <AddAndDotWrapper >
            <AddButton onClick={() => setAddToggleButton(x => !x)}>{addToggleButton ? "Cancel" : "Add"}</AddButton>
            <div class="tooltip"><MdDeleteSweep onClick={DeleteClickHandle} style={{ cursor: 'pointer', color: 'black', fontSize: '20px' }} />
              <span class="tooltiptext">Delete Income</span>
            </div>

          </AddAndDotWrapper>
        </Balance>

        {

          addToggleButton &&
          <NewTransactionContainer>

            <input required placeholder='Amount' value={amount} type="number" onChange={(e) => { setAmount(e.target.value) }} />
            <input required placeholder='Description' value={desc} onChange={(e) => { setDesc(e.target.value) }} />
            <AddButton onClick={amount && desc && clickedNewTransaction}>Add Transaction</AddButton>

          </NewTransactionContainer>

        }

        <ExpenseBox>
          Income<span>₹{incomeProp}</span>
        </ExpenseBox>
      </Container>
      <MonthlyShowData expenseId={expenseId} deleteClicked={deleteClicked} income={props.income} amountInBox={amount} />
    </>
  )
}

export default MonthlyOverview