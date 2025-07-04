import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { Login } from "./pages/auth/login";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { Register } from "./pages/auth/registration";
import { Orders } from "./pages/app/orders/orders";
import { NotFound } from "./pages/404";
import { Error } from "./pages/error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/orders",
        element: <Orders />,
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
  { path: "*", element: <NotFound /> },
]);
