import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/main/Home";
<<<<<<< Updated upstream
import MainLayout from "../components/template/MainLayout";
=======
import Cart from "../pages/user/main/Cart";
import MainLayout from "../components/template/mainLayout";
>>>>>>> Stashed changes
import Login from "../pages/user/auth/login";
import SignUp from "../pages/user/auth/SignUp";
import NotFound from "../pages/user/main/NotFound";
import DetailProduct from "../pages/user/main/DetailProduct";

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
<<<<<<< Updated upstream
        path: "*",
        element: <NotFound />,
      },
      {
        // path: "/detail-product/:id",
        path: "/detail-product",
        element: <DetailProduct />,
      },
=======
        path: "/cart",
        element: <Cart />,
      }
>>>>>>> Stashed changes
    ],
  },
]);
