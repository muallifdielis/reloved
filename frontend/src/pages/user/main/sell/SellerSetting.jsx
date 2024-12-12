import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SellerSetting() {
  return (
    <div className="py-0 px-0 lg:px-4 mx-0 bg-gray-25">
      {/* Title Section */}
      <div className="container">
        <div className="text-center mt-2">
          <h1 className="text-2xl font-semibold text-gray-800 leading-tight">
            Pengaturan
          </h1>
          <div className="w-28 h-1.5 bg-primaryDark md:w-20 lg:w-24 mx-auto mt-2"></div>
        </div>
      </div>

      {/* Alamat Penjemputan */}
      <div className="container mt-6">
        <h2 className="font-medium text-lg mb-2">Alamat Penjemputan</h2>
        <div className="p-4 border border-secondary rounded-xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="font-semibold">John Doe</p>
            <Link to="/settings/edit">
              <FaRegEdit className="text-xl font-bold hover:text-secondary cursor-pointer" />
            </Link>
          </div>
          <p>081234567890</p>
          <p className="mt-3">123 Street, City, Country</p>
        </div>
      </div>

      {/* Input No Rekening */}
      <div className="container mt-6">
        <label htmlFor="rekening" className="font-medium text-lg">
          No. Rekening Anda
        </label>
        <input
          id="rekening"
          type="text"
          placeholder="Masukkan Nomor Rekening Anda"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-secondary"
        />
      </div>

      {/* Tombol Simpan, Edit, Hapus */}
      <div className="flex flex-row gap-4 lg:justify-center px-4 mt-6 mx-auto items-center">
        {/* Tombol Simpan */}
        <button className="bg-primary px-4 lg:px-5 py-2.5 font-medium rounded-xl hover:bg-primaryDark transition-colors duration-300 w-full lg:w-auto">
          Simpan
        </button>

        {/* Tombol Edit */}
        <button className="bg-accent hover:bg-accentHover text-white transition-colors duration-300 px-4 lg:px-5 py-2.5 rounded-xl w-full lg:w-auto">
          Edit
        </button>

        {/* Tombol Hapus */}
        <button className="bg-transparent border border-accent hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors duration-300 px-4 lg:px-5 py-2.5 rounded-xl w-full lg:w-auto">
          Hapus
        </button>
      </div>
    </div>
  );
}
