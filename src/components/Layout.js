// Layout.js

import React from 'react';
import Sidebar from './SideBar';
import Header from './Header';
import { useState } from 'react'

const Layout = ({ children }) => {

const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>{children}</main>
     
    </div>
  );
};

export default Layout;
