import React, { useState, useEffect } from 'react';

const BreakTimer = () => {
  const [time, setTime] = useState(3600); // 10 minutes
  const [isActive, setIsActive] = useState(true); // Start the timer immediately
  const [notificationVisible, setNotificationVisible] = useState(false); // Control notification visibility
  const [isBlocked, setIsBlocked] = useState(false); // Block navigation until user clicks OK

  useEffect(() => {
    let interval;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000); // Decrease time every second
    }
    if (time === 0) {
      setNotificationVisible(true); // Show the notification when time is up
      setIsBlocked(true); // Block navigation
      setTime(600); // Reset the timer back to 10 minutes
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleNotificationClose = () => {
    setNotificationVisible(false); // Hide the notification when the user clicks "OK"
    setIsBlocked(false); // Unblock navigation
  };

  return (
    <div>
      <h1>Break Timer</h1>
      {/* Display remaining time in minutes and seconds */}
      <div>{Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}</div>

      {/* Notification */}
      {notificationVisible && (
        <div style={notificationStyle}>
          <div>{'Time for a break!'}</div>
          <button onClick={handleNotificationClose} style={buttonStyle}>OK</button>
        </div>
      )}

      {/* Block interactions with the page when notification is visible */}
      {isBlocked && <div style={overlayStyle}></div>}
    </div>
  );
};

// Notification Styles
const notificationStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#00796b',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  zIndex: '1000',
  display: 'flex',
  flexDirection: 'column', // Align items in a column
  justifyContent: 'center',
  alignItems: 'center',
};

const buttonStyle = {
  backgroundColor: '#004d40',
  color: '#fff',
  border: 'none',
  padding: '5px 10px',
  fontSize: '14px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px', // Added space between message and button
};

// Overlay to block interactions
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
  zIndex: '999', // Behind the notification but on top of the rest of the page
};

export default BreakTimer;
