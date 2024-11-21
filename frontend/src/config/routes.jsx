import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/main/Home";
import Cart from "../pages/user/main/Cart"; 
import MainLayout from "../components/template/MainLayout"; 
import Login from "../pages/user/auth/Login";
import SignUp from "../pages/user/auth/SignUp";
import NotFound from "../pages/user/main/NotFound";
import DetailProduct from "../pages/user/main/DetailProduct";
import Checkout from "../pages/user/main/Checkout";

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
    ],
  },
]);
