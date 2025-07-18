import React, { useRef, useEffect, useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';

const shapes = ['circle', 'square', 'triangle', 'rectangle', 'hexagon'];

const ShapeTracingGame = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const drawShape = (ctx, shape) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';

    if (shape === 'circle') {
      ctx.beginPath();
      ctx.arc(150, 150, 100, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape === 'square') {
      ctx.beginPath();
      ctx.rect(50, 50, 200, 200);
      ctx.stroke();
    } else if (shape === 'triangle') {
      ctx.beginPath();
      ctx.moveTo(150, 50);
      ctx.lineTo(50, 250);
      ctx.lineTo(250, 250);
      ctx.closePath();
      ctx.stroke();
    } else if (shape === 'rectangle') {
      ctx.beginPath();
      ctx.rect(50, 80, 300, 150);
      ctx.stroke();
    } else if (shape === 'hexagon') {
      ctx.beginPath();
      const radius = 100;
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = 150 + radius * Math.cos(angle);
        const y = 150 + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!drawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();

    setProgress(prev => prev + 1);
    if (progress > 1000) {
      setCurrentShapeIndex(prevIndex => (prevIndex + 1) % shapes.length);
      setProgress(0);
    }
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    drawShape(ctx, shapes[currentShapeIndex]);
    setProgress(0);
  }, [currentShapeIndex]);

  const refreshShape = () => {
    const ctx = canvasRef.current.getContext('2d');
    drawShape(ctx, shapes[currentShapeIndex]);
    setProgress(0);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 13 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Shape Tracing Game
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          width="400"
          height="400"
          style={{
            background: '#fff',
            border: '2px solid #1976d2',
            borderRadius: '10px',
          }}
        />
      </Paper>

      <Typography variant="body1" sx={{ mt: 2 }}>
        Trace the shape! Your progress: <b>{Math.floor((progress / 1000) * 100)}%</b>
      </Typography>

      <Box mt={2} display="flex" gap={2}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => setCurrentShapeIndex(prev => (prev + 1) % shapes.length)}
        >
          Next Shape
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={refreshShape}
        >
          Refresh Shape
        </Button>
      </Box>
    </Box>
  );
};

export default ShapeTracingGame;