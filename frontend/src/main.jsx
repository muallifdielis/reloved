import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routes } from "./config/routes.jsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const ScrollToTop = () => {
  useEffect(() => {
    const unlisten = routes.subscribe(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return () => unlisten();
  }, []);
  return null;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <ScrollToTop />
    <RouterProvider router={routes} />
  </StrictMode>
);
