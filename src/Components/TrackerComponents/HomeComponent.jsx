
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useProfile } from '../../Context/profile.context';
import { database } from '../../misc/Firebase';
import OverviewComponent from './OverviewComponent';
import TransactionComponent from './TransactionComponent';

const Container = styled.div`
display: flex;
flex-direction: column;
margin: 30px 0 10px;
font-family: Montserrat;
align-items : center;
width:360px;
`;
const HomeComponent  = (props) => {
  const [transactions, setTransactions] =useState([]);
  const [expense, updateExpense] =useState(0);
  const [income, updateIncome] =useState(0);


  const {profile} = useProfile();

useEffect(()=>{
  async function fetchData() {
     database
      .ref(`/profiles/${profile.uid}/values`)
      .on("value", function (snapshot) {
        var temp = []
        snapshot.forEach(function (childSnapshot) {
          var data = childSnapshot.val();
          console.log("data : ", data); 
          temp.push({                
            amount: data.amount,
            desc: data.desc,
            type: data.type,
            timeStamp : data.timeStamp,
            dateAndTime : data.dateAndTime
          })        
        });

        setTransactions( temp );
      });
  }
  fetchData();
 
}, [profile.uid])



const newTransaction =(item)=>{
  const transationArray=[...transactions];
  transationArray.push(item);
  setTransactions(transationArray);
 
  };
  const calculateBalance=()=>{
    var exp = 0;
    let inc = 0;
    transactions.map((item)=>
    {item.type==="EXPENSE" ?( exp= parseInt(exp)+ parseInt(item.amount)):(inc= parseInt(inc)+ parseInt(item.amount)) }
  );
  updateExpense( parseInt(exp));
  updateIncome(parseInt(inc));
  };
useEffect(() => calculateBalance(),[transactions , calculateBalance]);

  return (
    <Container>
      <OverviewComponent newTransaction={newTransaction} expense={expense} income={income}/>
      {transactions?.length ? (
                <TransactionComponent transactions={transactions} />
            ) : " "}
    </Container>
  )
}

export default HomeComponent 