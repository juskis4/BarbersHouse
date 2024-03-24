import React from 'react';
import "./App.css";
import NavBar from './components/navbar';
import Barbers from './components/barbers';
import CarouselBarber from './components/carousel';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

const App = () => {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#dda15e', 
            color: 'white', 
            fontWeight: 'bold', 
            "&:hover": { 
              backgroundColor: '#bc6c25', 
              color: '#fefae0', 
            }
          },
      MuiStepper: {
        styleOverrides: {
          root: {

          }
        }
      }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100vw", display: "flex", flexDirection: "column" }}>
        <NavBar />
        <CarouselBarber />  
        <Barbers />        
      </Box>
    </ThemeProvider>
    
  );
};

export default App;
