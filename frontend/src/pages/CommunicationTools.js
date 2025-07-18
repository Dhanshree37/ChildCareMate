import React from 'react';
import {
  Grid,
  Card,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Help from './Assets/help.jpeg';
import Yes from './Assets/yes.jpeg';
import No from './Assets/no.jpeg';
import Hungry from './Assets/hungry.jpeg';
import Thirsty from './Assets/thirsty.jpeg';
import Sad from './Assets/sad.jpeg';
import Scared from './Assets/scared2.jpeg';
import Sick from './Assets/sick.jpeg';
import Cold from './Assets/cold.jpeg';
import Hot from './Assets/hot.jpeg';
import I from './Assets/I.jpeg';
import Want from './Assets/want.jpg';
import What from './Assets/what.jpeg';
import Bathroom from './Assets/bathroom.jpeg';
import Hug from './Assets/hug.jpeg';
import Play from './Assets/play.jpeg';

const items = [
  { text: 'I', img: I },
  { text: 'Help', img: Help },
  { text: 'Yes', img: Yes },
  { text: 'No', img: No },
  { text: "I'm Hungry", img: Hungry },
  { text: "I'm Thirsty", img: Thirsty },
  { text: "I feel Sick", img: Sick },
  { text: "I'm Sad", img: Sad },
  { text: "I'm Scared", img: Scared },
  { text: "I'm Cold", img: Cold },
  { text: "I'm Hot", img: Hot },
  { text: 'want', img: Want },
  { text: 'What?', img: What },
  { text: 'Bathroom', img: Bathroom },
  { text: 'I want a hug', img: Hug },
  { text: 'play', img: Play },
];

const speakText = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

const CommunicationBoard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div
      style={{
        textAlign: 'center',
        paddingLeft: '280px',
        paddingRight: '30px',
        marginTop: 100,
      }}
    >
      <Grid container spacing={isMobile ? 2 : 3}>
        {items.map((item, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Card
  onClick={() => speakText(item.text)}
  sx={{
    aspectRatio: '1 / 1', // Ensures square shape
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 2,
    border: '2px solid #fcf7f7',
    backgroundColor: '#f4c4c4',
    padding: 2,
    textAlign: 'center',
    boxShadow: 3,
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: 6,
    },
  }}
>

              <Typography variant="h6" sx={{ color: '#333', fontWeight: 500 }}>
                {item.text}
              </Typography>

              <div
                style={{
                  width: '100%',
                  height: '150px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '8px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                }}
              >
                <img
                  src={item.img}
                  alt={item.text}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CommunicationBoard;
