import React from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";
import ScrollUp from "../common/ScrollUp";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="min-h-svh">
        <Outlet />
      </div>
      <ScrollUp />
      <Footer />
    </>
  );
}
