import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom user icon (blue)
const userIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom therapist icon (green)
const therapistIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const TherapistsMap = () => {
  const [therapists, setTherapists] = useState([]);
  const [location, setLocation] = useState({ lat: 19.076, lon: 72.8777 }); // Mumbai fallback
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setLocation({ lat, lon });
        fetchTherapists(lat, lon);
      },
      () => {
        fetchTherapists(location.lat, location.lon);
      }
    );
  }, []);

  const fetchTherapists = async (lat, lon) => {
    setLoading(true);
    const radius = 5000; // in meters

    const query = `
      [out:json][timeout:25];
      (
        node["amenity"]
        ["name"~"therapist|psychologist|counselor|child care|mental health|speech therapy|occupational therapist", i]
        (around:${radius},${lat},${lon});
        
        way["amenity"]
        ["name"~"therapist|psychologist|counselor|child care|mental health|speech therapy|occupational therapist", i]
        (around:${radius},${lat},${lon});
        
        relation["amenity"]
        ["name"~"therapist|psychologist|counselor|child care|mental health|speech therapy|occupational therapist", i]
        (around:${radius},${lat},${lon});
      );
      out center;
    `;

    try {
      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });
      const data = await response.json();

      const results = data.elements.map((el) => ({
        id: el.id,
        name: el.tags?.name || "Unnamed",
        type: el.tags?.amenity || "N/A",
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon,
        address: el.tags?.["addr:full"] || el.tags?.["addr:street"] || "Address not available",
      }));

      setTherapists(results);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        pt: "80px",
        pl: { xs: 0, sm: "240px" }, // match your sidebar
        pr: 2,
        pb: 5,
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{ p: 3, textAlign: "center", mb: 4, borderRadius: "15px" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#00695c" }}>
            Autism Support: Nearby Therapists
          </Typography>
        </Paper>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : therapists.length === 0 ? (
          <Alert severity="info" sx={{ mb: 3 }}>
            No therapists found nearby. Please try again later or move to a different location.
          </Alert>
        ) : (
          <>
            {/* Map View */}
            <Box
              sx={{
                height: "450px",
                width: "100%",
                mb: 4,
                borderRadius: "15px",
                overflow: "hidden",
              }}
            >
              <MapContainer center={[location.lat, location.lon]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[location.lat, location.lon]} icon={userIcon}>
                  <Popup>
                    <strong>Your Location</strong>
                  </Popup>
                </Marker>
                {therapists.map((t) => (
                  <Marker key={t.id} position={[t.lat, t.lon]} icon={therapistIcon}>
                    <Popup>
                      <strong>{t.name}</strong>
                      <br />
                      {t.address}
                      <br />
                      <em>{t.type}</em>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </Box>

            {/* List View */}
            <Paper elevation={3} sx={{ p: 2, borderRadius: "12px" }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: "#004d40" }}>
                Therapist List
              </Typography>
              <List>
                {therapists.map((t) => (
                  <React.Fragment key={t.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={t.name}
                        secondary={
                          <>
                            {t.address}
                            <br />
                            <strong>Type:</strong> {t.type}
                          </>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
};

export default TherapistsMap;
