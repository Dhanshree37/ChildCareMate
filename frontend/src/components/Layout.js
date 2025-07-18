import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';


const Layout = ({ children, isLoggedIn, onLogout, user }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} user={user} /> {/* Pass props here */}
      
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '0px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;