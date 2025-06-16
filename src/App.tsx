import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./routes";

export function App() {
  return <RouterProvider router={router} />;
}
