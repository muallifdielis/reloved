import React from "react";
import Sidebar from "../pages/admin-components/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../pages/admin-components/Footer";
import ScrollUp from "../common/ScrollUp";

export default function AdminLayout() {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex flex-col md:w-full p-5 justify-between overflow-x-auto">
        <Outlet />
        <ScrollUp />
        <Footer />
      </div>
    </div>
  );
}
