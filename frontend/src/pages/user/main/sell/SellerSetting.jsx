import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuthStore from "../../../../store/authStore";
import { FiChevronDown } from "react-icons/fi";
import { useSellerStore } from "../../../../store/sellerStore";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common/Toast";
import Danger from "../../../../components/modals/Danger";

import LoadingSpinner from "../../../../components/common/LoadingSpinner";

export default function SellerSetting() {
  const { currentUser } = useAuthStore();
  const {
    addUserBank,
    updateUserBank,
    deleteUserBank,
    userBank,
    isLoading,
    getUserBank,
  } = useSellerStore();
  const [isEdited, setIsEdited] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bankDropdown, setBankDropdown] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [norek, setNorek] = useState("");

  useEffect(() => {
    if (currentUser) {
      getUserBank(currentUser?._id);
    }
  }, [currentUser, getUserBank]);

  useEffect(() => {
    if (userBank && userBank.length > 0) {
      const bank = userBank[0];
      setSelectedBank(bank.namebank || "");
      setNorek(bank.norek || "");
    }
  }, [userBank]);

  const handleSelectBank = (bank) => {
    setSelectedBank(bank);
    setBankDropdown(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedBank || !norek) {
      showErrorToast("Bank dan Nomor Rekening harus diisi");
      return;
    }

    if (norek.length < 10) {
      showErrorToast("Nomor Rekening minimal 10 digit");
      return;
    }

    try {
      let response;
      if (userBank && userBank.length > 0) {
        response = await updateUserBank(userBank[0]._id, {
          namebank: selectedBank,
          norek: norek,
        });
      } else {
        response = await addUserBank({
          userId: currentUser._id,
          namebank: selectedBank,
          norek: norek,
        });
      }
      if (response.success) {
        if (userBank && userBank.length > 0) {
          showSuccessToast("Bank berhasil diperbarui");
        } else {
          showSuccessToast("Bank berhasil ditambahkan");
        }
        getUserBank(currentUser?._id);
        setIsEdited(false);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      showErrorToast("Terjadi kesalahan saat memperbarui data");
      return;
    }
  };

  const handleDelete = async () => {
    if (!userBank || userBank.length === 0) {
      showErrorToast("Bank Anda belum terdaftar");
      setShowDeleteModal(false);
      return;
    }
    try {
      await deleteUserBank(userBank[0]._id);
      setSelectedBank("");
      setNorek("");
      showSuccessToast("Bank berhasil dihapus");
    } catch (error) {
      console.error("Error menghapus data:", error);
      showErrorToast("Terjadi kesalahan saat menghapus data");
    }
    setShowDeleteModal(false);
    setIsEdited(false);
    getUserBank(currentUser?._id);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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

      <form onSubmit={handleSave}>
        {/* Select Nama Bank */}
        <div className="container mt-4">
          <h3 className="font-medium text-lg mb-1">Bank</h3>
          <div className="relative">
            <button
              onClick={() => setBankDropdown(!bankDropdown)}
              disabled={!isEdited}
              type="button"
              className="w-full p-3 mb-2 sm:p-4 lg:p-3 border border-gray-300 rounded-xl text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary flex justify-between items-center disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <span className={isEdited ? "text-black" : "text-gray-400"}>
                {selectedBank || "Pilih Bank"}
              </span>
              <FiChevronDown className="text-gray-500" />
            </button>
            {bankDropdown && (
              <div className="absolute left-0 z-30 w-full divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white shadow-lg">
                <div className="p-2">
                  {[
                    "BCA",
                    "Mandiri",
                    "BRI",
                    "BNI",
                    "Permata",
                    "CIMB",
                    "Danamon",
                  ].map((bank) => (
                    <button
                      key={bank}
                      onClick={() => handleSelectBank(bank)}
                      type="button"
                      className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      {bank}
                    </button>
                  ))}
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
            value={norek}
            onChange={(e) => setNorek(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="Masukkan Nomor Rekening Anda"
            disabled={!isEdited}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-secondary disabled:text-gray-400 disabled:cursor-not-allowed"
          />
        </div>

        {/* Tombol Simpan, Edit, Hapus */}
        <div className="flex flex-row gap-4 justify-end px-4 mt-6 mx-auto items-center">
          {isEdited && (
            <>
              {/* Tombol Simpan */}
              <button
                onClick={handleSave}
                type="submit"
                className="bg-primary px-4 lg:px-5 py-2.5 font-medium rounded-xl hover:bg-primaryDark transition-colors duration-300 w-full lg:w-auto"
              >
                Simpan
              </button>

              {/* Tombol Hapus */}
              <button
                onClick={() => setShowDeleteModal(true)}
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
            onClick={() => {
              setIsEdited(!isEdited);
            }}
          >
            {isEdited
              ? "Batal"
              : userBank && userBank.length > 0
              ? "Ubah rekening"
              : "Tambah rekening"}
          </button>
        </div>
      </form>

      {showDeleteModal && (
        <Danger
          title="Hapus Akun"
          message="Apakah Anda yakin ingin menghapus akun ini?"
          onSubmit={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
