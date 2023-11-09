import React, { useCallback, useEffect, useState } from 'react'
import styled from "styled-components";
import { useProfile } from '../../ContextApi/profile.context';
import './Monthly-tracker-css/Monthly.css'


import { database } from '../../misc/Firebase';


const Container = styled.div`
display: flex;
flex-direction: column;
align-items:flex-start;
padding: 10px 22px;
font-size: 18px;
width: 360px;
gap: 10px;
font-weight: bold;
& input{
  padding:10px 12px;
  border-radius: 12px;
  background: #d9d9d9;
  border: 1px solid #cccccc;
  outline: none;
  width: 20rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
`;


const TitleAndPdfWrapper = styled.div`
display: flex;
align-items: center;
color : black;
`;

const Cell = styled.div`  
  background-color: white;
  width: 20rem;
  color: #0d1d2c;
  padding: 10px 15px;
  margin: 10px 0 0 0;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  cursor: pointer;
  border-right: 4px solid red ; 
  -webkit-box-shadow: 0px 8px 15px -4px rgba(38,38,38,0.45);
-moz-box-shadow: 0px 8px 15px -4px rgba(38,38,38,0.45);
box-shadow: 0px 8px 15px -4px rgba(38,38,38,0.45);
  &:hover{
  -webkit-transform: scale(0.9);
  -ms-transform: scale(1);
  transform: scale(1.03);
  transition: .2s ease-in-out;
  } 
  &:active{
  transform: scale(.99);
  transition: none;

  } 
  `;


const TnxDetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;

 
  `;

const AddTnxDetailWrapper = styled.div`
  display: block;
  `;

const DeleteButton = styled.button`
  display: block;
  background:black;
  color:white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor:pointer;
  font-weight:bold;
  font-size:12px;
  margin: auto;
`;

const MonthlyTransaction = (props) => {

  const { profile } = useProfile();

  const [filteredTransaction, updateTxn] = useState([]);
  const [searchText, updateSearchText] = useState("");



  useEffect(() => {
    updateTxn(props.transactionsMonthly)
  })

  // TransactionCell ****************************

  const TransactionCell = (props) => {
    const [isCellClicked, setIsCellClicked] = useState(false);

    const cellClickHandler = () => {
      setIsCellClicked(!isCellClicked);
    }

    const date = new Date(props.item.dateAndTime);

    const handleMonthlyDelete = (obj) => {
      database
        .ref(`/profiles/${profile.uid}/monthly/${props.expenseId}/Aexpense/${obj}`).remove()
    }


    return (
      <Cell key={props.index} onClick={cellClickHandler} >
        <TnxDetailWrapper>
          <span>{props.item?.desc}</span>
          <span>₹{props.item?.expense}</span>
        </TnxDetailWrapper>

        {isCellClicked && <AddTnxDetailWrapper  >
          <br />
          <hr />
          <br />
          <span> Date : {date ? date.toDateString() : "Date not found"}</span><br /><br />
          <span> Time : {date ? date.toTimeString() : "Time not found"}</span>
          <DeleteButton onClick={() => { handleMonthlyDelete(props.item.id) }} >Delete</DeleteButton>
        </AddTnxDetailWrapper>}
      </Cell>
    );

  };

  const filterData = useCallback((searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(props.transactionsMonthly);
      return;
    }
    let txn = [...props.transactionsMonthly];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim()),
    );
    updateTxn(txn);
  });

  useEffect(() => {
    filterData(searchText);
  }, [searchText, filterData]);



  return (
    <Container>
      <TitleAndPdfWrapper>
        <span>Transactions History</span>
      </TitleAndPdfWrapper>
      <input
        placeholder="Search"
      onChange={(e) => {
        updateSearchText(e.target.value);
        filterData(e.target.value);
      }}
      />

      {filteredTransaction?.map((item, index) => (
        <TransactionCell expenseId={props.expenseId} key={index} item={item} />
      ))}

    </Container>

  )


}

export default MonthlyTransaction