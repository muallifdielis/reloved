import React from "react";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <div className="bg-background/50 w-full min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm text-accent mb-6 p-4 md:px-[68px] lg:px-[74px] bg-white">
        <Link to="/" className="hover:underline hover:text-secondary">
          Beranda
        </Link>{" "}
        &gt; <span className="font-semibold">Keranjang</span>
      </nav>

      {/* Daftar Produk */}
      <div className="px-4 mx-auto min-h-screen md:px-[68px] lg:px-[74px] flex flex-col max-w-screen-2xl w-full">
        {/* Produk Pertama */}
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow p-3 mb-4 hover:bg-gray-100 relative">
          {/* Gambar Produk */}
          <div className="w-full md:w-[165px] h-full md:h-[165px] rounded-lg overflow-hidden mb-3 md:mb-0 md:mr-4">
            <img
              src="https://picsum.photos/100"
              alt="Produk"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Detail Produk */}
          <div className="flex-grow flex flex-col items-start mb-3 md:mb-0 md:h-[120px] md:py-1 md:w-3/4">
            <h2 className="font-semibold text-lg md:text-base">
              Lorem Ipsum dolor sit
            </h2>
            <p className="text-sm font-medium text-gray-600">1 x Rp 435.000</p>
          </div>

          {/* Tombol */}
          <div className="flex md:flex-row gap-2 w-full md:w-auto md:absolute md:bottom-4 md:right-4 md:mb-0">
            <button className="flex items-center bg-white text-black border border-secondary rounded-md px-5 py-2 hover:bg-primaryDark hover:text-black justify-center">
              <span className="mr-2">
                <GoTrash />
              </span>
              Hapus
            </button>
            <button className="bg-primary text-black rounded-md px-5 py-2 hover:bg-primaryDark">
              Lanjutkan pembelian
            </button>
          </div>
        </div>

        {/* Produk Kedua */}
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow p-3 mb-4 hover:bg-gray-100 relative">
          {/* Gambar Produk */}
          <div className="w-full md:w-[165px] h-full md:h-[165px] rounded-lg overflow-hidden mb-3 md:mb-0 md:mr-4">
            <img
              src="https://picsum.photos/100"
              alt="Produk"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Detail Produk */}
          <div className="flex-grow flex flex-col items-start mb-3 md:mb-0 md:h-[120px] md:py-1 md:w-3/4">
            <h2 className="font-semibold text-lg md:text-base">
              Sed do eiusmod tempor
            </h2>
            <p className="text-sm font-medium text-gray-600">2 x Rp 250.000</p>
          </div>

          {/* Tombol */}
          <div className="flex md:flex-row gap-2 w-full md:w-auto md:absolute md:bottom-4 md:right-4 md:mb-0">
            <button className="flex items-center bg-white text-black border border-secondary rounded-md px-5 py-2 hover:bg-primaryDark hover:text-black justify-center">
              <span className="mr-2">
                <GoTrash />
              </span>
              Hapus
            </button>
            <button className="bg-primary text-black rounded-md px-5 py-2 hover:bg-primaryDark">
              Lanjutkan pembelian
            </button>
          </div>
        </div>

        {/* Produk Ketiga */}
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow p-3 mb-4 hover:bg-gray-100 relative">
          {/* Gambar Produk */}
          <div className="w-full md:w-[165px] h-full md:h-[165px] rounded-lg overflow-hidden mb-3 md:mb-0 md:mr-4">
            <img
              src="https://picsum.photos/100"
              alt="Produk"
              className="w-full h-full object-cover rounded-lg"
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
          <div className="flex md:flex-row gap-2 w-full md:w-auto md:absolute md:bottom-4 md:right-4 md:mb-0">
            <button className="flex items-center bg-white text-black border border-secondary rounded-md px-5 py-2 hover:bg-primaryDark hover:text-black justify-center">
              <span className="mr-2">
                <GoTrash />
              </span>
              Hapus
            </button>
            <button className="bg-primary text-black rounded-md px-5 py-2 hover:bg-primaryDark">
              Lanjutkan pembelian
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
