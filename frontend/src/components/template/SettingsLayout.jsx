import Navbar from "../common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import SideMenu from "../common/SideMenu";
import ScrollUp from "../common/ScrollUp";

export default function SettingsLayout() {
  return (
    <>
      <Navbar />
      <SideMenu />
      <Outlet />
      <ScrollUp />
      <Footer />
    </>
  );
}
