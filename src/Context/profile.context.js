import React, { createContext, useContext, useEffect, useState } from "react"; 
import { auth, database } from "../misc/Firebase";
import  firebase from 'firebase/app';
import { toast } from 'react-toastify';

const ProfileContext = createContext();

export const ProfileProvider =({children})=>{
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    
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

    useEffect(()=>{
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
           signInId = user.uid;
          console.log("uid",signInId);
        } else {
          
        }
      })
    },[])
    
    
    
    const SignInWithProvider = async (provider) => {
      try {
        const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
        
        if (additionalUserInfo.isNewUser) {
          toast.success('Sign-In Successful', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          await database.ref(`/profiles/${user.uid}`).set({
            name: user.displayName,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
          });
          
        }
        if(!additionalUserInfo.isNewUser){
          toast.success('Welcome Back...!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        console.log(additionalUserInfo , user );
        
        
      } catch (err) {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });   }
        
        
      };
      
      
      const registerUser = (email, password, name) => {
        setIsLoading(true);
        auth.createUserWithEmailAndPassword(email, password)
        .then(async() =>{
          toast.success('Sign-In Successful', {
            position: "top-center",
            autoClose: 3000,
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
          console.log("reg",auth.currentUser.uid);
          console.log("reg signID",signInId);

          await database.ref(`/profiles/${auth.currentUser.uid}`).set({
            name: auth.currentUser.displayName         
          });
         
        }
        )
        .catch((err) => {
          toast.error(err.message, {
            position: "top-center",
            autoClose: 3000,
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
            autoClose: 3000,
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
            autoClose: 3000,
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
        .then(()=>{
          toast.info('Check your mail to reset your password...!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })}).catch((err)=>{console.log(err);})
      };
      
      
      
      const profileContextValue = {
        profile,
        isLoading,
        error,
        registerUser,
        SignInUser,
        forgotPassword,
        SignInWithProvider
      };
      
      
      return(
        <ProfileContext.Provider value={profileContextValue}>
            {children}
        </ProfileContext.Provider>
    )
  }
  export const useProfile = ()=>useContext(ProfileContext);
  


      // useEffect(() => {
      //   let userRef;
    
      //   const authUnsub = auth.onAuthStateChanged((authObj) => {
      //     if (authObj) {
      //       userRef = database.ref(`/profiles/${authObj.uid}`);
      //       userRef.on("value", (snap) => {
      //         const { name, createdAt } = snap.val();
    
      //         const data = {
      //           name ,
      //           createdAt,
      //           uid: authObj.uid,
      //           email: authObj.email,
      //         };
      //         setProfile(data);
      //         setIsLoading(false);
      //       });
      //     } else {
      //       if (userRef) {
      //         userRef.off();
      //       }
      //       setProfile(null);
      //       setIsLoading(false);
      //     }
      //   });
      //   return () => {
      //     authUnsub();
      //     if (userRef) {
      //       userRef.off();
      //     }
      //   };
      // }, []);