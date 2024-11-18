import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/main/Home";
import MainLayout from "../components/template/mainLayout";
import Login from "../pages/user/auth/login";
import SignUp from "../pages/user/auth/SignUp";

export const routes = createBrowserRouter([
  // AUTH
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  // MAIN CONTENT
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
