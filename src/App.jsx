import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// Location hook to detect user's location
const useLocation = () => {
  const [location, setLocation] = useState({
    country: 'United States',
    countryCode: 'us',
    state: 'California',
    city: 'San Francisco'
  });

  useEffect(() => {
    // In a real app, you'd use geolocation API and a geocoding service
    // For demo purposes, using default location
    const detectLocation = async () => {
      try {
        // You can implement actual geolocation here
        // const response = await fetch('https://ipapi.co/json/');
        // const data = await response.json();
        // setLocation({
        //   country: data.country_name,
        //   countryCode: data.country_code.toLowerCase(),
        //   state: data.region,
        //   city: data.city
        // });
      } catch (error) {
        console.log('Using default location');
      }
    };
    
    detectLocation();
  }, []);

  return location;
};

export default function App() {
  const [filter, setFilter] = useState("global");
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">      
      <div className="flex-1 flex flex-col">
        <Navbar filter={filter} setFilter={setFilter} location={location} />        
        <Home filter={filter} location={location} />
      </div>
    </div>
  );
}