  import React, { useState, useEffect } from 'react';
  import { Typography, Button, Box } from '@mui/material';
  import { keyframes } from '@emotion/react';

  const inhaleAnimation = keyframes`
    0% { transform: scale(1); }
    100% { transform: scale(1.2); }
  `;


  const holdAnimation = keyframes`
    from { transform: scale(1.2); }
    to { transform: scale(1.2); }
  `;

  const exhaleAnimation = keyframes`
    0% { transform: scale(1.2); }
    100% { transform: scale(1); }
  `;

  const durations = {
    inhale: 4,
    hold: 4,
    exhale: 6,
  };

  const nextState = {
    inhale: 'hold',
    hold: 'exhale',
    exhale: 'inhale',
  };

  const BreathingExercises = () => {
    const [breathingState, setBreathingState] = useState('inhale');
    const [timer, setTimer] = useState(durations.inhale);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      if (!isActive) return;

      setTimer(durations[breathingState]);

      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            const next = nextState[breathingState];
            setBreathingState(next);
            return durations[next];
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }, [isActive, breathingState]);

    const handleStartStop = () => {
      if (!isActive) {
        setBreathingState('inhale');
        setTimer(durations.inhale);
      }
      setIsActive(!isActive);
    };

    const getAnimation = () => {
      if (!isActive) return 'none';
      const duration = `${durations[breathingState]}s`;
      const animation =
        breathingState === 'inhale'
          ? inhaleAnimation
          : breathingState === 'hold'
          ? holdAnimation
          : exhaleAnimation;
      return `${animation} ${duration} ease-in-out infinite`;
    };

    const instructions = {
      inhale: '🫁 Breathe in deeply through your nose, expanding your diaphragm.',
      hold: '⏳ Hold your breath and keep calm.',
      exhale: '🌬️ Slowly breathe out through your mouth, emptying your lungs.',
    };

    return (
      <Box
        sx={{
          background: 'linear-gradient(to bottom, #fff8e1, #ffe0b2)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          textAlign: 'center',
          
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#d2691e', mb: 1 }}>
          Breathing Exercises 🧘‍♀️
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
          Follow the rhythm to relax: inhale, hold, and exhale.
        </Typography>

        <Box
          sx={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            backgroundColor: '#ffcc80',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            animation: getAnimation(),
      transition: 'transform 0.3s ease-in-out',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {breathingState.charAt(0).toUpperCase() + breathingState.slice(1)}
          </Typography>
          <Typography variant="h4">{timer}</Typography>
        </Box>

        <Typography variant="body2" sx={{ mb: 2 }}>
          {instructions[breathingState]}
        </Typography>

        <Button
          variant="contained"
          color={isActive ? 'secondary' : 'primary'}
          onClick={handleStartStop}
          sx={{ borderRadius: 3, px: 4 }}
        >
          {isActive ? 'Stop' : 'Start'} Breathing
        </Button>
      </Box>
    );
  };

  export default BreathingExercises;
