import React from 'react';
import NavBar from './navbar';
import Barbers from './barbers';
import CarouselBarber from './carousel'; 
import Box from '@mui/material/Box';
import Header from './header';

function PublicPage() {
    return (
        <Box sx={{ width: "100vw", display: "flex", flexDirection: "column" }}>
            <Header/>
            <NavBar /> 
            <CarouselBarber /> 
            <Barbers /> 
        </Box> 
    );
}

export default PublicPage;
