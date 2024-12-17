import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IoSearchOutline,
  IoMenu,
  IoClose,
  IoLogOutOutline,
} from "react-icons/io5";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Danger from "../modals/Danger";
import { showSuccessToast } from "./Toast";
import useAuthStore from "../../store/authStore";
import useCartStore from "../../store/cartStore";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { getCurrentUser, currentUser, logout } = useAuthStore();
  const { cart, getCart } = useCartStore();
  const [searchValue, setSearchValue] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsDropdownOpen(false);
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }

    if (isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchUser = async () => {
      await getCurrentUser();
    };

    fetchUser();
  }, [getCurrentUser]);

  useEffect(() => {
    if (currentUser && localStorage.getItem("token")) {
      getCart();
    }
  }, [currentUser]);

  useEffect(() => {
    // Ambil query dari URL menggunakan URLSearchParams
    const params = new URLSearchParams(location.search);
    const query = params.get("query");

    if (query) {
      setSearchValue(query); // Set nilai query ke state
    } else {
      setSearchValue(""); // Set ke string kosong jika tidak ada query
    }
  }, [location.search]); // Dependensi berubah ketika URL berubah

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();

    if (!query) {
      return;
    }

    // Navigasi dengan query baru
    navigate(`/search-results?query=${query}`);
  };

  const handleLogout = () => {
    logout();
    showSuccessToast("Berhasil keluar, sampai jumpa kembali!");
    setIsModalOpen(false);
    navigate("/");
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
          <Link to="/" className={`${showSearch ? "hidden" : "block"}`}>
            <h1 className="font-title text-2xl md:text-3xl">
              R<span className="text-secondary">e</span>Loved
              <span className="text-secondary">.</span>
            </h1>
          </Link>
        </div>

        {/* SEARCH BAR */}
        <form
          className={`relative ${
            showSearch ? "block w-full" : "hidden"
          } lg:block w-5/12`}
          onSubmit={handleSearch}
        >
          <IoSearchOutline className="absolute top-1/2 left-3 -translate-y-1/2 opacity-50 text-xl" />

          <input
            type="search"
            name="search"
            id="search"
            autoComplete="off"
            autoCorrect="off"
            placeholder="Cari..."
            className="bg-background/50 rounded-xl pl-9 pr-2 w-full py-2 focus:outline-secondary"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>

        <div className="flex flex-row items-center gap-1 md:gap-3">
          <button className="lg:hidden" onClick={toggleSearch}>
            <IoSearchOutline className="text-3xl hover:text-secondary transition-colors duration-200" />
          </button>

          {!showSearch && (
            <>
              {!currentUser ? (
                <>
                  {/* UNAUTHENTICATED */}

                  <Link to="/login">
                    <button className="bg-secondary/25 font-bold rounded-lg py-1 px-9 hidden md:block">
                      Login
                    </button>
                  </Link>
                  <p className="text-2xl text-primary hidden md:block">•</p>
                  <Link to="/signUp">
                    <button className="bg-primary font-bold rounded-lg py-1 px-9 block">
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : currentUser?.role === "admin" ? (
                <>
                  {/* ADMIN */}
                  <Link to="/admin/dashboard">
                    <h4 className="bg-primary hover:bg-primaryDark transition-colors duration-200 font-medium rounded-lg py-2 px-4 flex items-center justify-center gap-2">
                      Halaman Admin{" "}
                      <FaArrowUpRightFromSquare className="text-sm" />
                    </h4>
                  </Link>
                </>
              ) : (
                <>
                  {/* AUTHENTICATED */}
                  <Link to="/seller/dashboard" className="hidden md:block">
                    <h4 className="text-xl font-medium cursor-pointer hover:text-secondary transition-colors duration-200">
                      Jual
                    </h4>
                  </Link>
                  <Link to={`/profile/${currentUser._id}?tab=likes`}>
                    <GoHeart className="text-3xl cursor-pointer hover:text-secondary transition-colors duration-200" />
                  </Link>
                  <Link to="/cart" className="relative cursor-pointer">
                    <HiOutlineShoppingBag className="text-3xl hover:text-secondary transition-colors duration-200" />
                    <div className="absolute -top-1 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {cart.length > 0 ? cart.length : 0}{" "}
                      {/* Jumlah item di keranjang */}
                    </div>
                  </Link>
                  <div className="relative hidden md:block">
                    <div className="cursor-pointer" onClick={toggleDropdown}>
                      <img
                        src={currentUser?.image || "/avatar.png"}
                        alt="Profile Pic"
                        className="rounded-full object-cover w-11 h-11"
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
                              to={`/profile/${currentUser._id}`}
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
                            <button
                              onClick={toggleModal}
                              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                            >
                              Keluar
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </>
          )}
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
                    to="/"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary"
                  >
                    Beranda
                  </Link>
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
                        <Link
                          to="/products?category=pria"
                          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary"
                        >
                          Pria
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/products?category=wanita"
                          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary"
                        >
                          Wanita
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>

                {!currentUser ? (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary"
                      >
                        Login
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/signUp"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {/* AUTHENTICATED */}
                    <li>
                      <Link
                        to="/seller/dashboard"
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
                  </>
                )}
              </ul>
            </div>

            {currentUser && (
              <>
                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                  <Link
                    to={`/profile/${currentUser._id}`}
                    className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
                  >
                    <img
                      alt=""
                      src={currentUser.image || "/avatar.png"}
                      className="size-10 rounded-full object-cover"
                    />

                    <Link to="/profile">
                      <p className="text-xs">
                        <strong className="block font-medium">
                          {currentUser?.name}
                        </strong>

                        <span className="text-gray-500">
                          @{currentUser?.username}
                        </span>
                      </p>
                    </Link>
                  </Link>
                </div>

                <div className="sticky inset-x-0 top-0 z-50 flex justify-between border-t border-gray-100 bg-white px-4 py-2">
                  <button
                    className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 cursor-pointer w-full"
                    onClick={toggleModal}
                  >
                    <IoLogOutOutline className="text-lg" /> Keluar
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* LOGOUT MODAL */}
      {isModalOpen && (
        <Danger
          title="Apakah Anda yakin ingin keluar?"
          onClose={toggleModal}
          onSubmit={handleLogout}
        />
      )}
    </div>
  );
}
