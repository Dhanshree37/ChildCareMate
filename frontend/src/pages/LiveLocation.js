import { useState, useEffect } from "react";

const LiveLocation = ({ setUserLocation }) => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let watchId;

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const updatedLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };

          setLocation(updatedLocation);
          setUserLocation(updatedLocation); // Update parent state
          setIsLoading(false);
          setErrorMsg(null);
        },
        (error) => {
          setIsLoading(false);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setErrorMsg("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setErrorMsg("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setErrorMsg("The request to get user location timed out.");
              break;
            default:
              setErrorMsg("An unexpected error occurred.");
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setErrorMsg("Geolocation is not supported by your browser");
      setIsLoading(false);
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [setUserLocation]);

  return (
    <div>
      <h2>Your Live Location</h2>
      {isLoading ? (
        <p>Loading location...</p>
      ) : errorMsg ? (
        <p style={{ color: "red" }}>{errorMsg}</p>
      ) : (
        <p>
          Latitude: {location.lat?.toFixed(6)}, Longitude: {location.lon?.toFixed(6)}
        </p>
      )}
    </div>
  );
};

export default LiveLocation;