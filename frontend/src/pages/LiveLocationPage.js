import React, { useState } from "react";
import LiveLocation from "./LiveLocation";
import Therapists from "./Therapists";
import TherapistsMap from "./TherapistsMap";

function LiveLocationPage() {
  const [userLocation, setUserLocation] = useState(null);

  return (
    <div className="live-location-container">
      <LiveLocation setUserLocation={setUserLocation} />

      {userLocation && (
        <>
          <Therapists userLocation={userLocation} />
          <TherapistsMap userLocation={userLocation} />
        </>
      )}
    </div>
  );
}

export default LiveLocationPage;
