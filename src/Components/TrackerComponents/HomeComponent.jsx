
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useProfile } from '../../ContextApi/profile.context';
import { database } from '../../misc/Firebase';
import OverviewComponent from './OverviewComponent';
import TransactionComponent from './TransactionComponent';

import { MdCancel } from "react-icons/md";



const Container = styled.div`
display: flex;
flex-direction: column;
margin: 30px 0 10px;
font-family: Montserrat;
align-items : center;
width:360px;
color: white;
`;
const NewbieInfo = styled.div`
  background-color: #d9d9d9;
  width:1000px;
  margin: 30px 0 0 0;
  border-radius:20px;
  padding:10px 20px 20px 20px;
  text-align:justify;
  color:black;
  @media (max-width:1000px) {
    display:none;
  
  } 
`;
const HomeComponent = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);
  const [showInfo, updateShowInfo] = useState(true);


  const { profile, Transaction , newbieInfo } = useProfile();

  useEffect(() => {


    async function fetchData() {

      database
        .ref(`/profiles/${profile.uid}/values`)
        .on("value", function (snapshot) {

          var temp = []
          snapshot.forEach(function (childSnapshot) {
            var transactionId = childSnapshot.key
            var data = childSnapshot.val();
            temp.push({
              id: transactionId,
              amount: data.amount,
              desc: data.desc,
              type: data.type,
              timeStamp: data.timeStamp,
              dateAndTime: data.dateAndTime
            })
          });
          setTransactions(temp);
        });
    }
    fetchData();

  }, [profile.uid])


  const newTransaction = (item) => {
    const transationArray = [...transactions];
    transationArray.push(item);
    setTransactions(transationArray);

  };


  if (transactions) {
    Transaction(transactions)
  }

  useEffect(() => {

    const calculateBalance = () => {
      var exp = 0;
      let inc = 0;
      transactions.map((item) => { item.type === "EXPENSE" ? (exp = parseInt(exp) + parseInt(item.amount)) : (inc = parseInt(inc) + parseInt(item.amount)) }
      );
      updateExpense(parseInt(exp));
      updateIncome(parseInt(inc));
    };
    calculateBalance()
  }, [transactions])

  return (
    <Container>
      <OverviewComponent newTransaction={newTransaction} expense={expense} income={income} />
      

      {transactions?.length ? (
        <TransactionComponent transactions={transactions} />
      ) : " "}



      {newbieInfo && showInfo  &&
          
        <NewbieInfo>
          <MdCancel onClick={() => { updateShowInfo(false) }} style={{ fontSize: '25px', margin: '0 4px 1px 930px ', cursor: 'pointer' }} />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti sequi provident tempore dolorem vel, qui commodi? Explicabo tenetur ullam minus quidem omnis saepe, asperiores dolorem optio voluptates ipsa corrupti quis hic quibusdam. Mollitia corporis impedit, iste maiores amet cumque repellat dolor fugit repellendus alias consequatur vitae, architecto incidunt neque tempora minima laboriosam omnis ipsa laborum? Voluptates facere provident voluptas accusantium minima veniam odio eum reiciendis porro? Quas perspiciatis praesentium, est quia officiis rem porro, excepturi amet architecto provident laboriosam placeat deleniti sed a nobis id aliquam vitae distinctio. At fugiat nulla atque quaerat voluptas sunt voluptatem hic excepturi aspernatur alias, modi cupiditate ipsum officiis est rerum repellat! Soluta earum neque a voluptatem vel dicta sequi aperiam dolores voluptas perspiciatis placeat reiciendis minus omnis temporibus repellendus, voluptate facilis, blanditiis perferendis? Saepe mollitia tempora corrupti, voluptatum tempore officiis ipsum dolores animi ut voluptates aspernatur repellat, deleniti nulla accusantium consequatur natus corporis aperiam. Quo sapiente inventore quis! Distinctio ex voluptatum, temporibus quas dignissimos autem tenetur, incidunt illo deleniti, quaerat veritatis. Saepe, adipisci quos quod est quo, hic reprehenderit unde voluptatum quia iure praesentium earum totam odit. Placeat numquam distinctio, magni, quia asperiores eum saepe ab amet totam id accusantium nam alias fugiat recusandae?
        </NewbieInfo>

      }


    </Container>
  )
}

export default HomeComponent 