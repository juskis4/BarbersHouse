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
