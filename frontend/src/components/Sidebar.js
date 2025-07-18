import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Paper, Tooltip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChatIcon from '@mui/icons-material/Chat';
import SpaIcon from '@mui/icons-material/Spa';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import TimelineIcon from '@mui/icons-material/Timeline';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = localStorage.getItem('user_id');
  const [collapsed, setCollapsed] = useState(true);

  const handleMouseEnter = () => setCollapsed(false);
  const handleMouseLeave = () => setCollapsed(true);

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/home-page' },
    { text: 'Games', icon: <SportsEsportsIcon />, path: '/games' },
    { text: 'Communication', icon: <ChatIcon />, path: '/communication-tools' },
    { text: 'Calming', icon: <SpaIcon />, path: '/calming-features' },
    { text: 'Milestones', icon: <TimelineIcon />, path: `/milestone-tracker/${user_id}` },
    { text: 'Therapists', icon: <EmojiPeopleIcon />, path: '/therapist-map' }
  ];

  return (
    <Paper
      style={{
        width: collapsed ? 80 : 260,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: '60px', // Adjusted to start below the navbar
        paddingTop: '10px',
        background: '#111827',
        color: 'white',
        transition: 'width 0.3s ease-in-out',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: collapsed ? 'center' : 'flex-start',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <List style={{ width: '100%' }}>
        {menuItems.map(({ text, icon, path }) => (
          <Tooltip key={text} title={collapsed ? text : ''} placement="right">
            <ListItem
              button
              onClick={() => navigate(path)}
              style={{
                backgroundColor: location.pathname === path ? '#1E40AF' : 'transparent',
                borderRadius: '8px',
                margin: '8px 12px',
                padding: collapsed ? '10px' : '10px 16px',
                transition: 'all 0.3s ease-in-out',
                color: 'white'
              }}
            >
              <ListItemIcon style={{ color: 'white' }}>{icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={text} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Paper>
  );
};

export default Sidebar;