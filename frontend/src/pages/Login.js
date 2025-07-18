import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from './Assets/bg.jpg';


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    axios.post('http://localhost:5000/login', { email, password })
   .then((response) => {
     if (response.data.success) {
       console.log('Login successful:', response.data);
       const token = response.data.token;
       console.log('JWT Token:', token); // Log the JWT to check if it's being returned.
       localStorage.setItem('jwtToken', token); // Save it in local storage (for example)
       localStorage.setItem('user',  JSON.stringify(response.data.data));
       onLogin();
       navigate('/home-page');
     } else {
       setError(response.data.message);
     }
   })
   .catch((error) => {
     setError('Login failed. Please try again.');
     console.error('Login error:', error);
   });

  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };
  const handleForgotRedirect = () => {
    navigate('/forgot-password');
  };

  return (
    <div
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Change this from minHeight: '83vh'
    width: '100vw',  // Replace minWidth
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    overflow: 'hidden'
  }}
>
      <Container style={{ maxWidth: '500px', padding: '24px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
        </Box>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
              {error}
            </Typography>
          )}
          <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '20px' }}>
            Login
          </Button>
        </form>
        <Box textAlign="center" mt={4}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link href="#" onClick={handleRegisterRedirect}>
              Register
            </Link>
          </Typography>
        </Box>
      </Container>
      
    </div>
  );
};

export default Login;
