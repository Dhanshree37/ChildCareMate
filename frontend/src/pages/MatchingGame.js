import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';



const cardData = [
  { id: 1, content: '🍎', matched: false },
  { id: 2, content: '🍊', matched: false },
  { id: 3, content: '🍌', matched: false },
  { id: 4, content: '🍇', matched: false },
  { id: 5, content: '🍉', matched: false },
  { id: 6, content: '🍓', matched: false },
];

const MatchingGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  // Shuffle and reset cards
  const shuffleCards = () => {
    const shuffledCards = [...cardData, ...cardData]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || cards[index].matched) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [firstCard, secondCard] = newFlipped;
      if (cards[firstCard].content === cards[secondCard].content) {
        const newCards = [...cards];
        newCards[firstCard].matched = true;
        newCards[secondCard].matched = true;
        setCards(newCards);
        setMatchedPairs(matchedPairs + 1);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  return (
    <Box textAlign="center" sx={{ mt: 13 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
      🎭 Match the Cards! 🎭
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 600, mx: "auto" }}>
        {cards.map((card, index) => (
          <Grid item xs={3} key={card.id}>
            <Paper
              elevation={4}
              onClick={() => handleCardClick(index)}
              sx={{
                width: 130,
                height: 130,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
                fontWeight: "bold",
                backgroundColor: flippedCards.includes(index) || card.matched ? "#FFECB3" : "#B3E5FC",
                cursor: "pointer",
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              {flippedCards.includes(index) || card.matched ? card.content : "?"}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {matchedPairs === cardData.length && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" color="secondary">
            🎉 Congratulations! You matched all the pairs! 🎉
          </Typography>
          <Button variant="contained" color="primary" onClick={shuffleCards} sx={{ mt: 2 }}>
            Play Again
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MatchingGame;