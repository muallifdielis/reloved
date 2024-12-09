import Navbar from "../common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import SideBar from "../common/SideBar";
import ScrollUp from "../common/ScrollUp";
import ProtectedUser from "../../utils/ProtectedUser";

export default function SellerLayout() {
  return (
    <>
      <ProtectedUser />
      <Navbar />
      <div className="flex flex-col justify-between min-h-screen">
        <div className="container flex flex-col md:flex-row gap-5 md:gap-7 lg:gap-10 mt-3 mb-10">
          <SideBar />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>

        <ScrollUp />
        <Footer />
      </div>
    </>
  );
}
