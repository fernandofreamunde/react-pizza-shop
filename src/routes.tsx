import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/app/dashboard";
import { Login } from "./pages/auth/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
