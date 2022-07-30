import  firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCRCt_dqCYNilmwsb4iCVyxnU7pAt7aBPk",
    authDomain: "expense-tracker-abcd7.firebaseapp.com",
    databaseURL: " https://expense-tracker-abcd7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "expense-tracker-abcd7",
    storageBucket: "expense-tracker-abcd7.appspot.com",
    messagingSenderId: "955029013928",
    appId: "1:955029013928:web:964e48e8e83bc976e9499d"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  export const auth = app.auth();
  export const database = app.database("https://expense-tracker-abcd7-default-rtdb.asia-southeast1.firebasedatabase.app/");