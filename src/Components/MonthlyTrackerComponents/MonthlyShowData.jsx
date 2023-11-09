import React, { useEffect, useState } from 'react'
import { useProfile } from '../../ContextApi/profile.context';
import { database } from '../../misc/Firebase';
import styled from "styled-components";

import './Monthly-tracker-css/Monthly.css'
import MonthlyTransaction from './MonthlyTransaction';





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
    color: red;

  }`;




const MonthlyShowData = (props) => {


    const [transactionId, setTransactionId] = useState('');

    const [transactionsMonthly, setTransactionsMonthly] = useState([]);

    const [expenseToShow, setExpenseToShow] = useState(0)


    const { profile } = useProfile();


    //fetch expense data from database**************

    useEffect(() => {

        async function fetchDataOfExpense() {
            database
                .ref(`/profiles/${profile.uid}/monthly/${props.expenseId}/Aexpense/`)
                .on("value", function (snapshot) {
                    var temp = [];

                    snapshot.forEach(function (child) {

                        setTransactionId(child.key)

                        var data = child.val();
                        temp.push({
                            id: child.key,
                            expense: data.expense,
                            desc: data.desc,
                            timeStamp: data.timeStamp,
                            dateAndTime: data.dateAndTime
                        })

                    })
                    setTransactionsMonthly(temp)
                })

        }

        fetchDataOfExpense()

    }, [props.expenseId])

    // const newTransaction = (item) => {
    //     const transationArray = [...transactionsMonthly];
    //     transationArray.push(item);
    //     setTransactionsMonthly(transationArray);

    // };

    useEffect(() => {
        const calculateBalance = () => {
            let tot = 0;
            transactionsMonthly.map((item) => {
                tot = tot + parseInt(item.expense)
                setExpenseToShow(tot);
            }
            );
        };
        calculateBalance()
        return () => {
            setExpenseToShow(0)
        }
    })

    return (

        <div className="showData-main-div">
            <div className="showData-expenseBox-div">
                <Expense>
                    <ExpenseBox isIncome={false}>
                        Balance <span style={{ color: 'green' }} > ₹{expenseToShow ? parseInt(props.income) - parseInt(expenseToShow) : parseInt(props.income)}</span>
                    </ExpenseBox>
                    <ExpenseBox isIncome={true}>
                        Expense <span> ₹{expenseToShow || 0}</span>
                    </ExpenseBox>
                </Expense>
            </div>
            <MonthlyTransaction transactionsMonthly={transactionsMonthly} expenseId={props.expenseId} transactionId={transactionId} />
        </div>
    )
}

export default MonthlyShowData