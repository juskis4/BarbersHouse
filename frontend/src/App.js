import "./App.css";
import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PublicPage from "./components/public";
import AdminLogin from "./components/admin/login/index.js";
import ProtectedRoute from "./components/admin/protectedRoute";
import { AuthProvider } from "./context/AuthContext.js";
import { ThemeProvider } from "@mui/material/styles";
import { useMode, ColorModeContext } from "./theme.js";

const AdminPage = lazy(() => import("./components/admin"));
const Barbers = lazy(() => import("./components/admin/barbers"));

const App = () => {
  const [theme, colorMode] = useMode();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicPage></PublicPage>,
    },
    {
      path: "/admin",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        </Suspense>
      ),
      children: [
        // Nested routes for admin sections
        {
          path: "barbers",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Barbers />
            </Suspense>
          ),
        },
        // ... add other admin sections (e.g., /admin/appointments) as needed
      ],
    },
    {
      path: "/admin/login",
      element: <AdminLogin></AdminLogin>,
    },
  ]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
