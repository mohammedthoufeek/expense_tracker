import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useProfile } from '../../ContextApi/profile.context'
import styled from "styled-components";
import { PDFExport } from "@progress/kendo-react-pdf";

import './History.css'

const Container = styled.div`
display: flex;
flex-direction: column;
align-items:center;
padding: 10px 22px;
font-size: 18px;
width: 50%;
gap: 10px;
font-weight: bold;
& input{
  padding:10px 12px;
  border-radius: 12px;
  background: #e6e8e9;
  border: 1px solid #e6e8e9;
  outline: none;
  width: 20rem;
}
`;

const PdfButton = styled.button`
background:black;
width:130px;
color:white;
padding: 5px 10px;
border-radius: 4px;
cursor:pointer;
font-weight:bold;
font-size:15px;
margin-left: 4.5rem;
`;
const TitleAndPdfWrapper = styled.div`
display: flex;
align-items: center;
justify-content:space-around;
margin: 60px 0 10px 0;
min-width:25rem;

`;



const Cell = styled.div`  
  background-color: white;
  width: 30rem;
  color: #0d1d2c;
  padding: 10px 15px;
  margin: 10px 0 10px 0;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  cursor: pointer;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")}; 
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
  @media (max-width:520px) {
    width: 23rem;
  
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



const Extra = () => {
  const { transactionApi } = useProfile();
  const [tnxHistry, setTnxHistry] = useState(null)
  const TransactionComponent = (props) => {

    const [searchText, updateSearchText] = useState("");
    const [filteredTransaction, updateTxn] = useState(props.transactions);

    const TransactionCell = (props) => {

      const date = new Date(props.item.timeStamp)

      return (
        <Cell key={props.index} isExpense={props.item?.type === "EXPENSE"}>
          <TnxDetailWrapper>
            <span>{props.item?.desc}</span>
            <span>₹{props.item?.amount}</span>
          </TnxDetailWrapper>

          {<AddTnxDetailWrapper  >
            <br />
            <hr />
            <br />
            <span> Date : {date ? date.toDateString() : "Date not found"}</span><br /><br />
            <span> Time : {date ? date.toTimeString() : "Time not found"}</span>
          </AddTnxDetailWrapper>}
        </Cell>
      );

    };


    const filterData = useCallback((searchText) => {
      if (!searchText || !searchText.trim().length) {
        updateTxn(props.transactions);
        return;
      }
      let txn = [...props.transactions];
      txn = txn.filter((payload) =>
        payload.desc.toLowerCase().includes(searchText.toLowerCase().trim()),
      );
      updateTxn(txn);
    });

    useEffect(() => {
      filterData(searchText);
    }, [props.transactions, searchText, filterData]);



    return (
      <Container>

        <TitleAndPdfWrapper>
          <span>Transactions</span>
          <PdfButton onClick={handleExportWithComponent}>Export PDF</PdfButton>
        </TitleAndPdfWrapper>
        <div className="search-input">
          <input
            placeholder="Search"
            onChange={(e) => {
              updateSearchText(e.target.value);
              filterData(e.target.value);
            }}
          />
        </div>
        {filteredTransaction?.map((item, index) => (
          <TransactionCell key={index} item={item} />
        ))}
      </Container>

    )

  };

  useEffect(() => {
    transactionApi.map((obj) => {
      setTnxHistry(obj.id)
    })
  })

  console.log(tnxHistry);

  const handleExportWithComponent = (event) => {
    pdfExportComponents.current.save();

  }
  const pdfExportComponents = useRef(null);

  console.log(transactionApi);

  return (
    <PDFExport ref={pdfExportComponents} paperSize="A4" >
      <div className="extra-main-div">
        <div className="extra-fullTransaction-div">
          {tnxHistry  ? <TransactionComponent transactions={transactionApi} /> : <div className='no-history' >No Tracking Yet...!</div>}
        </div>
      </div>
    </PDFExport>
  )
}

export default Extra