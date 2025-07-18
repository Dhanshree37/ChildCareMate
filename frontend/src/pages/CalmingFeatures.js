import React from 'react';
import calmingChart from './Assets/calmingchart.png';

import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import breatheImage from './Assets/breathe.jpg';
import musicImage from './Assets/music.jpg';

const calmingFeaturesData = [
  {
    title: '🧘‍♀️ Breathing Exercises',
    description: 'Calm your mind through guided breathing exercises.',
    link: '/breathing-exercises',
    image: breatheImage,
  },
  {
    title: '🎵 Soothing Sounds',
    description: 'Listen to calming soundscapes like ocean waves and gentle music.',
    link: '/soothing-sounds',
    image: musicImage,
  },
];

const tips = [
  "🌈 Take 3 deep breaths, hold for 4 seconds, and slowly exhale.",
  "🧘‍♂️ Sit in silence for 2 minutes focusing only on your breath.",
  "🌿 Take a mindful walk and notice nature around you.",
  "☕️ Take a break with a warm cup of tea and just relax.",
  "📵 Put your phone away and enjoy 10 minutes of quiet time."
];

const CalmingFeatures = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const today = new Date().getDate();
  const dailyTip = tips[today % tips.length];

  return (
    <Box
  sx={{
    background: 'linear-gradient(to right, #fff8e1, #ffe0b2)',
    minHeight: '100%',
    pl: { md: '235px' }, // sidebar
    pr: 0,
    pb: 0,
    m: 0, // remove any margin
    boxSizing: 'border-box',
    mb:3
  }}
>
      <Box sx={{ maxWidth: '95%', mx: 'auto', textAlign: 'center' }}>

      <Box
  sx={{
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    mb: 5,
  }}
>
<Box
  component="img"
  src={calmingChart}
  alt="Calming Chart"
  sx={{
    width: '100%',
    maxWidth: '900px',
    borderRadius: 3,
    boxShadow: 3,
    mt:15
  }}
/>

</Box>

        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          sx={{
            fontWeight: 'bold',
            color: '#d2691e',
            mb: 5 ,
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Calming Features
        </Typography>

        {/* Daily Tip */}
        <Typography
          variant="subtitle1"
          sx={{
            fontStyle: 'italic',
            color: '#5d4037',
            mb: 4,
            backgroundColor: '#fff3e0',
            borderRadius: '12px',
            padding: '10px 20px',
            display: 'inline-block'
          }}
        >
          🌈 Daily Tip: {dailyTip}
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {calmingFeaturesData.map((feature, index) => (
            <Grid item xs={12} sm={6} md={5} key={index}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 3,
                  backgroundColor: '#fffaf0',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="350"
                  image={feature.image}
                  alt={feature.title}
                  sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="warning"
                    component={Link}
                    to={feature.link}
                    sx={{
                      textTransform: 'none',
                      borderRadius: '20px',
                      px: 3,
                      py: 1,
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CalmingFeatures;