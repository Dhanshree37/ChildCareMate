import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import CommunicationTools from './pages/CommunicationTools';
import CalmingFeatures from './pages/CalmingFeatures';
import BreathingExercises from './pages/BreathingExercises';
import ChildProfile from './pages/ChildProfile';
import Games from './pages/Games';
import MatchingGame from './pages/MatchingGame';
import SimpleMathFun from './pages/SimpleMathFun';
import SoothingSounds from './pages/SoothingSounds';
import ShapeTracingGame from './pages/ShapeTracingGame';
import Storytime from './pages/StoryTime';
import EmotionCharades from './pages/EmotionCharades';
import ResetPassword from './pages/ResetPassword';
import MilestoneTracker from './pages/MilestoneTracker';
import Therapists from './pages/Therapists'; 
import TherapistMap from './pages/TherapistMap';
import Layout from './components/Layout';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  const location = useLocation();
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
  }, []);

  const handleLogin = (userDetails) => {
    setIsLoggedIn(true);
    setUser(userDetails);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <CssBaseline />
      <Routes>
        {/* Routes without Layout (Login, Register, etc.) */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Routes wrapped with Layout */}
        <Route
          path="/*"
          element={
            <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home-page" element={<HomePage />} />
                
                
                {/* Protected Routes */}
                <Route path="/user-profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><UserProfile /></ProtectedRoute>} />
                <Route path="/child-profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ChildProfile /></ProtectedRoute>} />
                <Route path="/communication-tools" element={<ProtectedRoute isLoggedIn={isLoggedIn}><CommunicationTools /></ProtectedRoute>} />
                <Route path="/calming-features" element={<ProtectedRoute isLoggedIn={isLoggedIn}><CalmingFeatures /></ProtectedRoute>} />
                <Route path="/breathing-exercises" element={<ProtectedRoute isLoggedIn={isLoggedIn}><BreathingExercises /></ProtectedRoute>} />
                <Route path="/games" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Games /></ProtectedRoute>} />
                <Route path="/matching-game" element={<ProtectedRoute isLoggedIn={isLoggedIn}><MatchingGame /></ProtectedRoute>} />
                <Route path="/soothing-sounds" element={<ProtectedRoute isLoggedIn={isLoggedIn}><SoothingSounds /></ProtectedRoute>} />
                <Route path="/shape-tracing-game" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ShapeTracingGame /></ProtectedRoute>} />
                <Route path="/story-time" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Storytime /></ProtectedRoute>} />
                <Route path="/emotion-charades" element={<ProtectedRoute isLoggedIn={isLoggedIn}><EmotionCharades /></ProtectedRoute>} />
                <Route path="/simple-math-fun" element={<ProtectedRoute isLoggedIn={isLoggedIn}><SimpleMathFun /></ProtectedRoute>} />
                <Route path="/milestone-tracker/:user_id" element={<ProtectedRoute isLoggedIn={isLoggedIn}><MilestoneTracker /></ProtectedRoute>} />
                <Route path="/therapists" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Therapists userLocation={userLocation} /></ProtectedRoute>} />
                <Route path="/therapist-map" element={<ProtectedRoute isLoggedIn={isLoggedIn}><TherapistMap userLocation={userLocation} /></ProtectedRoute>} />
              
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;