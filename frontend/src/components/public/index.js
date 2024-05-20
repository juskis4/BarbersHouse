import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; 
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
    <I18nextProvider i18n={i18n}>
      <Box sx={{ width: "100vw", display: "flex", flexDirection: "column" }}>
        <Header />
        <NavigationBar />
        <CarouselBarber />
        <Barbers />
        <Team />
        <FAQ />
        <Footer />
      </Box>
    </I18nextProvider>
  );
}

export default PublicPage;
