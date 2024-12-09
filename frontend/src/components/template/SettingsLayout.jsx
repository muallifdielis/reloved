import Navbar from "../common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import SideMenu from "../common/SideMenu";
import ScrollUp from "../common/ScrollUp";
import TitleSection from "../common/TitleSection";
import ProtectedUser from "../../utils/ProtectedUser";

export default function SettingsLayout() {
  return (
    <>
      <ProtectedUser />
      <Navbar />
      <TitleSection title="Pengaturan" />
      <div className="flex flex-col justify-between min-h-svh">
        <div className="container flex flex-col md:flex-row gap-5 md:gap-7 lg:gap-20 mt-5 mb-10">
          <SideMenu />
          <Outlet />
        </div>
        <ScrollUp />
        <Footer />
      </div>
    </>
  );
}
