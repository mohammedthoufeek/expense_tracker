import React, { useEffect, useState } from 'react'
import Modal from 'react-awesome-modal';
import './Monthly-tracker-css/Monthly.css'
import { toast } from 'react-toastify';

//components****************
import MonthlyOverview from './MonthlyOverview'

// useProfile **************
import { useProfile } from '../../ContextApi/profile.context';


//database****************
import { auth, database } from '../../misc/Firebase';
import firebase from 'firebase/app';



const MonthlyHome = () => {
    const [monthlyIncome, setMonthlyIncome] = useState('')
    const [monthlyIncomeOut, setMonthlyIncomeOut] = useState(null)
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [transactions, setTransactions] = useState([]);
    const [incomeId, setIncomeId] = useState(' ')
    const [deleteHandleHome, setDeleteHandleHome] = useState(true)
    const [infoDown, setInfoDown] = useState(false)

    const { profile, Transaction, ExpenseIdApi ,  deleteHandle , infoDownApi , InfoDownApi } = useProfile();

    var transactionId;



    // fetching data from database****************** step - 2

    useEffect(() => {

        async function fetchDataOfIncome() {

            database
                .ref(`/profiles/${profile.uid}/monthly`)
                .on("value", function (snapshot) {

                    var temp = []
                    snapshot.forEach(function (childSnapshot) {
                        transactionId = childSnapshot.key

                        if (transactionId) {
                            ExpenseIdApi(transactionId)
                        }
                        var data = childSnapshot.val();
                        temp.push({
                            id: transactionId,
                            initialIncomeOut: data.initialIncome,
                            timeStamp: data.timeStamp,
                            dateAndTime: data.dateAndTime
                        })
                    });
                    setTransactions(temp);

                });
        }
        fetchDataOfIncome();

    }, [profile.uid])



    useEffect(() => {

        transactions.map((obj) => {
            setMonthlyIncomeOut( obj.initialIncomeOut)
            console.log('monthlyIncomeOut', obj.initialIncomeOut);
            console.log('monthly', monthlyIncomeOut);
            setLoading(false)
        })
    })



    // sending transaction to contextApi********

    if (transactions) {
        Transaction(transactions)
    }



    //  Adding income to database.............. step - 1
    const MonthlyIncomeSet = (e) => {
        setMonthlyIncome(e.target.value);
    }

    useEffect(() => {
        database
            .ref(`/profiles/${profile.uid}/monthly`)
            .on('value', function (snapshot) {
                snapshot.forEach(function (child) {
                    setIncomeId(child.key)
                })
            })
    })
    const AddInComeToDB = async () => {


        try {
            await database
                .ref(`/profiles/${profile.uid}/monthly`)
                .push({
                    initialIncome: monthlyIncome,
                    timeStamp: firebase.database.ServerValue.TIMESTAMP,
                    dateAndTime: Date.now()
                })
                .then(
                    toast.success('Income Added...!', {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                )
                .then(
                    setVisible(false),
                    setDeleteHandleHome(false),
                    setInfoDown(true),
                    InfoDownApi(true),
                    setMonthlyIncome('')
                )
                .catch(alert);
        } catch (error) {
            alert(error)
        }

    }
    return (
        <div className="monthlyhome-tracker-div">
            {console.log('deleteHandleHome',deleteHandleHome)}
            {console.log('deleteHandle',deleteHandle)}
            {console.log('infoDown',infoDown)}
            {console.log('monthlyIncomeOut home',monthlyIncomeOut)}
            {console.log('infoDownApi home',infoDownApi)}
            <div className={!monthlyIncomeOut &&( !infoDown && deleteHandleHome || !infoDownApi) ? "monthly-tracker-main-info" : "deactivate"}>
                No Previous Tracking...!
                <button onClick={() => setVisible(true)} >Get Started</button>
            </div>

            <Modal visible={visible} width="500" height="300" effect="fadeInUp" onClickAway={() => setVisible(false)}>
                <div className='popup-main-div' >
                    <input required placeholder='Amount' value={monthlyIncome} type="number" onChange={MonthlyIncomeSet} />
                    <button onClick={AddInComeToDB} >Set</button>
                </div>
            </Modal>

            <div className={monthlyIncomeOut  ? "monthly-tracker-content-div" : "deactivate"}>
                <div className='home-container'>
                    <MonthlyOverview incomeId={incomeId} income={monthlyIncomeOut} />

                </div>
            </div>
        </div>
    )
}

export default MonthlyHome