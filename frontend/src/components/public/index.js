import React from 'react';
import CarouselBarber from './carousel'; 
import Box from '@mui/material/Box';
import Header from './header';
import NavigationBar from './navigationBar/navigationBar';
import Barbers from './barbers'; 
import Team from './team'; 
import FAQ from './FAQ'; 
import Footer from './footer'; 

function PublicPage() {
  return (
    <Box sx={{ width: "100vw", display: "flex", flexDirection: "column" }}>
      <Header />
      <NavigationBar />
      <CarouselBarber />
      <Barbers /> {}
      <Team /> {}
      <FAQ /> {}
      <Footer /> {}
    </Box> 
  );
}

export default PublicPage;
