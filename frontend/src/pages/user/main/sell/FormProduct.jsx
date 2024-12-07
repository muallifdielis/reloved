import { useState } from "react";
import TitleSection from "../../../../components/common/TitleSection";
import { FiChevronDown } from "react-icons/fi";
import { FaCamera } from "react-icons/fa";

export default function AddProduct() {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [price, setPrice] = useState("");

  const toggleCategoryDropdown = () =>
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  const toggleConditionDropdown = () =>
    setIsConditionDropdownOpen(!isConditionDropdownOpen);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);
  };

  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition);
    setIsConditionDropdownOpen(false);
  };

  const handlePriceChange = (e) => {
    // Only allows numbers and commas
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPrice(value);
  };

  // Function to format price with commas
  const formatPrice = (price) => {
    if (!price) return "";
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="px-4 pt-0 pb-4 bg-white mx-auto">
      <TitleSection title="Tambah Produk" />

      {/* Foto Produk */}
      <div className="container p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-black mb-2">Foto Produk</h2>
          <label htmlFor="upload" className="block w-full">
            <div className="w-36 h-36 border rounded-xl flex flex-col justify-center items-center bg-gray-100 shadow cursor-pointer">
              <FaCamera />
              <p className="text-sm text-gray-500 mt-2">Tambah foto</p>
            </div>
          </label>
          <input type="file" id="upload" className="hidden" />
        </div>

        {/* Deskripsi Produk */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-black mb-2">
            Deskripsi Produk
          </h2>
          <textarea
            placeholder="Tulis deskripsi produk..."
            className="w-full p-3 sm:p-4 lg:p-3 border border-gray-300 rounded-xl text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
            rows={8}
          ></textarea>
        </div>

        {/* Detail Produk */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-black mb-4">
            Detail Produk
          </h2>

          <div>
            <h3 className="text-md font-normal text-gray-800 mb-1">Kategori</h3>
            <div className="relative">
              <button
                onClick={toggleCategoryDropdown}
                className="w-full p-3 mb-2 sm:p-4 lg:p-3 border border-gray-300 rounded-xl text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary flex justify-between items-center"
              >
                <span className="text-gray-500">
                  {selectedCategory || "Pilih Kategori"}
                </span>
                <FiChevronDown className="text-gray-500" />
              </button>
              {isCategoryDropdownOpen && (
                <div className="absolute left-0 z-30 w-full divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white shadow-lg">
                  <div className="p-2">
                    <button
                      onClick={() => handleCategorySelect("Pria")}
                      className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      Pria
                    </button>
                    <button
                      onClick={() => handleCategorySelect("Wanita")}
                      className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      Wanita
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Nama Produk */}
          <div>
            <h3 className="text-md font-normal text-gray-800 mb-2">
              Nama Produk
            </h3>
            <input
              type="text"
              placeholder="Nama Produk"
              className="w-full p-3 mb-4 sm:p-4 lg:p-3 border border-gray-300 rounded-xl text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
            />
          </div>

          {/* Kondisi Dropdown */}
          <div>
            <h3 className="text-md font-normal text-gray-800 mb-1">Kondisi</h3>
            <div className="relative">
              <button
                onClick={toggleConditionDropdown}
                className="w-full p-3 mb-2 sm:p-4 lg:p-3 border border-gray-300 rounded-xl text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary flex justify-between items-center"
              >
                <span className="text-gray-500">
                  {selectedCondition || "Pilih Kondisi"}
                </span>
                <FiChevronDown className="text-gray-500" />
              </button>
              {isConditionDropdownOpen && (
                <div className="absolute left-0 z-30 mt-0 w-full divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white shadow-lg">
                  <div className="p-2">
                    <button
                      onClick={() => handleConditionSelect("Sangat Baik")}
                      className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      Sangat Baik
                    </button>
                    <button
                      onClick={() => handleConditionSelect("Baik")}
                      className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      Baik
                    </button>
                    <button
                      onClick={() => handleConditionSelect("Layak Pakai")}
                      className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      Layak Pakai
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Harga */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 py-2">Harga</h3>
            <div className="relative w-full">
              <span className="absolute p-2 top-1/3 transform -translate-y-1/2 text-gray-500 text-md font-medium sm:text-base lg:text-sm">
                Rp
              </span>
              <input
                type="text"
                value={formatPrice(price)}
                onChange={handlePriceChange}
                placeholder="Masukkan Harga (berupa angka)"
                className="w-full pl-10 p-3 mb-4 border border-gray-300 rounded-xl text-md sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
              />
            </div>
          </div>
        </div>

        {/* Tombol */}
        <div className="flex gap-5 justify-center sm:justify-end">
          <button className="w-24 h-11 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300">
            Draft
          </button>
          <button className="w-24 h-11 py-2 bg-secondary text-white rounded-xl font-medium hover:bg-secondaryHover">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
