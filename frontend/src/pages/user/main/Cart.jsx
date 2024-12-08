import React from "react";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <div className="bg-background/50 w-full min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6 p-4 md:px-[68px] lg:px-[74px] bg-white">
        <Link to="/" className="hover:underline hover:text-secondary">
          Beranda
        </Link>{" "}
        <span className="text-secondary font-medium">{">"}</span>{" "}
        <span className="font-semibold">Keranjang</span>
      </nav>

      {/* Daftar Produk */}
      <div className="px-4 mx-auto min-h-screen md:px-[68px] lg:px-[74px] flex flex-col max-w-screen-2xl w-full">
        {/* Produk Pertama */}
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow p-4 mb-4 hover:bg-gray-100 relative">
          <div className="w-full md:w-[165px] h-full md:h-[165px] rounded-xl overflow-hidden mb-3 md:mb-0 md:mr-4">
            <img
              src="https://picsum.photos/100"
              alt="Produk"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Detail Produk */}
          <div className="flex-grow flex flex-col items-start mb-3 md:mb-0 md:h-[120px] md:py-1 md:w-3/4">
            <h2 className="font-semibold text-lg md:text-base">
              Ut enim ad minim veniam
            </h2>
            <p className="text-sm font-medium text-gray-600">1 x Rp 120.000</p>
          </div>

          {/* Tombol */}
          <div className="flex md:flex-row gap-4 md:gap-4 lg:gap-4 w-full md:w-auto md:absolute md:bottom-4 md:right-4 md:mb-0">
            <button className="flex items-center bg-white text-black border border-secondary rounded-xl px-4 md:px-5 lg:px-5 py-2 hover:bg-red-600 hover:border-red-600 hover:text-white justify-center flex-shrink-0">
              <span className="mr-2">
                <GoTrash />
              </span>
              Hapus
            </button>
            <Link to="/checkout">
              <button className="bg-primary text-black rounded-xl px-4 md:px-5 lg:px-5 py-2 hover:bg-primaryDark flex-shrink-0">
                Lanjutkan pembelian
              </button>
            </Link>
          </div>
        </div>

        {/* Produk Kedua */}
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow p-4 mb-4 hover:bg-gray-100 relative">
          <div className="w-full md:w-[165px] h-full md:h-[165px] rounded-xl overflow-hidden mb-3 md:mb-0 md:mr-4">
            <img
              src="https://picsum.photos/100"
              alt="Produk"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Detail Produk */}
          <div className="flex-grow flex flex-col items-start mb-3 md:mb-0 md:h-[120px] md:py-1 md:w-3/4">
            <h2 className="font-semibold text-lg md:text-base">
              Ut enim ad minim veniam
            </h2>
            <p className="text-sm font-medium text-gray-600">1 x Rp 120.000</p>
          </div>

          {/* Tombol */}
          <div className="flex md:flex-row gap-4 md:gap-4 lg:gap-4 w-full md:w-auto md:absolute md:bottom-4 md:right-4 md:mb-0">
            <button className="flex items-center bg-white text-black border border-secondary rounded-xl px-4 md:px-5 lg:px-5 py-2 hover:bg-red-600 hover:border-red-600 hover:text-white justify-center flex-shrink-0">
              <span className="mr-2">
                <GoTrash />
              </span>
              Hapus
            </button>
            <button className="bg-primary text-black rounded-xl px-4 md:px-5 lg:px-5 py-2 hover:bg-primaryDark flex-shrink-0">
              Lanjutkan pembelian
            </button>
          </div>
        </div>

        {/* Produk Ketiga */}
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow p-4 mb-4 hover:bg-gray-100 relative">
          <div className="w-full md:w-[165px] h-full md:h-[165px] rounded-xl overflow-hidden mb-3 md:mb-0 md:mr-4">
            <img
              src="https://picsum.photos/100"
              alt="Produk"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Detail Produk */}
          <div className="flex-grow flex flex-col items-start mb-3 md:mb-0 md:h-[120px] md:py-1 md:w-3/4">
            <h2 className="font-semibold text-lg md:text-base">
              Ut enim ad minim veniam
            </h2>
            <p className="text-sm font-medium text-gray-600">1 x Rp 120.000</p>
          </div>

          {/* Tombol */}
          <div className="flex md:flex-row gap-4 md:gap-4 lg:gap-4 w-full md:w-auto md:absolute md:bottom-4 md:right-4 md:mb-0">
            <button className="flex items-center bg-white text-black border border-secondary rounded-xl px-4 md:px-5 lg:px-5 py-2 hover:bg-red-600 hover:border-red-600 hover:text-white justify-center flex-shrink-0">
              <span className="mr-2">
                <GoTrash />
              </span>
              Hapus
            </button>
            <button className="bg-primary text-black rounded-xl px-4 md:px-5 lg:px-5 py-2 hover:bg-primaryDark flex-shrink-0">
              Lanjutkan pembelian
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
