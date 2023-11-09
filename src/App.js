import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


// pages.......
import Navbar from "./Components/Navbar/Navbar";
import Home from './Pages/Home/Home'
import History from './Pages/History/History'
import Contact from './Pages/Contact/Contact'
import Form from './Pages/Form/Form'
import MonthlyMode from './Pages/MonthlyMode/MonthlyMode'

//Components..........
import PrivateRoute from "./Components/Route/PrivateRoute";
import PublicRoute from "./Components/Route/PublicRoute";
import { ProfileProvider } from "./ContextApi/profile.context";

const App=()=> {
  return (
    < >
      <Router>
        <ProfileProvider>
          <Routes>
            <Route exact element={<PrivateRoute />} >
              <Route path='/' element={<><Navbar /><Home /></>} />
            <Route path='*' element={<><Navbar /><Home /></>} />
            <Route path='/monthly' element={<><Navbar /><MonthlyMode /></>} />
            <Route path='/history' element={<><Navbar /><History /></>} />
            <Route path='/contact' element={<><Navbar /><Contact /></>} />
            </Route>
            <Route exact element={<PublicRoute />} >
              <Route path="/login" exact element={<Form />} />
            </Route>
          </Routes>
        </ProfileProvider>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
