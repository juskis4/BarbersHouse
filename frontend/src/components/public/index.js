import React from 'react';
import CarouselBarber from './carousel'; 
import Box from '@mui/material/Box';
import Header from './header';
import NavigationBar from './navigationBar/navigationBar';
import Barbers from './barbers'; // Import the Barbers component

function PublicPage() {
  return (
    <Box sx={{ width: "100vw", display: "flex", flexDirection: "column" }}>
      <Header />
      <NavigationBar />
      <CarouselBarber />
      <Barbers /> {/* Add the Barbers component here to display the Services section */}
    </Box> 
  );
}

export default PublicPage;
