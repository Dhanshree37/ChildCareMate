import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


const Therapists = ({ userLocation }) => {
  const [therapists, setTherapists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userLocation?.lat || !userLocation?.lon) {
      console.warn("⚠️ Skipping API Call: Location is not set yet.");
      return;
    }

    console.log(`📡 Fetching therapists for: ${userLocation.lat}, ${userLocation.lon}`);

    setIsLoading(true);
    fetch(`http://localhost:5000/therapists?lat=${userLocation.lat}&lon=${userLocation.lon}`)
      .then(res => res.json())
      .then(data => {
        console.log("✅ Therapists fetched:", data);
        setTherapists(data);
        setIsLoading(false);
        setError(null);
      })
      .catch(err => {
        console.error("❌ Fetch Error:", err);
        setError("Failed to fetch therapists.");
        setIsLoading(false);
      });
  }, [userLocation]);

  const FitToMarkers = () => {
    const map = useMap();
    useEffect(() => {
      if (therapists.length > 0) {
        const bounds = therapists.map(t => [parseFloat(t.latitude), parseFloat(t.longitude)]);
        bounds.push([userLocation.lat, userLocation.lon]); // include user location
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [map, therapists]);

    return null;
  };

  const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return (
    <div className="therapists-container">
      <h2>Nearby Therapists</h2>
      {isLoading && <p>Loading therapists...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {userLocation?.lat && userLocation?.lon && (
        <MapContainer center={[userLocation.lat, userLocation.lon]} zoom={12} style={{ height: "400px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FitToMarkers />

          {/* User Marker */}
          <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
            <Popup>Your Location</Popup>
          </Marker>

          {/* Therapist Markers */}
          {therapists.map((therapist, index) => (
            <Marker
              key={therapist.id || index}
              position={[parseFloat(therapist.latitude), parseFloat(therapist.longitude)]}
            >
              <Popup>{therapist.name} - {therapist.specialization}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default Therapists;
