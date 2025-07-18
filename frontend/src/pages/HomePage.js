import React from "react";
import { Typography, Grid, Paper, Box, } from "@mui/material";

const HomePage = () => {
  return (
    <Box
      sx={{
        pt: '100px', // Space for navbar
        pl: { xs: 0, sm: '240px' }, // Space for sidebar on desktop
        minHeight: "100vh", // Covers full viewport height
        width: "100%", // Covers full viewport width
        background: "linear-gradient(180deg, #FFF3E0, #E1F5FE)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        margin: 0,
        padding: 0,
        overflow: "hidden",
        boxSizing: 'border-box',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          maxWidth: "1200px",
          py: 13,
          px: 3,
          
        }}
      >
        <Box sx={{ textAlign: { xs: "center", md: "left" }, flex: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: "bold", color: "#0077B6", textShadow: "2px 2px 5px rgba(0,0,0,0.1)" }}>
            Welcome to <span style={{ color: "#FF9800" }}>ChildCareMate</span>
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, color: "#444" }}>
            Empowering children with autism and their caregivers with care and love.
          </Typography>
        </Box>
        <Box
          component="img"
          src="/intro-image.jpeg"
          alt="Happy Kids"
          sx={{ width: { xs: "100%", md: "40%" }, maxHeight: "300px", borderRadius: "15px", boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)" }}
        />
      </Box>

      {/* About Section */}
      <Box sx={{ textAlign: "center", py: 5, backgroundColor: "#FFF", borderRadius: "12px", boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)", width: "90%", maxWidth: "1200px" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0077B6" }}>
          About <span style={{ color: "#FF9800" }}>ChildCareMate</span>
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: "#444", maxWidth: "800px", margin: "0 auto" }}>
          ChildCareMate is an intuitive platform designed to support children with autism and their caregivers. We offer a range of interactive features, including a communication board, fun educational games, and calming tools to create a positive and nurturing environment.
        </Typography>
      </Box>

      {/* Features Section */}
      <Box sx={{ textAlign: "center", py: 5, width: "90%", maxWidth: "1200px" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0077B6" }}>
          Our <span style={{ color: "#FF9800" }}>Key Features</span>
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {[  
            { title: "Communication Board", img: "/communication.jpg", desc: "A visual-based communication tool to help children express themselves." },
            { title: "Interactive Games", img: "/game.png", desc: "Engaging and educational games tailored for autistic children." },
            { title: "Calming Features", img: "/calm.png", desc: "Music, sounds, and visuals to help children feel at ease." }
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper sx={{ p: 3, textAlign: "center", boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.15)", borderRadius: "12px", backgroundColor: "#FFFAF3", transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
                <Box
                  component="img"
                  src={feature.img}
                  alt={feature.title}
                  sx={{ width: 80, height: 80, mb: 2 }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>{feature.title}</Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>{feature.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;