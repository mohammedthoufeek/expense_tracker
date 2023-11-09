import React, { useEffect, useState } from 'react'
import './Navbar.css'

import { Link } from 'react-router-dom'

import { auth } from "../../misc/Firebase";
import { toast } from 'react-toastify';

import logoImg from '../../assests/images/et_logo.png'

//icons..............

import { FaBars, FaTimes } from 'react-icons/fa';
import { BsCalendarMonth, BsFillCalendarDayFill, BsPersonCircle } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { RiHistoryFill } from "react-icons/ri";
import { MdContactMail } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { AiFillCalculator } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

import { useProfile } from '../../ContextApi/profile.context';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Clock from 'react-digital-clock';
import { Calculator } from 'react-mac-calculator'
///drager npm**************
import Draggable from 'react-draggable';

///modal**********
import Modal from 'react-awesome-modal';




const OnSignOutClicked = () => {
  auth.signOut().then(
    toast.success('Sign-Out Successful...!', {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  )
}


const Navbar = () => {
  const [calenderValue, onChange] = useState(new Date());
  const [icon, setIcon] = useState(true)
  const [calcClicked, setCalcClicked] = useState(false)
  const [calanderClicked, setCalanderClicked] = useState(false)
  const [visible, setVisible] = useState(false)

  const { profile } = useProfile();
  const clickHandler = () => {
    setIcon(!icon)
  }



  // dragable Calculator



  return (
    <>
      <div className="menu-icon">
        <FaBars onClick={clickHandler} id='menu-icon' className="fa-bars"></FaBars>
      </div>
      <div className={icon ? "navbar-active" : "navbar-inActive"}>
        <div className="nav-logo">
          <div className="nav-logo-img"><img src={logoImg} alt="not foung" /></div>
        </div>
        <div className="nav-links">
          <ul>
            <div className='navbar-person-div' >
              {profile.displayName}
            </div>
            <hr />
            <li> <div className='nav-links-item clock '> <Clock /> </div>  </li> <hr />
            <li> <Link className='nav-links-item' to='/'><FaHome style={{ fontSize: "20px", marginBottom: '-10px', fontWeight: "bold" }} /> <br /> Home </Link> </li> <hr />
            <li> <Link className='nav-links-item' to='/history'><RiHistoryFill style={{ fontSize: "20px", marginBottom: '-10px' }} /> <br /> History </Link> </li> <hr />
            <li> <Link className='nav-links-item' to='/contact'><MdContactMail style={{ fontSize: "20px", marginBottom: '-10px' }} /> <br /> Contact </Link> </li> <hr />
            <li> <Link className='nav-links-item' to='/monthly' ><BsCalendarMonth style={{ fontSize: "20px", marginBottom: '-10px' }} /> <br /> Monthly Mode </Link></li> <hr />

            {/* calender */}

            {/* <li id='add-feature-in-mobile' >
              <div className='nav-links-item ' >


                <div className="calender-dropdown" >
                  <div className='add-features-name-wrapper-mobile' onClick={() => { setCalanderClicked(!calanderClicked) }} >
                    <BsFillCalendarDayFill style={{ fontSize: '18px' }} id='top-bar-calender-logo' /> <br />
                     Calender
                  </div>
                  {calanderClicked && 
                  <Draggable>
                    <div className='calender-dropdown-item-mobile'>
                    <div className="extra-div-to-cancel-icon">
                    <MdCancel onClick={() => setCalanderClicked(!calanderClicked)} style={{ fontSize: '25px', margin: '0 4px 1px 0 ', cursor: 'pointer' }} />
                  </div>
                      <Calendar onChange={(onChange)} calenderValue={calenderValue} />
                    </div>
                  </Draggable>}
                </div>

              </div>
            <hr />
            </li>  */}

            {/* calculator */}

            {/* <li id='add-feature-in-mobile' >
              <div className='nav-links-item ' >


                <div className="Calculator-dropdown" >
                  <div className='add-features-name-wrapper-mobile' onClick={() => { setCalcClicked(!calcClicked) }} >
                    <AiFillCalculator style={{ fontSize: '22px' }} id='top-bar-Calculator-logo' /> <br />
                    Calculator
                  </div>
                  {calcClicked && <Draggable>
                    <div className='Calculator-dropdown-item-mobile'>
                    <div className="extra-div-to-cancel-icon">
                    <MdCancel onClick={() => setCalcClicked(!calcClicked)} style={{ fontSize: '25px', margin: '0 4px 1px 0 ', cursor: 'pointer' }} />
                  </div>
                      <Calculator />
                    </div>
                  </Draggable>}
                </div>

              </div>
             <hr />
            </li> */}





            <li> <div className='nav-links-item' onClick={() => { setVisible(!visible) }} ><GoSignOut style={{ fontSize: "20px", marginBottom: '-10px' }} /> <br /> Sign-Out </div> </li> <hr />
          </ul>
        </div>

        {visible && <Modal visible={visible} height='300px' width='500px' effect="fadeInUp" onClickAway={() => setVisible(false)}>
          <div className='popup-main-div-sign-out' >
            Sure, You want to exit...!
            <div className="sign-out-button-wrapper">
              <button onClick={OnSignOutClicked} >Exit</button>
              <button onClick={() => { setVisible(false) }}  >No</button>
            </div>
          </div>
        </Modal>}

      </div>


      {/* Top bar................ */}

      <div className="top-bar">
        <div className="top-bar-title">Expense Tracker</div>
        <div className="topbar-right-items">
          <div className="add-features">

            <div className="calender-dropdown" >
              <div className='add-features-name-wrapper' onClick={() => { setCalanderClicked(!calanderClicked) }} >
                <span className='top-bar-calender-title' > Calender</span>
                <BsFillCalendarDayFill style={{ fontSize: '18px' }} id='top-bar-calender-logo' />
              </div>
              {calanderClicked && <Draggable>
                <div className='calender-dropdown-item'>
                  <div className="extra-div-to-cancel-icon">
                    <MdCancel onClick={() => setCalanderClicked(!calanderClicked)} style={{ fontSize: '25px', margin: '0 4px 1px 0 ', cursor: 'pointer' }} />
                  </div>
                  <Calendar onChange={(onChange)} calenderValue={calenderValue} />
                </div>
              </Draggable>}
            </div>

            {/* caculator */}

            <div className="Calculator-dropdown" >
              <div className='add-features-name-wrapper' onClick={() => { setCalcClicked(!calcClicked) }} >
                <span className='top-bar-Calculator-title' > Calculator</span>
                <AiFillCalculator style={{ fontSize: '22px' }} id='top-bar-Calculator-logo' />
              </div>
              {calcClicked && <Draggable>
                <div className='Calculator-dropdown-item'>
                  <div className="extra-div-to-cancel-icon">
                    <MdCancel onClick={() => setCalcClicked(!calcClicked)} style={{ fontSize: '25px', margin: '0 4px 1px 0 ', cursor: 'pointer' }} />
                  </div>
                  <Calculator />
                </div>
              </Draggable>}
            </div>

          </div>
          <div className='topbar-person-div' >
            {profile.displayName} <BsPersonCircle id='topbar-person-icon' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
