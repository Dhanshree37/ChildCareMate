import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Alert,
  Grid,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const MilestoneTracker = () => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [child, setChild] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      setError("No user ID found");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/children/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
      })
      .then((response) => {
        if (response.data.length === 0) {
          setError("No child data found. Please update your child profile to see relevant milestones.");
          setLoading(false);
          return;
        }

        const childData = response.data[0];
        setChild(childData);

        return axios.get(`http://localhost:5000/milestones/child/${childData.child_id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
        });
      })
      .then((response) => {
        if (response?.data?.length === 0) {
          setError("No milestones found for this age group and medical condition.");
        } else {
          setMilestones(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.response?.data?.message || "Error fetching milestone data. Please update your child profile to see relevant milestones.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box
      sx={{
        pt: '100px', // Space for navbar
        pl: { xs: 0, sm: '240px' }, // Space for sidebar on desktop
        pr: 2,
        pb: 5,
        backgroundColor: '#fefefe',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <Container maxWidth="lg">
        {/* Page Title */}
        <Paper elevation={4} sx={{ p: 3, textAlign: "center", mb: 4, borderRadius: "15px" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "#0077B6" }}>
            Developmental Milestone Tracker
          </Typography>
        </Paper>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ textAlign: "center", fontSize: "1.2rem" }}>
            {error}
          </Alert>
        ) : (
          <>
            {/* Child Info Card */}
            {child && (
              <Card
                elevation={3}
                sx={{
                  mb: 4,
                  p: 3,
                  backgroundColor: "#f0f9ff",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Child Name: <span style={{ color: "#0d47a1" }}>{child.name}</span>
                  </Typography>
                  <Typography variant="h6">Age: {child.age}</Typography>
                </CardContent>
              </Card>
            )}

            {/* Milestones Grid */}
            <Grid container spacing={3}>
              {milestones.map((milestone, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    elevation={4}
                    sx={{
                      p: 3,
                      backgroundColor: "#e3f2fd",
                      borderRadius: "12px",
                      textAlign: "center",
                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#0d47a1", mb: 1 }}
                      >
                        {milestone.category.charAt(0).toUpperCase() + milestone.category.slice(1)} Milestones
                      </Typography>
                      <Typography variant="body1">{milestone.milestone_description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default MilestoneTracker;
