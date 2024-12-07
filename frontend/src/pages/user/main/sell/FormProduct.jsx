import { useEffect, useState } from "react";
import TitleSection from "../../../../components/common/TitleSection";
import { FiChevronDown } from "react-icons/fi";
import { FaCamera } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import useProductStore from "../../../../store/productStore";
import { IoIosClose } from "react-icons/io";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common/Toast";
import useAuthStore from "../../../../store/authStore";

export default function FormProduct() {
  const { id } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  const { addNewProduct, updateProduct, isLoading, getProductById } =
    useProductStore();
  const { currentUser } = useAuthStore();

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) {
      setIsUpdate(true);

      const fetchProduct = async () => {
        try {
          const product = await getProductById(id);
          setName(product.name);
          setDescription(product.description);
          setSelectedCategory(product.category);
          setSelectedCondition(product.condition);
          setSelectedSize(product.size);
          setPrice(product.price);
          setImages(product.images || []);
        } catch (error) {
          console.log("error", error);
          showErrorToast(
            error.response.data.message ||
              "Terjadi kesalahan saat mengambil produk"
          );
        }
      };

      fetchProduct();
    }
  }, [id, getProductById]);

  const toggleCategoryDropdown = () =>
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  const toggleConditionDropdown = () =>
    setIsConditionDropdownOpen(!isConditionDropdownOpen);
  const toggleSizeDropdown = () => setIsSizeDropdownOpen(!isSizeDropdownOpen);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);
  };

  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition);
    setIsConditionDropdownOpen(false);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setIsSizeDropdownOpen(false);
  };

  const handlePriceChange = (e) => {
    // Only allows numbers and commas
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPrice(value);
  };

  // Function to format price with commas
  const formatPrice = (price) => {
    const priceString = price ? price.toString() : "";
    return priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 10));
  };

  const removeImage = (indexToRemove, imageId) => {
    setDeletedImages((prevDeletedImages) => [...prevDeletedImages, imageId]);
    const filteredImages = images.filter((_, index) => index !== indexToRemove);
    setImages(filteredImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validasi input
    const requiredFields = [
      { field: selectedCategory, message: "Pilih kategori produk" },
      { field: name.trim(), message: "Nama produk harus diisi" },
      { field: selectedCondition, message: "Pilih kondisi produk" },
      { field: selectedSize, message: "Pilih ukuran produk" },
      { field: price, message: "Harga produk harus diisi" },
    ];

    const errorField = requiredFields.find(({ field }) => !field);

    if (errorField) {
      showErrorToast(errorField.message);
      return;
    }

    const formData = new FormData();

    // Tambahkan data produk
    formData.append("category", selectedCategory);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("condition", selectedCondition);
    formData.append("size", selectedSize);
    formData.append("price", price);
    images.forEach((image) => {
      formData.append("images", image.file);
    });

    deletedImages.forEach((imageId) => {
      formData.append("deletedImages", imageId);
    });

    try {
      let response;
      if (id) {
        // Perbarui produk jika ada id
        response = await updateProduct(id, formData);
      } else {
        // Tambahkan produk jika tidak ada id
        response = await addNewProduct(formData);
      }

      if (response.success) {
        showSuccessToast(
          id ? "Produk berhasil diperbarui" : "Produk berhasil ditambahkan"
        );
        navigate(`/profile/${currentUser._id}`);
        setImages([]);
        setDeletedImages([]);
        setSelectedCategory("");
        setName("");
        setDescription("");
        setSelectedCondition("");
        setSelectedSize("");
        setPrice("");
      }
    } catch (error) {
      console.log("error", error);
      showErrorToast("Terjadi kesalahan saat menyimpan produk.");
    }
  };

  return (
    <div className="px-4 pt-0 pb-4 bg-white mx-auto">
      <TitleSection title={`${id ? "Ubah" : "Tambah"} Produk`} />

      <form className="container p-4" onSubmit={handleSubmit}>
        <div className="mb-6">
          {/* Foto Produk */}
          <h2 className="text-lg font-semibold text-black mb-2">Foto Produk</h2>
          <div className="flex flex-wrap gap-4">
            {/* Input file */}
            <label htmlFor="upload" className="block w-max">
              <div className="w-36 h-36 border rounded-xl flex flex-col justify-center items-center bg-gray-100 shadow cursor-pointer">
                <FaCamera />
                <p className="text-sm text-gray-500 mt-2">Tambah foto</p>
              </div>
            </label>
            <input
              type="file"
              id="upload"
              className="hidden w-0 h-0"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            {/* Preview Gambar */}
            {images.map((image, index) => (
              <div key={index} className="relative w-36 h-36">
                <img
                  src={isUpdate ? image.preview || image : image.preview}
                  alt={`Product preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index, image)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full"
                >
                  <IoIosClose size={25} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Deskripsi Produk */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-black mb-2">
            Deskripsi Produk
          </h2>
          <textarea
            placeholder="Tulis deskripsi produk..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
                type="button"
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
                      type="button"
                      className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      Pria
                    </button>
                    <button
                      onClick={() => handleCategorySelect("Wanita")}
                      type="button"
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Produk"
              className="w-full p-3 mb-2 sm:p-4 lg:p-3 border border-gray-300 rounded-xl text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
            />
          </div>

          {/* Ukuran Dropdown */}
          <div>
            <h3 className="text-md font-normal text-gray-800 mb-1">Ukuran</h3>
            <div className="relative">
              <button
                onClick={toggleSizeDropdown}
                type="button"
                className="w-full p-3 mb-2 sm:p-4 lg:p-3 border border-gray-300 rounded-xl text-sm sm:text-base lg:text-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary flex justify-between items-center"
              >
                <span className="text-gray-500">
                  {selectedSize || "Pilih Ukuran"}
                </span>
                <FiChevronDown className="text-gray-500" />
              </button>
              {isSizeDropdownOpen && (
                <div className="absolute left-0 z-30 w-full divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white shadow-lg">
                  <div className="p-2">
                    <button
                      onClick={() => handleSizeSelect("S")}
                      type="button"
                      className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      S
                    </button>
                    <button
                      onClick={() => handleSizeSelect("M")}
                      type="button"
                      className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      M
                    </button>
                    <button
                      onClick={() => handleSizeSelect("L")}
                      type="button"
                      className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      L
                    </button>
                    <button
                      onClick={() => handleSizeSelect("XL")}
                      type="button"
                      className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      XL
                    </button>
                    <button
                      onClick={() => handleSizeSelect("XXL")}
                      type="button"
                      className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      XXL
                    </button>
                    <button
                      onClick={() => handleSizeSelect("Lainnya")}
                      type="button"
                      className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      Lainnya
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Kondisi Dropdown */}
          <div>
            <h3 className="text-md font-normal text-gray-800 mb-1">Kondisi</h3>
            <div className="relative">
              <button
                onClick={toggleConditionDropdown}
                type="button"
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
                      type="button"
                      className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      Sangat Baik
                    </button>
                    <button
                      onClick={() => handleConditionSelect("Baik")}
                      type="button"
                      className="block text-left w-full rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary"
                    >
                      Baik
                    </button>
                    <button
                      onClick={() => handleConditionSelect("Layak Pakai")}
                      type="button"
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
          <button
            disabled={isLoading}
            className="px-4 h-11 py-2 bg-secondary text-white rounded-xl font-medium hover:bg-secondaryHover disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading
              ? "Loading..."
              : isUpdate
              ? "Simpan Perubahan"
              : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
