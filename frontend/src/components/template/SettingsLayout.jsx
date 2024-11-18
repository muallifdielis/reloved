import React from "react";
import Navbar from "../common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import SideMenu from "../common/SideMenu";

export default function SettingsLayout() {
  return (
    <>
      <Navbar />
      <SideMenu />
      <Outlet />
      <Footer />
    </>
  );
}
