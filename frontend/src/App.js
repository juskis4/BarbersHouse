import "./App.css";
import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PublicPage from './components/public';
import AdminLogin from './components/admin/login/index.js';
import ProtectedRoute from './components/admin/protectedRoute';
import { AuthProvider } from './context/AuthContext.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const AdminPage = lazy(() => import('./components/admin'));

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

  const router = createBrowserRouter([
    {
      path:"/",
      element:<PublicPage></PublicPage>
    },
    {
      path:"/admin",
      element:(
        <Suspense fallback={<div>Loading...</div>}> {/* Wrap in Suspense */}
          <ProtectedRoute>
            <AdminPage /> 
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path:"/admin/login",
      element:<AdminLogin></AdminLogin>
    }
  ])


  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;