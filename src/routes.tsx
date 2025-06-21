import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/app/dashboard";
import { Login } from "./pages/auth/login";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { Register } from "./pages/auth/registration";
import { Orders } from "./pages/app/orders/orders";
import { NotFound } from "./pages/404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
