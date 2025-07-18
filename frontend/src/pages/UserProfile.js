import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Typography,
  Button,
  Box
} from '@mui/material';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [relationship, setRelationship] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const caretakerData = { name, email, phone, address, relationship };

    const token = localStorage.getItem('jwtToken');

    if (!token) {
      alert('Please log in to update the profile');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/caretaker',
        caretakerData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error('Error saving caretaker profile:', error);
      alert('Failed to save caretaker profile. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 13, p: 3, border: '1px solid #ccc', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" gutterBottom>
        Caretaker Profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Relationship with Child"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Save Profile
        </Button>
      </Box>
    </Container>
  );
};

export default UserProfile;
