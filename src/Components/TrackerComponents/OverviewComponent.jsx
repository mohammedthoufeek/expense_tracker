import React,{ useState} from 'react'
import styled from "styled-components";
import { database } from '../../misc/Firebase';
import  firebase from 'firebase/app';
import {useProfile} from '../../Context/profile.context'
import { toast } from 'react-toastify';


const Container = styled.div`
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
const AddButton =styled.button`
background:black;
color:white;
padding: 5px 10px;
border-radius: 4px;
cursor:pointer;
font-weight:bold;
font-size:15px;
`;
const NewTransactionContainer =styled.div`
display:flex;
flex-direction : column;
border :1px solid #e6e8e9;
gap : 10px;
padding: 15px 20px;
margin: 20px;
width:100%;
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
    color: ${(props)=>(props.isIncome ? "green" : "red")};

  }`;
const OverviewComponent = (props) => {

const NewTransactionView =(props)=>{
  const [amount , setAmount] = useState();
  const [desc , setDesc] = useState();
  const [type , setType] = useState("EXPENSE");  
  const {profile} = useProfile();

  const newTransaction =async(profile)=>{
  
    

    try {
      await database
      .ref(`/profiles/${profile.uid}/values`)
      .push({
        amount: amount,
        desc: desc,
        type: type,
        timeStamp : firebase.database.ServerValue.TIMESTAMP,
        dateAndTime : Date.now()  
      })
      .then(
        toast.success('Transation Added...!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .catch(alert);
    } catch (error) {
      alert(error)
      console.log('database',error);
    }   
}
const clickedNewTransaction=()=>{
  newTransaction(profile);
  setIsAddClicked(false);
}
  return(
  <NewTransactionContainer>

    <input placeholder='Amount' value={amount} type="number" onChange={(e)=>{setAmount(e.target.value)}}/>
    <input placeholder='Description' value={desc} onChange={(e)=>{setDesc (e.target.value)}}/>
    <RadioBox>
     <input type="radio" id="expense" name="TxnType"  value="EXPENSE" checked={type === "EXPENSE"}onChange={(e)=>setType(e.target.value)}/>
     <label htmlFor="expense">Expense</label>
     <input type="radio" id="income" name="TxnType" value="INCOME" checked={type === "INCOME"} onChange={(e)=>setType(e.target.value)}/>
     <label htmlFor="income">Income</label>
    </RadioBox>
     <AddButton onClick={clickedNewTransaction}>Add Transaction</AddButton>
  </NewTransactionContainer>
  )
}
const [isAddClicked, setIsAddClicked] = useState(false);

  return (
    <Container>

    <Balance>   
        Balance : ₹{parseInt(props.income) - parseInt(props.expense)}
        <AddButton onClick={()=>{
          setIsAddClicked(!isAddClicked)
        }}>{isAddClicked ? "Cancel" : "Add"}</AddButton>
    </Balance>
    {isAddClicked && <NewTransactionView setIsAddClicked={setIsAddClicked} newTransaction={props.newTransaction}/>}
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

