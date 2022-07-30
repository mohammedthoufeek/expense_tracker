import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Product from "./Pages/Product";
import Contact from "./Pages/Contact";
import Form from "./Pages/Form";
import Terms from "./Pages/AdditionalPages/Terms";
import PrivateRoute from "./Components/Route/PrivateRoute";
import PublicRoute from "./Components/Route/PublicRoute";
import { ProfileProvider } from "./Context/profile.context";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Router>
        <ProfileProvider >
        <Navbar />

        <Routes>
          <Route exact element={<PrivateRoute/>} >
            <Route path="/" exact element={<Home />}  />
          </Route>
          <Route path="/about" exact element={<About />} />
          <Route path="/product" exact element={<Product />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route exact element={<PublicRoute/>} >          
            <Route path="/login" exact element={<Form  />} />
          </Route>
          <Route path="/terms-and-conditions" exact element={<Terms />} />
        </Routes>
        </ProfileProvider>
      </Router>
      <ToastContainer
  position="top-center"
  autoClose={3000}
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
