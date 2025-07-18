import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';
import leoImage from './Assets/leo.jpg';
import prideImage from './Assets/pride.jpg';
import waterfallImage from './Assets/waterfall.jpg';
import turtleImage from './Assets/turtle.jpg';
import birdImage from './Assets/bird.jpg';
import bennyFreedImage from './Assets/bennyFreed.jpg';
import wishGrantedImage from './Assets/wishGranted.jpg';
import leoHeroImage from './Assets/leoHero.jpg';

const stories = [
  {
    title: "The Adventure of Leo the Brave Little Lion",
    pages: [
      { text: "Once upon a time, in a lush, green jungle, there lived a brave little lion named Leo.", image: leoImage },
      { text: "Leo was the smallest lion in his pride, but he had a big heart.", image: prideImage },
      { text: "One sunny morning, Leo woke up with a dream to find the legendary Rainbow Waterfall.", image: waterfallImage },
      { text: "Along the way, he met his friend Tilly the Turtle, who decided to join him.", image: turtleImage },
      { text: "They sang songs and played games, until they heard a loud cry. It was Benny the Bird, stuck in a thorny bush!", image: birdImage },
      { text: "Leo bravely freed Benny from the thorns, and Benny decided to help them find the waterfall.", image: bennyFreedImage },
      { text: "Finally, they reached the Rainbow Waterfall, sparkling in the sunlight!", image: waterfallImage },
      { text: "Leo wished to always be brave, and the waterfall granted his wish.", image: wishGrantedImage },
      { text: "From that day on, Leo showed everyone that you don’t need to be big to be brave.", image: leoHeroImage },
    ]
  }
];

const Storytime = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentStory = stories[0]; 
  const currentPage = currentStory.pages[currentPageIndex];

  const nextPage = () => {
    if (currentPageIndex < currentStory.pages.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  return (
    <Box 
      sx={{
        minHeight: "110vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        padding: 2,
        paddingLeft:18
      }}
    >
      <Paper 
        elevation={5} 
        sx={{ width: "80%", height: "85vh", padding: 3, borderRadius: 5, backgroundColor: "#fff5e1" }}
      >
        <Typography 
          variant="h4" 
          textAlign="center" 
          fontWeight="bold" 
          color="brown" 
          sx={{ mb: 2 }}
        >
          {currentStory.title}
        </Typography>

        <Grid container spacing={2} sx={{ height: "75vh" }}>
          {/* Image Section */}
          <Grid item xs={6} display="flex" alignItems="center" justifyContent="center">
            <Box 
              component="img"
              src={currentPage.image}
              alt="Story Illustration"
              sx={{
                width: "90%",
                height: "90%",
                objectFit: "contain",
                borderRadius: 3,
                boxShadow: "5px 5px 15px rgba(0,0,0,0.3)"
              }}
            />
          </Grid>

          {/* Text and Controls Section */}
          <Grid 
            item xs={6} 
            display="flex" 
            flexDirection="column" 
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography 
              variant="h5" 
              textAlign="center" 
              fontWeight="500" 
              sx={{
                backgroundColor: "#ffcc80",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "3px 3px 10px rgba(0,0,0,0.2)",
                marginTop: "20px"
              }}
            >
              {currentPage.text}
            </Typography>

            {/* Buttons */}
            <Box mt={-2} display="flex" flexDirection="column" alignItems="center" gap={1}>
              <Box display="flex" justifyContent="center" gap={3} sx={{ mt: -3 }}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={previousPage} 
                  disabled={currentPageIndex === 0}
                  sx={{ fontSize: "1rem", padding: "10px 20px" }}
                >
                  ⬅️ Back
                </Button>

                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={nextPage}
                  sx={{ fontSize: "1rem", padding: "10px 20px" }}
                >
                  Next ➡️
                </Button>
              </Box>
              <Button 
                variant="outlined" 
                color="success" 
                onClick={() => speakText(currentPage.text)}
                sx={{ marginTop: "50px", fontSize: "1rem" }}
              >
                🔊 Read Aloud
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Storytime;
