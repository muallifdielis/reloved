import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/template/MainLayout";
import SettingsLayout from "../components/template/SettingsLayout";
import Home from "../pages/user/main/Home";
import Login from "../pages/user/auth/login";
import Cart from "../pages/user/main/Cart"; 
import SignUp from "../pages/user/auth/SignUp";
import ForgotPassword from "../pages/user/auth/ForgotPassword";
import ResetPassword from "../pages/user/auth/ResetPassword";
import NotFound from "../pages/user/main/NotFound";
import DetailProduct from "../pages/user/main/DetailProduct";
import Checkout from "../pages/user/main/Checkout";
import Shipping from "../pages/user/main/Shipping";
import Profile from "../pages/user/main/profile/Profile";
import EditProfile from "../pages/user/main/profile/EditProfile";
import EditPassword from "../pages/user/main/profile/EditPassword";
import Orders from "../pages/user/main/sell/Orders";
import OrderDetail from "../pages/user/main/sell/OrderDetail";
import Purchases from "../pages/user/main/buy/Purchases";
import PurchaseDetail from "../pages/user/main/buy/PurchaseDetail";

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
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
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
        path: "/cart", 
        element: <Cart />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
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
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        // path: "/orders/detail/:id",
        path: "/orders/detail",
        element: <OrderDetail />,
      },
      {
        path: "/purchases",
        element: <Purchases />,
      },
      {
        path: "/purchases",
        element: <Purchases />,
      },
      {
        // path: "/purchases/detail/:id",
        path: "/purchases/detail",
        element: <PurchaseDetail />,
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
      {
        path: "/settings/password",
        element: <EditPassword />,
      },
    ],
  },
]);
