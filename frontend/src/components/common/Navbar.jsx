import { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearchOutline, IoMenu, IoClose } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

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
            <h1 className="font-title text-2xl">
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
            className="bg-background/50 rounded-xl pl-9 pr-2 w-full py-2 focus:outline-secondary caret-secondary"
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
          <Link to="/" className="hidden md:block">
            <h4 className="text-xl font-medium cursor-pointer hover:text-secondary transition-colors duration-200">
              Jual
            </h4>
          </Link>
          <Link to="/">
            <GoHeart className="text-3xl cursor-pointer hover:text-secondary transition-colors duration-200" />
          </Link>
          <Link to="/" className="relative cursor-pointer">
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
                      to="/"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    >
                      Profil
                    </Link>

                    <Link
                      to="/"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    >
                      Pembelian
                    </Link>

                    <Link
                      to="/"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
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

          {/* SIDEBAR */}
          <div className="fixed top-0 left-0 w-3/5 h-full bg-white z-50">
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

            <div className="px-4">
              {/* UNAUTHENTICATED */}
              {/* <Link to="/">
                <h4 className="font-medium cursor-pointer hover:text-secondary transition-colors duration-200 pb-2">
                  Login
                </h4>
              </Link>
              <Link to="/">
                <h4 className="font-medium cursor-pointer hover:text-secondary transition-colors duration-200 border-y border-background py-2">
                  Sign Up
                </h4>
              </Link>
              <div>
                <h4 className="font-medium py-2">Kategori</h4>
                <ul>
                  <Link to="/">
                    <li className="font-medium cursor-pointer hover:text-secondary transition-colors duration-200 ml-3">
                      • Wanita
                    </li>
                  </Link>
                  <Link to="/">
                    <li className="font-medium cursor-pointer hover:text-secondary transition-colors duration-200 ml-3">
                      • Pria
                    </li>
                  </Link>
                </ul>
              </div> */}

              {/* AUTHENTICATED */}
              <Link to="/" className="flex flex-row items-center gap-3">
                <img
                  src="https://picsum.photos/200"
                  alt="Profile Pic"
                  className="rounded-full object-cover w-8 h-8"
                />
                <h4 className="font-medium cursor-pointer hover:text-secondary transition-colors duration-200 pb-2">
                  Profil
                </h4>
              </Link>
              <Link to="/">
                <h4 className="font-medium cursor-pointer hover:text-secondary transition-colors duration-200 border-t border-background py-2 mt-3">
                  Pembelian
                </h4>
              </Link>
              <Link to="/">
                <h4 className="font-medium cursor-pointer hover:text-secondary transition-colors duration-200 border-y border-background py-2">
                  Pengaturan
                </h4>
              </Link>
              <Link to="/">
                <h4 className="font-medium cursor-pointer hover:text-secondary transition-colors duration-200 pt-2">
                  Keluar
                </h4>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
