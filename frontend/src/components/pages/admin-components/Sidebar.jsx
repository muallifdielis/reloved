import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* MOBILE BUTTON */}
      <div className="md:hidden flex items-center gap-2 px-5 py-5 bg-[#fcfcfc] sticky top-0 z-50">
        <button
          className="text-gray-500 hover:text-secondary"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-7"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <Link to="/admin/dashboard">
          <h1 className="font-title text-2xl md:text-3xl text-center">
            R<span className="text-secondary">e</span>Loved
            <span className="text-secondary">.</span>
          </h1>
        </Link>
      </div>

      {/* SIDEBAR */}
      <div
        className={`${
          isOpen ? "flex border-b shadow-md" : "hidden md:flex border-e"
        } fixed md:sticky top-16 md:top-0 md:h-screen flex-col justify-between bg-white w-full md:w-max lg:w-80 z-50`}
      >
        <div className="px-4 py-6">
          <Link to="/" className="hidden md:block">
            <h1 className="font-title text-2xl md:text-3xl text-center">
              R<span className="text-secondary">e</span>Loved
              <span className="text-secondary">.</span>
            </h1>
          </Link>

          <ul className="md:mt-6 space-y-1">
            <li>
              <Link
                to="/admin/dashboard"
                className={`block rounded-lg ${
                  location.pathname === "/admin/dashboard"
                    ? "bg-gray-100 text-secondary"
                    : "text-gray-500 hover:bg-gray-100 hover:text-secondary"
                } px-4 py-2 text-sm font-medium `}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/admin/users"
                className={`block rounded-lg ${
                  location.pathname === "/admin/users"
                    ? "bg-gray-100 text-secondary"
                    : "text-gray-500 hover:bg-gray-100 hover:text-secondary"
                } px-4 py-2 text-sm font-medium `}
              >
                Pengguna
              </Link>
            </li>

            <li>
              <Link
                to="/admin/category"
                className={`block rounded-lg ${
                  location.pathname === "/admin/category" ||
                  location.pathname === "/admin/category/form"
                    ? "bg-gray-100 text-secondary"
                    : "text-gray-500 hover:bg-gray-100 hover:text-secondary"
                } px-4 py-2 text-sm font-medium `}
              >
                Kategori
              </Link>
            </li>

            <li>
              <Link
                to="/admin/transactions"
                className={`block rounded-lg ${
                  location.pathname === "/admin/transactions" ||
                  location.pathname === "/admin/transaction/detail"
                    ? "bg-gray-100 text-secondary"
                    : "text-gray-500 hover:bg-gray-100 hover:text-secondary"
                } px-4 py-2 text-sm font-medium `}
              >
                Transaksi
              </Link>
            </li>

            <li className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-red-100 hover:text-red-600 cursor-pointer">
              Keluar
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a
            href="#"
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="size-9 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">Eric Frusciante</strong>

                <span> admin@gmail.com </span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
