import React from 'react';
import "./App.css";
import NavBar from './components/navbar';
import Barbers from './components/barbers';
import CarouselBarber from './components/carousel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const App = () => {
  return (
    <Box sx={{ width: "100vw", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <CarouselBarber />  {/* Carousel positioned at the top */}
      <Barbers />        {/* Barbers positioned below the carousel */}
    </Box>
  );
};

export default App;
