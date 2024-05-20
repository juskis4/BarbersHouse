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
const Bookings = lazy(() => import("./components/admin/bookings"));
const BarberProfile = lazy(
  () => import("./components/admin/barbers/barberProfile"),
);
const AddBarber = lazy(() => import("./components/admin/addBarber"));

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
        {
          path: "barbers/add",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AddBarber />
            </Suspense>
          ),
        },
        {
          path: "barbers/:barberId",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <BarberProfile />
            </Suspense>
          ),
        },
        {
          path: "services/:serviceId",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <BarberProfile />
            </Suspense>
          ),
        },
        {
          path: "bookings",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Bookings />
            </Suspense>
          ),
        },
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
