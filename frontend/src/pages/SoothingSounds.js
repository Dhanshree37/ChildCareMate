import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Box,
} from '@mui/material';

import Birds from './Assets/Audio/birds-singing-calm-river-nature-ambient-sound-127411.mp3';
import NatureSounds from './Assets/Audio/nature-soundstropicaljunglebirds-108380.mp3';
import River from './Assets/Audio/river-in-icelandic-nature-ambience-5-minutes-18951.mp3';
import CricketSummer from './Assets/Audio/sounds-crickets-and-nature-in-summer-background-singing-142461.mp3';
import Twinkle from './Assets/Audio/twinkle-twinkle-little-star-bells-background-xmas-music-for-video-262281.mp3';
import Forest from './Assets/Audio/forest-lullaby-110624.mp3';
import Sleepy from './Assets/Audio/sleepy-bear-cub-222385.mp3';
import ABC from './Assets/Audio/abc-alphabet-song-274033.mp3';

const soothingSoundsData = [
  { title: 'Birds 🐦', audioSrc: Birds },
  { title: 'Nature Sounds 🌿', audioSrc: NatureSounds },
  { title: 'River 🌊', audioSrc: River },
  { title: 'Cricket Summer 🦗', audioSrc: CricketSummer },
  { title: 'Twinkle Twinkle ⭐', audioSrc: Twinkle },
  { title: 'Forest Lullaby 🌲', audioSrc: Forest },
  { title: 'Sleepy Bear Cub 🐻', audioSrc: Sleepy },
  { title: 'ABC Alphabet 🎶', audioSrc: ABC },
];

const SoothingSounds = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSounds = soothingSoundsData.filter((sound) =>
    sound.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        pl: { xs: 2, sm: 2, md: '200px' }, // padding-left for sidebar
        pr: 2,
        pt: 13,
        pb: 4,
        boxSizing: 'border-box',
        background: 'linear-gradient(to right, #e3f2fd, #fff)',
        minHeight: '100%',

      }}
    >
      <Box sx={{ maxWidth: '90%', mx: 'auto', textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', color: '#1e88e5', mb: 3 }}
        >
          Soothing Sounds
        </Typography>

        <TextField
          label="Search Sounds"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 4 }}
        />

        <Grid container spacing={3} justifyContent="center">
          {filteredSounds.map((sound, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: '12px',
                  boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.1)',
                  p: 2,
                  height: '100%',
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {sound.title}
                  </Typography>
                  <audio controls style={{ width: '100%' }}>
                    <source src={sound.audioSrc} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SoothingSounds;
