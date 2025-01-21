import React, { useState, useEffect } from 'react';
import 
 {BsPersonCircle, BsJustify}
 from 'react-icons/bs'

import UserAccountOverlay from './UserAccountOverlay'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faArrowUp, faArrowDown ,faUser} from '@fortawesome/free-solid-svg-icons';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { signOut } from "firebase/auth";

import { useNavigate, Navigate } from "react-router-dom";
import { Auth } from 'firebase/auth';
import { auth } from '../config/firebase-config';

function Header({OpenSidebar}) {

  const [showUserOverlay, setShowUserOverlay] = useState(false);
  const [accountName, setAccountName] = useState(''); // Set the actual account name later

  const { name,isAuth } = useGetUserInfo();
  const navigate = useNavigate();
  

  const handleUserIconClick = (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    setShowUserOverlay(!showUserOverlay);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

 

  const closeUserOverlay = () => {
    setShowUserOverlay(false);
  };

  useEffect(() => {
    setAccountName(name);
    // Add event listener to close overlay when clicking outside of it
    const handleClickOutside = () => {
      closeUserOverlay();
    };

    // Attach the event listener to the document only when the overlay is visible
    if (showUserOverlay) {
      document.addEventListener('click', handleClickOutside);
    }

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showUserOverlay]);

  if (!isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>

        </div>
        <div className='header-right'>
          <div className='icon user-icon' onClick={handleUserIconClick}>

          <BsPersonCircle className='icon user-icon' size={40} color='#1C2536' />
    

          </div>
            

            {showUserOverlay && (
        <UserAccountOverlay accountName={accountName} onSignOut={handleSignOut} />
      )}
        </div>
    </header>
  )
}

export default Header