import React from "react"; 
import { GoTrash } from "react-icons/go";
import TitleSection from "../../../../components/common/TitleSection";
import { Link } from "react-router-dom";

export default function Orders() {
  return (
    <div className="py-0 px-4 mx-auto bg-gray-25">
      {/* Title Section */}
      <div className="container">
        <div className="text-center mt-2">
          <h1 className="text-2xl font-semibold text-gray-800 leading-tight">
            Daftar Pesanan Masuk
          </h1>
          <div className="w-28 h-1.5 bg-primaryDark  md:w-20 lg:w-24 mx-auto mt-2"></div>
        </div>
      </div>


      {/* TABS */}
      <div className="flex container mt-10 mb-5 overflow-x-auto">
        <div className="border-b border-gray-200 md:w-full">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            <a
              href="#"
              className="shrink-0 border-b-2 border-secondary px-1 pb-4 text-sm lg:text-base font-medium text-secondary"
              aria-current="page"
            >
              Semua <span className="text-xs">(2)</span>
            </a>
            <a
              href="#"
              className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm lg:text-base font-medium text-gray-500 hover:border-secondary hover:text-secondary"
            >
              Diproses <span className="text-xs">(1)</span>
            </a>
            <a
              href="#"
              className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm lg:text-base font-medium text-gray-500 hover:border-secondary hover:text-secondary"
            >
              Selesai <span className="text-xs">(1)</span>
            </a>
          </nav>
        </div>
      </div>

      {/* PURCHASES */}
      <div className="container flex flex-col gap-5">
        {/* PESANAN DIPROSES */}
        <div className="flex flex-col md:flex-row max-sm:items-center bg-white rounded-xl shadow p-4 gap-4 flex-1">
          <img
            src="https://picsum.photos/100"
            alt="Product Image"
            className="w-40 h-40 rounded-xl md:w-32 md:h-32" // Ukuran gambar di tablet
          />

          <div className="flex flex-col w-full">
            <h4 className="font-medium text-lg">Lorem ipsum dolor sit</h4>
            <p className="text-gray-600 text-sm font-medium">1 x Rp 435.000</p>
          </div>

          <div className="flex flex-wrap-reverse md:flex-wrap gap-3 md:flex-col lg:flex-row lg:justify-end max-lg:items-end md:gap-10 lg:gap-3 w-full">
            <p className="italic">Diproses</p>
            <div className="flex flex-col md:flex-row items-end md:justify-end w-full gap-3 lg:gap-5">
              <Link to="/orders/detail">
                <button className="bg-transparent border border-secondary hover:bg-primary hover:border-primary transition-colors duration-300 px-4 py-2 rounded-xl w-full max-md:mt-4">
                  Lihat detail
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* PESANAN SELESAI */}
        <div className="flex flex-col md:flex-row max-sm:items-center bg-white rounded-xl shadow p-4 gap-4 w-full">
          <img
            src="https://picsum.photos/100"
            alt="Product Image"
            className="w-40 h-40 rounded-xl md:w-32 md:h-32" // Ukuran gambar di tablet
          />

          <div className="flex flex-col w-full">
            <h4 className="font-medium text-lg">Lorem ipsum dolor sit</h4>
            <p className="text-gray-600 text-sm font-medium">1 x Rp 435.000</p>
          </div>

          <div className="flex flex-wrap-reverse md:flex-wrap gap-3 md:flex-col lg:flex-row lg:justify-end max-lg:items-end md:gap-10 lg:gap-3 w-full">
            <p className="italic">Selesai</p>
            <div className="flex flex-col md:flex-row items-end md:justify-end w-full gap-3 lg:gap-5">
              <Link to="/purchases/detail">
                <button className="bg-transparent border border-secondary hover:bg-primary hover:border-primary transition-colors duration-300 px-4 py-2 rounded-xl w-full max-md:mt-4">
                  Lihat detail
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
