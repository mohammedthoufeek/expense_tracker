import React , {useState} from "react";
import './Navbar.css';
import {Link} from 'react-router-dom';
import {FaBars ,FaTimes} from 'react-icons/fa';
import et_logo from '../../images/et_logo.png';
import { useProfile } from "../../Context/profile.context";
import LoginAfterProfile from "./LoginAfterProfile";




function Navbar() {
  const[icon,setIcon]=useState(false)
  const {profile} = useProfile();
  const clickHandler =()=>
  {
    setIcon(!icon)
  }
  const closeSideBar=()=>
  {
    setIcon(false)
  }
    return (
      <>
        <nav className="navbar">
          <Link to="/" className="nav-logo">
            <img className="logo-img" src={et_logo} alt="" />
           <div className="logo-name">
           EXPENSE TRACKER
          </div>
          </Link>
          <div className="menu-icon" onClick={clickHandler}>
            {icon ? (
              <FaTimes className="fa-times"></FaTimes>
            ) : (
              <FaBars className="fa-bars"></FaBars>
            )}
          </div>
          <ul className={icon ? "nav-menu active" : "nav-menu"}>
            <li>
              <Link to="/" className="nav-links" onClick={closeSideBar}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-links" onClick={closeSideBar}>
                About
              </Link>
            </li>
            <li>
              <Link to="/product" className="nav-links" onClick={closeSideBar}>
                Product
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-links" onClick={closeSideBar}>
                Contact
              </Link>
            </li>
            <li>
              {
                profile ? 
                <div> <LoginAfterProfile/></div> 
                : <Link to="/login" className="nav-links" onClick={closeSideBar}>
                 Login
               </Link>
              }
             
            </li>
          </ul>
        </nav>
      </>
    );
}
export default Navbar;
