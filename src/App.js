import { useState } from 'react';
import { getUserLocation } from './utils/globals';
import './App.css';

const App = () => {
  const [userLocation, setUserLocation] = useState(null);

  const getUsersLocation = async () => {
    const location = await getUserLocation();
    setUserLocation(location);
  };

  return (
    <div>
      <h1>Geolocation App</h1>
      <button onClick={() => getUsersLocation()}>Get User Location</button>
      {userLocation && (
        <div>
          <h2>User Location</h2>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default App;

// CMD+. to show Prettier/Linting options on squiggly lines
