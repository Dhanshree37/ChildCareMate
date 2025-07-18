import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box
} from '@mui/material';

const ChildProfile = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emergencyContact.length !== 10) {
      alert('Emergency contact must be exactly 10 digits.');
      return;
    }

    const childData = { name, age, height, weight, medicalConditions, emergencyContact, additionalNotes };
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      alert('Please log in to update the profile');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/children',
        childData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      console.error('Error saving child profile:', error);
      alert('Failed to save child profile. Please try again.');
    }
  };

  const handleEmergencyContactChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setEmergencyContact(value);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 13,
        mb: 3,
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        overflowX: 'hidden'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Child Profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          required
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Height (cm)"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Weight (kg)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          select
          label="Medical Conditions"
          value={medicalConditions}
          onChange={(e) => setMedicalConditions(e.target.value)}
          margin="normal"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="ADHD">ADHD</MenuItem>
          <MenuItem value="Autism">Autism</MenuItem>
          <MenuItem value="Down Syndrome">Down Syndrome</MenuItem>
        </TextField>
        <TextField
          fullWidth
          required
          label="Emergency Contact (Phone Number)"
          type="tel"
          value={emergencyContact}
          onChange={handleEmergencyContactChange}
          inputProps={{ maxLength: 10 }}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Additional Notes"
          multiline
          rows={3}
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          margin="normal"
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

export default ChildProfile;
