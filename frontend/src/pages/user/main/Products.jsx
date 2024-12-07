import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import Link here
import { FiChevronDown } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import TitleSection from "../../../components/common/TitleSection";
import Card from "../../../components/common/Card";

export default function Products() {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Menyimpan kategori dan sortir dari query params
  const location = useLocation();
  const navigate = useNavigate();

  const category =
    new URLSearchParams(location.search).get("category") || "semua";
  const sortOption =
    new URLSearchParams(location.search).get("sort") || "terbaru";

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  // Handler untuk mengubah kategori
  const handleCategoryChange = (category) => {
    navigate(`/products?category=${category}&sort=${sortOption}`);
    setIsCategoryDropdownOpen(false);
  };

  // Handler untuk mengubah opsi sortir
  const handleSortChange = (option) => {
    navigate(`/products?category=${category}&sort=${option}`);
    setIsSortDropdownOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm text-accent mb-6 px-6 py-4 md:px-8 lg:px-12">
        <Link to="/" className="hover:underline hover:text-secondary">
          Beranda
        </Link>{" "}
        <span className="text-secondary font-medium">{">"}</span>{" "}
        <span className="text-gray-800 font-semibold">Katalog Produk</span>
      </nav>

      {/* Title Section */}
      <section className="px-6 pb-2 pt-0 md:px-8">
        <TitleSection
          title={`Katalog Produk ${
            category === "pria" ? "Pria" : category === "wanita" ? "Wanita" : ""
          }`}
        />
      </section>

      {/* Filter & Sort */}
      <section className="flex justify-between px-10 py-6 md:px-12 lg:px-12 relative">
        {/* Dropdown Kategori */}
        <div className="relative">
          <button
            onClick={toggleCategoryDropdown}
            className="flex items-center px-5 py-2 bg-white text-black shadow-md rounded-full ring-2 ring-secondary hover:bg-primary hover:ring-primary hover:text-black text-sm"
          >
            <span className="mr-2">Kategori</span>
            <FiChevronDown />
          </button>
          {isCategoryDropdownOpen && (
            <div className="absolute left-0 z-30 mt-2 w-28 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg">
              <div className="p-2">
                <button
                  onClick={() => handleCategoryChange("semua")}
                  className={`block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary ${
                    category === "semua" && "bg-gray-50 text-secondary"
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => handleCategoryChange("pria")}
                  className={`block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary ${
                    category === "pria" && "bg-gray-50 text-secondary"
                  }`}
                >
                  Pria
                </button>
                <button
                  onClick={() => handleCategoryChange("wanita")}
                  className={`block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary ${
                    category === "wanita" && "bg-gray-50 text-secondary"
                  }`}
                >
                  Wanita
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dropdown Sortir */}
        <div className="relative">
          <button
            onClick={toggleSortDropdown}
            className="flex items-center px-5 py-2 bg-white text-black shadow-md rounded-full ring-2 ring-secondary hover:bg-primary hover:ring-primary hover:text-black text-sm"
          >
            <BiSortAlt2 className="mr-2" />
            Sortir
          </button>
          {isSortDropdownOpen && (
            <div className="absolute left-0 z-30 mt-2 w-28 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg">
              <div className="p-2">
                <button
                  onClick={() => handleSortChange("terbaru")}
                  className="block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                >
                  Terbaru
                </button>
                <button
                  onClick={() => handleSortChange("terlama")}
                  className="block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                >
                  Terlama
                </button>
                <button
                  onClick={() => handleSortChange("termurah")}
                  className="block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                >
                  Termurah
                </button>
                <button
                  onClick={() => handleSortChange("termahal")}
                  className="block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                >
                  Termahal
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Produk (Menampilkan daftar produk) */}
      <section className="px-4 md:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 gap-6 mx-auto justify-center md:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:px-0 lg:w-full">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-full flex justify-center lg:scale-90">
              <Card
                product={{
                  name: `Produk ${index + 1}`,
                  price: 10000 * (index + 1),
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
