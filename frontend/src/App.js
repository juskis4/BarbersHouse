import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicPage from './components/public';
import AdminPage from './components/admin';
import AdminLogin from './components/admin/login';
import ProtectedRoute from './components/admin/protectedRoute';
import { AuthProvider } from './context/AuthContext.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const App = () => {
  const theme = createTheme({
    palette: {
      secondary: {
        main: '#bc6c25', 
      },
    },
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
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;