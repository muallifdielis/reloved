import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuthStore from "../../../../store/authStore";
import { FiChevronDown } from "react-icons/fi";

export default function SellerSetting() {
  const { currentUser } = useAuthStore();
  const [isEdited, setIsEdited] = useState(false);
  const [bankDropdown, setBankDropdown] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");

  const handleSelectBank = (bank) => {
    setSelectedBank(bank);
    setBankDropdown(false);
  };

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
            <p className="font-semibold">{currentUser?.name}</p>
            <Link to="/settings/edit">
              <FaRegEdit className="text-xl font-bold hover:text-secondary cursor-pointer" />
            </Link>
          </div>
          <p>{currentUser?.phone}</p>
          <p className="mt-3">
            {currentUser?.address
              ? currentUser?.address
              : "Anda belum memasukkan alamat"}
          </p>
        </div>
      </div>

      <form>
        {/* Select Nama Bank */}
        <div className="container mt-4">
          <h3 className="font-medium text-lg mb-1">Bank</h3>
          <div className="relative">
            <button
              onClick={() => setBankDropdown(!bankDropdown)}
              disabled={!isEdited}
              type="button"
              className="w-full p-3 mb-2 sm:p-4 lg:p-3 border border-gray-300 rounded-xl text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary flex justify-between items-center"
            >
              <span className="text-gray-500">
                {selectedBank || "Pilih Bank"}
              </span>
              <FiChevronDown className="text-gray-500" />
            </button>
            {bankDropdown && (
              <div className="absolute left-0 z-30 w-full divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white shadow-lg">
                <div className="p-2">
                  <button
                    onClick={() => handleSelectBank("BCA")}
                    type="button"
                    className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                  >
                    BCA
                  </button>
                  <button
                    onClick={() => handleSelectBank("Mandiri")}
                    type="button"
                    className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                  >
                    Mandiri
                  </button>
                  <button
                    onClick={() => handleSelectBank("BRI")}
                    type="button"
                    className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                  >
                    BRI
                  </button>
                  <button
                    onClick={() => handleSelectBank("BNI")}
                    type="button"
                    className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                  >
                    BNI
                  </button>
                  <button
                    onClick={() => handleSelectBank("Permata")}
                    type="button"
                    className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                  >
                    Permata
                  </button>
                  <button
                    onClick={() => handleSelectBank("CIMB")}
                    type="button"
                    className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                  >
                    CIMB
                  </button>
                  <button
                    onClick={() => handleSelectBank("Danamon")}
                    type="button"
                    className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                  >
                    Danamon
                  </button>
                </div>
              </div>
            )}
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
            disabled={!isEdited}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Tombol Simpan, Edit, Hapus */}
        <div className="flex flex-row gap-4 justify-end px-4 mt-6 mx-auto items-center">
          {isEdited && (
            <>
              {/* Tombol Simpan */}
              <button className="bg-primary px-4 lg:px-5 py-2.5 font-medium rounded-xl hover:bg-primaryDark transition-colors duration-300 w-full lg:w-auto">
                Simpan
              </button>

              {/* Tombol Hapus */}
              <button
                type="button"
                className="bg-transparent border border-accent hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors duration-300 px-4 lg:px-5 py-2.5 rounded-xl w-full lg:w-auto"
              >
                Hapus
              </button>
            </>
          )}

          {/* Tombol Edit */}
          <button
            type="button"
            className="bg-accent hover:bg-accentHover text-white transition-colors duration-300 px-4 lg:px-5 py-2.5 rounded-xl w-full lg:w-auto"
            onClick={() => setIsEdited(!isEdited)}
          >
            {isEdited ? "Batal" : "Ubah"}
          </button>
        </div>
      </form>
    </div>
  );
}
