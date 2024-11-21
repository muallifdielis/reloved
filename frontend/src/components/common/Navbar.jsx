import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IoSearchOutline,
  IoMenu,
  IoClose,
  IoLogOutOutline,
} from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export default function Navbar() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }

    if (isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="sticky -top-1 z-50 bg-white py-4 shadow-md">
      <div className="container flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          {/* HAMBURGER MENU */}
          <div className="md:hidden">
            <button onClick={toggleDrawer}>
              <IoMenu className="text-3xl" />
            </button>
          </div>
          {/* LOGO BRAND */}
          <Link to="/">
            <h1 className="font-title text-2xl md:text-3xl">
              R<span className="text-secondary">e</span>Loved
              <span className="text-secondary">.</span>
            </h1>
          </Link>
        </div>

        {/* SEARCH BAR */}
        <div className="relative hidden lg:block w-5/12">
          <IoSearchOutline className="absolute top-1/2 left-3 -translate-y-1/2 opacity-50 text-xl" />

          <input
            type="search"
            placeholder="Search..."
            className="bg-background/50 rounded-xl pl-9 pr-2 w-full py-2 focus:outline-secondary"
          />
        </div>

        <div className="flex flex-row items-center gap-1 md:gap-3">
          <button className="lg:hidden">
            <IoSearchOutline className="text-3xl hover:text-secondary transition-colors duration-200" />
          </button>

          {/* UNAUTHENTICATED */}
          {/* <Link to="/login">
            <button className="bg-secondary/25 font-bold rounded-lg py-1 px-9 hidden md:block">
              Login
            </button>
          </Link>
          <p className="text-2xl text-primary hidden md:block">•</p>
          <Link to="/signUp">
            <button className="bg-primary font-bold rounded-lg py-1 px-9 hidden md:block">
              Sign Up
            </button>
          </Link> */}

          {/* AUTHENTICATED */}
          <Link to="/orders" className="hidden md:block">
            <h4 className="text-xl font-medium cursor-pointer hover:text-secondary transition-colors duration-200">
              Jual
            </h4>
          </Link>
          <Link to="/">
            <GoHeart className="text-3xl cursor-pointer hover:text-secondary transition-colors duration-200" />
          </Link>
          <Link to="/cart" className="relative cursor-pointer">
            <HiOutlineShoppingBag className="text-3xl hover:text-secondary transition-colors duration-200" />
            <div className="absolute -top-1 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              1
            </div>
          </Link>
          <div className="relative hidden md:block">
            <div
              className="w-11 max-h-11 cursor-pointer"
              onClick={toggleDropdown}
            >
              <img
                src="https://picsum.photos/800"
                alt="Profile Pic"
                className="rounded-full object-cover w-full h-full"
              />
            </div>

            {/* DROPDOWN */}
            {isDropdownOpen && (
              <>
                <div
                  className="fixed top-0 left-0 w-full h-full"
                  onClick={toggleDropdown}
                ></div>
                <div className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg">
                  <div className="p-2">
                    <Link
                      to="/profile"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      Profil
                    </Link>

                    <Link
                      to="/purchases"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      Pembelian
                    </Link>

                    <Link
                      to="/settings/edit"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      Pengaturan
                    </Link>
                  </div>

                  <div className="p-2">
                    <Link
                      to="/"
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      Keluar
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isDrawerOpen && (
        <>
          {/* OVERLAY */}
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
            onClick={toggleDrawer}
          ></div>

          <div className="fixed top-0 left-0 w-3/5 h-full bg-white z-50">
            <div className="px-4 py-6">
              <div className="flex flex-row items-center justify-between px-4 py-2">
                <Link to="/">
                  <h1 className="font-title text-2xl">
                    R<span className="text-secondary">e</span>Loved
                    <span className="text-secondary">.</span>
                  </h1>
                </Link>
                <button onClick={toggleDrawer}>
                  <IoClose className="text-3xl hover:text-secondary transition-colors duration-200" />
                </button>
              </div>

              {/* UNAUTHENTICATED */}
              <ul className="mt-6 space-y-1">
                <li>
                  <Link
                    to="#"
                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary"
                  >
                    Sign Up
                  </a>
                </li>

                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-secondary">
                      <span className="text-sm font-medium"> Kategori </span>

                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                      <li>
                        <a
                          href="#"
                          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary"
                        >
                          Pria
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary"
                        >
                          Wanita
                        </a>
                      </li>
                    </ul>
                  </details>
                </li>

                <li>
                  <Link
                    to="/orders"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary"
                  >
                    Jual
                  </Link>
                </li>

                <li>
                  <Link
                    to="/purchases"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary"
                  >
                    Pembelian
                  </Link>
                </li>

                <li>
                  <Link
                    to="/settings/edit"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary"
                  >
                    Pengaturan
                  </Link>
                </li>
              </ul>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
              <Link
                to="/profile"
                className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
              >
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="size-10 rounded-full object-cover"
                />

                <div>
                  <p className="text-xs">
                    <strong className="block font-medium">
                      Eric Frusciante
                    </strong>

                    <span>@eric </span>
                  </p>
                </div>
              </Link>
            </div>

            <div className="sticky inset-x-0 top-0 z-50 flex justify-between border-t border-gray-100 bg-white px-4 py-2">
              <p className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 cursor-pointer w-full">
                <IoLogOutOutline className="text-lg" /> Keluar
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
