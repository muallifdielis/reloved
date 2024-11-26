import React, { useState } from "react";
import { Link } from "react-router-dom";
import TitleSection from "../../../components/common/TitleSection";
import Card from "../../../components/common/Card";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";

export default function Products() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm text-accent mb-6 px-6 py-4 bg-white md:px-8 lg:px-12">
        <Link to="/" className="hover:underline hover:text-secondary">
          Beranda
        </Link>
        <FiChevronRight className="text-secondary inline mx-1" />
        <span className="text-gray-800 font-semibold">Katalog Produk</span>
      </nav>

      {/* Title Section */}
      <section className="px-6 pb-2 pt-0 md:px-8">
        <TitleSection title="Katalog Produk" />
      </section>

      {/* Filter & Sort */}
      <section className="flex justify-between px-10 py-6 md:px-12 lg:px-12 relative">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center px-5 py-2 bg-white text-black shadow-md rounded-full ring-2 ring-secondary hover:bg-primary hover:text-black hover:ring-transparent text-sm"
          >
            <span className="mr-2">Kategori</span>
            <FiChevronDown />
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute left-0 z-30 mt-2 w-28 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg">
              <div className="p-2">
                <button
                  onClick={() => console.log("Pria selected")}
                  className="block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                >
                  Pria
                </button>
                <button
                  onClick={() => console.log("Wanita selected")}
                  className="block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                >
                  Wanita
                </button>
              </div>
            </div>
          )}
        </div>

        <button className="flex items-center px-5 py-2 bg-white text-black shadow-md rounded-full ring-2 ring-secondary hover:bg-primary hover:text-black hover:ring-transparent text-sm">
          <BiSortAlt2 className="mr-2" />
          Sortir
        </button>
      </section>

      <section className="px-4 md:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 gap-6 mx-auto justify-center md:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:px-0 lg:w-full">
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
        </div>
      </section>
    </div>
  );
}
