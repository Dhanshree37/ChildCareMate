import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  Card,
  CardContent,
  Typography as MuiTypography,
  Box,
} from '@mui/material';
import axios from 'axios';
import logo from '../pages/Assets/logoz.png'; // Add your logo if needed

const Navbar = ({ onLogout, isLoggedIn }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    if (isLoggedIn) {
      setAnchorEl(null);
      getUser();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      onLogout();
      navigate('/home-page');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleUserCardClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = (profileType) => {
    navigate(`/${profileType}-profile`);
    handleClose();
  };

  const getUser = () => {
    const token = localStorage.getItem('jwtToken');
    axios
      .get('http://localhost:5000/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserInfo(response.data);
      });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#004d40', // Dark teal
        zIndex: 1201,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo + Title with clickable functionality */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/home-page')} // Navigate to home page on click
        >
          <img src={logo} alt="Logo" style={{ height: 50, marginRight: 16 }} />
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
            ChildCareMate
          </Typography>
        </Box>

        {/* Right Side */}
        {isLoggedIn ? (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography
                sx={{
                  color: '#fff',
                  fontSize: 16,
                }}
              >
                Hi,{' '}
                <Box
                  component="span"
                  sx={{
                    fontWeight: 'bold',
                    color: '#fff',
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#80cbc4',
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={handleUserCardClick}
                >
                  {userInfo?.name || 'User'}
                </Box>
              </Typography>
            </Box>

            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{ mt: '40px' }}
            >
              <Card
                sx={{
                  width: 300,
                  p: 2,
                  backgroundColor: '#e3f2fd',
                  borderRadius: 2,
                  border: '1px solid #b2dfdb',
                  boxShadow: 3,
                  '&:hover': {
                    backgroundColor: '#b2dfdb',
                    color: '#004d40',
                    transform: 'scale(1.02)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <CardContent>
                  <MuiTypography
                    variant="body2"
                    sx={{ color: '#024338', fontWeight: 600, mb: 1 }}
                  >
                    Name: {userInfo?.name || 'Unknown'}
                  </MuiTypography>
                  <MuiTypography
                    variant="body2"
                    sx={{ color: '#024338', fontWeight: 600 }}
                  >
                    Email: {userInfo?.email || 'No email provided'}
                  </MuiTypography>
                </CardContent>
                <MenuItem onClick={() => handleEditProfile('user')}>
                  Edit User Profile
                </MenuItem>
                <MenuItem onClick={() => handleEditProfile('child')}>
                  Edit Child Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Card>
            </Menu>
          </>
        ) : (
          <Button
            onClick={handleLogin}
            sx={{
              backgroundColor: '#00796b',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#004d40',
              },
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

Navbar.defaultProps = {
  isLoggedIn: false,
  onLogout: () => {},
};

export default Navbar;
