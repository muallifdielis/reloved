import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/template/MainLayout";
import SettingsLayout from "../components/template/SettingsLayout";
import Home from "../pages/user/main/Home";
import Login from "../pages/user/auth/login";
import SignUp from "../pages/user/auth/SignUp";
import NotFound from "../pages/user/main/NotFound";
import DetailProduct from "../pages/user/main/DetailProduct";
import Checkout from "../pages/user/main/Checkout";
import Shipping from "../pages/user/main/Shipping";
import Profile from "../pages/user/main/profile/Profile";
import EditProfile from "../pages/user/main/profile/EditProfile";

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
      {
        path: "*",
        element: <NotFound />,
      },
      {
        // path: "/detail-product/:id",
        path: "/detail-product",
        element: <DetailProduct />,
      },
      {
        // path: "/checkout/:id",
        path: "/checkout",
        element: <Checkout />,
      },
      {
        // path: "/shipping/:id",
        path: "/shipping",
        element: <Shipping />,
      },
      //USER PROFILE
      {
        // path: "/profile/:username",
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    element: <SettingsLayout />,
    children: [
      {
        path: "/settings/edit",
        element: <EditProfile />,
      },
    ],
  },
]);
