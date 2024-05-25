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
const Services = lazy(() => import("./components/admin/services"));
const BarberProfile = lazy(
  () => import("./components/admin/barbers/barberProfile"),
);
const BookingDetails = lazy(
  () => import("./components/admin/bookings/bookingDetails"),
);
const ServiceDetails = lazy(
  () => import("./components/admin/services/serviceDetails"),
);
const AddBarber = lazy(() => import("./components/admin/addBarber"));
const AddBooking = lazy(() => import("./components/admin/addBooking"));
const AddService = lazy(() => import("./components/admin/addService"));

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
          path: "bookings",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Bookings />
            </Suspense>
          ),
        },
        {
          path: "bookings/add",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AddBooking />
            </Suspense>
          ),
        },
        {
          path: "bookings/:bookingId",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <BookingDetails />
            </Suspense>
          ),
        },
        {
          path: "services",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Services />
            </Suspense>
          ),
        },
        {
          path: "services/:serviceId",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ServiceDetails />
            </Suspense>
          ),
        },
        {
          path: "services/add",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AddService />
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
