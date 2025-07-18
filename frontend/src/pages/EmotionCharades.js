import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

// Images
import happyImage from './Assets/happy.jpg';
import sadImage from './Assets/sad.jpg';
import angryImage from './Assets/angry.jpg';
import surprisedImage from './Assets/suprised.jpg';
import scaredImage from './Assets/scared.jpg';

const emotions = [
  { name: '😊 Happy', image: happyImage },
  { name: '😢 Sad', image: sadImage },
  { name: '😠 Angry', image: angryImage },
  { name: '😲 Surprised', image: surprisedImage },
  { name: '😨 Scared', image: scaredImage },
];

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const EmotionCharades = () => {
  const [currentEmotionIndex, setCurrentEmotionIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState(shuffleArray(emotions));
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [width, height] = useWindowSize();

  const handleStart = () => {
    setGameStarted(true);
    setCurrentEmotionIndex(0);
    setSelectedEmotion('');
    setShowAnswer(false);
    setShuffledOptions(shuffleArray(emotions));
  };

  const handleNext = () => {
    const nextIndex = (currentEmotionIndex + 1) % emotions.length;
    setCurrentEmotionIndex(nextIndex);
    setSelectedEmotion('');
    setShowAnswer(false);
    setShuffledOptions(shuffleArray(emotions));
  };

  const handleEmotionSelect = (emotionName) => {
    setSelectedEmotion(emotionName);
    setShowAnswer(true);
  };

  const currentEmotion = emotions[currentEmotionIndex];

  return (
    <Box
      sx={{
        height: '100%',
        background: 'linear-gradient(135deg, #ffe4e1, #e1f5fe)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        px: 2,
        padding: '100px'
      }}
    >
      {selectedEmotion === currentEmotion.name && showAnswer && (
        <Confetti width={width} height={height} />
      )}

      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontFamily: "'Comic Sans MS', cursive", color: '#d81b60' }}
      >
        🎭 Emotion Charades 🎉
      </Typography>

      {!gameStarted ? (
        <Button
          variant="contained"
          onClick={handleStart}
          sx={{
            backgroundColor: '#ffca28',
            color: '#000',
            '&:hover': {
              backgroundColor: '#fbc02d',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease',
            borderRadius: '20px',
            padding: '16px 32px',
            fontSize: '20px',
          }}
        >
          🚀 Start Game
        </Button>
      ) : (
        <Paper
          elevation={10}
          sx={{
            p: 3,
            borderRadius: 6,
            backgroundColor: '#fff3e0',
            maxWidth: 600,
            maxHeight: '85vh',
            overflow: 'auto',
            textAlign: 'center',
          }}
        >
          <motion.img
            key={currentEmotion.name}
            src={currentEmotion.image}
            alt={currentEmotion.name}
            style={{
              width: 220,
              maxHeight: 200,
              objectFit: 'contain',
              borderRadius: '20px',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />

          <Typography
            variant="h5"
            mt={2}
            sx={{ color: '#5d4037', fontFamily: "'Comic Sans MS', cursive" }}
          >
            Can you guess this emotion?
          </Typography>

          <Grid container spacing={2} justifyContent="center" mt={1}>
            {shuffledOptions.map((emotion) => (
              <Grid item key={emotion.name}>
                <Button
                  variant="contained"
                  onClick={() => handleEmotionSelect(emotion.name)}
                  sx={{
                    backgroundColor:
                      selectedEmotion === emotion.name ? '#4caf50' : '#64b5f6',
                    '&:hover': {
                      backgroundColor:
                        selectedEmotion === emotion.name ? '#388e3c' : '#42a5f5',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                    borderRadius: '20px',
                    padding: '10px 22px',
                    fontSize: '16px',
                    fontFamily: "'Comic Sans MS', cursive",
                  }}
                >
                  {emotion.name}
                </Button>
              </Grid>
            ))}
          </Grid>

          {showAnswer && (
            <Typography
              variant="h6"
              mt={2}
              sx={{
                color: selectedEmotion === currentEmotion.name ? '#388e3c' : '#e53935',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              {selectedEmotion === currentEmotion.name
                ? '🎉 Yay! That’s correct!'
                : `❌ Oops! It was ${currentEmotion.name}`}
            </Typography>
          )}

          <Button
            onClick={handleNext}
            sx={{
              mt: 3,
              backgroundColor: '#ffb74d',
              '&:hover': {
                backgroundColor: '#ff9800',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
              borderRadius: '20px',
              padding: '10px 28px',
              color: '#fff',
              fontSize: '16px',
            }}
          >
            👉 Next
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default EmotionCharades;
