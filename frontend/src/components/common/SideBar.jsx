import React from "react";
import { IoIosHome } from "react-icons/io";
import { RiFileList2Line } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";

export default function SideBar() {
  const { currentUser } = useAuthStore();
  const location = useLocation();

  return (
    <>
      {/* SIDEMENU */}
      <ul className="hidden md:flex md:w-4/12 lg:w-4/12 flex-col gap-3 p-2 rounded-xl">
        {/* Sidebar Container */}
        <div className="flex flex-col md:flex-row items-start gap-3 mb-4">
          {/* Foto Profil */}
          <img
            src={currentUser?.image ? currentUser.image : "/avatar.png"}
            alt="User Profile"
            className="w-16 h-16 rounded-full object-cover"
          />

          <div className="text-left mt-1 w-8/12">
            <h2 className="font-semibold text-xl text-black truncate">
              {currentUser?.name}
            </h2>
            <p className="text-gray-500">@{currentUser?.username}</p>
          </div>
        </div>

        <Link to="/form-product" className="mb-3">
          <button className="bg-accent hover:bg-accentHover text-white transition-colors duration-300 py-2.5 px-6 rounded-xl w-full max-w-[300px] flex items-center justify-center gap-3 mt-0">
            <FaPlus className="text-lg" />
            <span className="lg:text-lg font-semibold">Tambah produk</span>
          </button>
        </Link>

        {/* Menu Sidebar */}
        <Link to="/seller/dashboard">
          <li
            className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium lg:w-[300px]  ${
              location.pathname === "/seller/dashboard"
                ? "bg-gray-200 text-secondary"
                : "text-gray-500"
            } hover:bg-gray-100 hover:text-secondary cursor-pointer transition-colors duration-300`}
          >
            <IoIosHome className="text-xl" />
            Beranda
          </li>
        </Link>

        <Link to="/seller/orders">
          <li
            className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium lg:w-[300px] ${
              location.pathname === "/seller/orders"
                ? "bg-gray-200 text-secondary"
                : "text-gray-500"
            } hover:bg-gray-100 hover:text-secondary cursor-pointer transition-colors duration-300`}
          >
            <RiFileList2Line className="text-xl" />
            Pesanan
          </li>
        </Link>

        <Link to="/seller/setting">
          <li
            className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium lg:w-[300px] ${
              location.pathname === "/seller/setting"
                ? "bg-gray-200 text-secondary"
                : "text-gray-500"
            } hover:bg-gray-100 hover:text-secondary cursor-pointer transition-colors duration-300`}
          >
            <IoIosSettings className="text-xl" />
            Pengaturan
          </li>
        </Link>
      </ul>

      {/* SIDEMENU MOBILE */}
      <div className="md:hidden border-b border-gray-200 overflow-x-scroll">
        <nav className="-mb-px flex gap-6" aria-label="Tabs">
          <Link
            to="/seller/dashboard"
            className={`inline-flex shrink-0 items-center gap-2 border-b-2 ${
              location.pathname === "/seller/dashboard"
                ? "border-secondary text-secondary"
                : "border-transparent"
            } hover:border-secondary hover:text-secondary px-1 pb-4 text-sm font-medium`}
          >
            <IoIosHome className="text-lg" />
            Beranda
          </Link>

          <Link
            to="/seller/orders"
            className={`inline-flex shrink-0 items-center gap-2 border-b-2 ${
              location.pathname === "/seller/orders"
                ? "border-secondary text-secondary"
                : "border-transparent"
            } hover:border-secondary hover:text-secondary px-1 pb-4 text-sm font-medium`}
          >
            <RiFileList2Line className="text-lg" />
            Pesanan
          </Link>

          <Link
            to="/seller/setting"
            className={`inline-flex shrink-0 items-center gap-2 border-b-2 ${
              location.pathname === "/seller/setting"
                ? "border-secondary text-secondary"
                : "border-transparent"
            } hover:border-secondary hover:text-secondary px-1 pb-4 text-sm font-medium`}
          >
            <IoIosSettings className="text-lg" />
            Pengaturan
          </Link>
        </nav>
      </div>
    </>
  );
}
