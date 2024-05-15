import "./App.css";
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicPage from '../src/components/public';
import AdminLogin from '../src/components/admin/login';
import ProtectedRoute from './components/admin/protectedRoute';
import { AuthProvider } from './context/AuthContext.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const AdminPage = lazy(() => import('../src/components/admin'));

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
      <AuthProvider>
        {/* Wrap the entire app with AuthProvider */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;