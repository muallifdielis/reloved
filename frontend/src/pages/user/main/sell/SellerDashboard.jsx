import React from "react";
import { Link } from "react-router-dom";

export default function SellerDashboard() {
  return (
    <div className="py-0 px-4 mx-auto bg-gray-25">
      {/* Title Section */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 md:mt-3">
          <h2 className="font-semibold text-2xl text-black">
            Selamat datang John!
          </h2>
          <p className="text-lg text-gray-500">
            Berikut adalah status toko anda
          </p>
        </div>
      </div>

      {/* Informasi Rekening dan Pendapatan */}
      <div className="bg-white p-4 rounded-xl border border-secondary mt-4 mb-6 flex flex-col gap-3 shadow-sm">
        <div>
          <p className="text-gray-600 text-sm">No. Rekening</p>
          <p className="font-medium text-lg">00010112345</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Total Pendapatan</p>
          <p className="font-medium text-lg">Rp 100000</p>
        </div>
        <button className="bg-primary hover:bg-primaryDark text-black font-medium px-6 py-2 rounded-lg self-end">
          Tarik Saldo
        </button>
        <p className="text-xs text-gray-500 self-end">*min. saldo Rp 10.000</p>
      </div>

      {/* Produk Pesanan */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Produk Pesanan</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link to="/seller/orders">
            <img
              src="https://picsum.photos/100"
              alt="Product Image 1"
              className="w-40 h-40 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition duration-300"
            />
          </Link>
          <Link to="/seller/orders">
            <img
              src="https://picsum.photos/100"
              alt="Product Image 2"
              className="w-40 h-40 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition duration-300"
            />
          </Link>
        </div>
      </div>

      {/* Produk Saya */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-2">Produk Saya</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Gambar Produk */}
          <Link to="/seller/dashboard">
            <img
              src="https://picsum.photos/100"
              alt="Product Image 5"
              className="w-40 h-40 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition duration-300"
            />
          </Link>
          <Link to="/seller/dashboard">
            <img
              src="https://picsum.photos/100"
              alt="Product Image 6"
              className="w-40 h-40 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition duration-300"
            />
          </Link>
          <Link to="/seller/dashboard">
            <img
              src="https://picsum.photos/100"
              alt="Product Image 7"
              className="w-40 h-40 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
