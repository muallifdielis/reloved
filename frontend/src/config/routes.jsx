import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/main/Home";
import Cart from "../pages/user/main/Cart"; // Menambahkan import untuk Cart
import MainLayout from "../components/template/MainLayout"; // Pastikan nama dan path konsisten
import Login from "../pages/user/auth/login";
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
    element: <MainLayout />, // Layout utama
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart", // Menambahkan rute untuk Cart
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
