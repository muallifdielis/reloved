import React from "react";
import Sidebar from "../pages/admin-components/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../pages/admin-components/Footer";
import ScrollUp from "../common/ScrollUp";
import ProtectedAdmin from "../../utils/ProtectedAdmin";

export default function AdminLayout() {
  return (
    <div className="flex flex-col md:flex-row">
      <ProtectedAdmin />
      <Sidebar />
      <div className="flex flex-col md:w-full p-5 justify-between overflow-x-auto">
        <Outlet />
        <ScrollUp />
        <Footer />
      </div>
    </div>
  );
}
