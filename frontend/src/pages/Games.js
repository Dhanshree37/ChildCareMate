import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import aImage from './Assets/a.jpg'; // Background image

const drawerWidth = 245; // Sidebar width

const Games = () => {
  return (
    <Box
    
      sx={{
        pt: '100px', // Space for navbar
        pl: { xs: 0, sm: '100px' }, // Space for sidebar on desktop
        pr: 5,
        pb: 5,
        minHeight: '100vh',
        boxSizing: 'border-box',
        ml: `${drawerWidth}px`, // Prevent sidebar overlap
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image Covering Full Page */}
      <Box
        sx={{
          position: 'fixed', // Keeps background fixed while scrolling
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${aImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1, // Ensures content is on top
          
        }}
      />

      <Typography
        variant="h3"
        sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3, textAlign: 'center' }}
      >
        Games
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {[
          { title: 'Matching Game', desc: 'Test your memory by matching pairs of cards!', link: '/matching-game' },
          { title: 'Shape Tracing Game', desc: 'Improve motor skills by tracing different shapes!', link: '/shape-tracing-game' },
          { title: 'Storytime', desc: 'Join us for an interactive storytelling adventure!', link: '/story-time' },
          { title: 'Learn Emotions', desc: "Let's learn the emotions!", link: '/emotion-charades' },
          { title: 'Maths', desc: "Let's add and subtract!", link: '/simple-math-fun' },
        ].map((game, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={6}
              sx={{
                padding: 3,
                textAlign: 'center',
                borderRadius: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight transparency
                transition: '0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {game.title}
              </Typography>
              <Typography sx={{ mb: 2, color: 'gray' }}>{game.desc}</Typography>
              <Button variant="contained" color="primary" component={Link} to={game.link}>
                Play Now
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Games;