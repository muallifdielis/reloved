import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { LuUserX2 } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";

export default function SideMenu() {
  const location = useLocation();

  return (
    <>
      {/* SIDEMENU */}
      <ul className="hidden md:flex md:w-6/12 lg:w-4/12 flex-col gap-2">
        <Link to="/settings/edit">
          <li
            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium ${
              location.pathname === "/settings/edit"
                ? "bg-gray-100 text-secondary"
                : "text-gray-500"
            } hover:bg-gray-100 hover:text-secondary cursor-pointer transition-colors duration-300`}
          >
            <FaRegEdit className="text-xl" />
            Ubah profil
          </li>
        </Link>

        <Link to="/settings/password">
          <li
            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium ${
              location.pathname === "/settings/password"
                ? "bg-gray-100 text-secondary"
                : "text-gray-500"
            } hover:bg-gray-100 hover:text-secondary cursor-pointer transition-colors duration-300`}
          >
            <FiLock className="text-xl" />
            Ubah kata sandi
          </li>
        </Link>

        <li
          className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-500 hover:bg-gray-100 hover:text-red-600 cursor-pointer transition-colors duration-300"
          onClick={() => handleLogout()}
        >
          <LuUserX2 className="text-2xl" />
          Hapus akun
        </li>
      </ul>

      {/* SIDEMENU MOBILE */}

      <div className="md:hidden border-b border-gray-200 overflow-x-scroll">
        <nav className="-mb-px flex gap-6" aria-label="Tabs">
          <Link
            to="/settings/edit"
            className={`inline-flex shrink-0 items-center gap-2 border-b-2 ${
              location.pathname === "/settings/edit"
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-500"
            } px-1 pb-4 text-sm font-medium hover:border-secondary hover:text-secondary`}
            aria-current="page"
          >
            <FaRegEdit className="text-lg" />
            Ubah profil
          </Link>

          <Link
            to="/settings/password"
            className={`inline-flex shrink-0 items-center gap-2 border-b-2 ${
              location.pathname === "/settings/password"
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-500"
            } px-1 pb-4 text-sm font-medium hover:border-secondary hover:text-secondary`}
          >
            <FiLock className="text-lg" />
            Ubah kata sandi
          </Link>

          <a
            href="#"
            className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-red-400 hover:text-red-600"
          >
            <LuUserX2 className="text-xl" />
            Hapus akun
          </a>
        </nav>
      </div>
    </>
  );
}
