import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../misc/Firebase";
import firebase from 'firebase/app';
import { toast } from 'react-toastify';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRgisteration, setIsRgisteration] = useState(false)
  const [transactionApi, setTransactionApi] = useState([])
  const [expenseIdApi, setExpenseIdApi] = useState('')
  const [deleteHandle, setDeleteHandle] = useState(false)
  const [infoDownApi, setInfoDownApi] = useState(false)

  //newbie info
  const [newbieInfo, setNewbieInfo] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = auth.onAuthStateChanged((res) => {
      if (res) {
        setProfile(res);

      } else {
        setProfile(null);
      }
      setError("");
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  var signInId;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        signInId = user.uid;
      } else {

      }
    })
  }, [])

  
  const SignInWithProvider = async (provider) => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      console.log('user.uid',user.uid);

      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          
        });
        toast.success('Sign-In Successful', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNewbieInfo(true)
      }
      if (!additionalUserInfo.isNewUser && isRgisteration) {
        toast.warn('Existing Account', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (!additionalUserInfo.isNewUser && !isRgisteration) {
        toast.success('Welcome Back...!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }


  };


  const registerUser = (email, password, name) => {
    setIsLoading(true);
    auth.createUserWithEmailAndPassword(email, password)
      .then(async () => {
        toast.success('Sign-In Successful', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        await auth.currentUser.updateProfile({
          displayName: name,
          createdAt: firebase.database.ServerValue.TIMESTAMP,

        });

        await database.ref(`/profiles/${auth.currentUser.uid}`).set({
          name: auth.currentUser.displayName
        });

      }
      )
      .catch((err) => {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const SignInUser = (email, password) => {
    setIsLoading(true);
    auth.signInWithEmailAndPassword(email, password)
      .then(
        toast.success('Welcome Back...!', {
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

        //    database.ref(`/profiles/${signInId}`).set({                      
        //    createdAt: firebase.database.ServerValue.TIMESTAMP,
        //  })                

      )
      .catch((err) => {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
  };

  const forgotPassword = async (email) => {
    return await auth.sendPasswordResetEmail(email)
      .then(() => {
        toast.info('Check your mail to reset your password...!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }).catch((err) => { 
        toast.error(err.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
       })
  };

  const Transaction = (transactions) => {
    setTransactionApi(transactions)
  }

  const ExpenseIdApi = (ExpenseId) => {
    setExpenseIdApi(ExpenseId)
  }

  const DeleteHandle = (obj)=>{
    setDeleteHandle(obj)
  }

  const InfoDownApi = (obj)=>{
    setInfoDownApi(obj)
  }

  const profileContextValue = {
    profile,
    isLoading,
    error,
    transactionApi,
    expenseIdApi,
    deleteHandle,
    infoDownApi,
    newbieInfo,
    registerUser,
    SignInUser,
    forgotPassword,
    SignInWithProvider,
    setIsRgisteration,
    Transaction,
    ExpenseIdApi,
    DeleteHandle,
    InfoDownApi
  };


  return (
    <ProfileContext.Provider value={profileContextValue}>
      {children}
    </ProfileContext.Provider>
  )
}
export const useProfile = () => useContext(ProfileContext);
