import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import TitleSection from "../../../components/common/TitleSection";
import Card from "../../../components/common/Card";
import useProductStore from "../../../store/productStore";
import useAuthStore from "../../../store/authStore";
import { useCategoryStore } from "../../../store/categoryStore";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

export default function Products() {
  const { products = [], isLoading, getAllProducts } = useProductStore();

  const { currentUser } = useAuthStore();

  const {
    categories = [],
    isLoading: isCategoryLoading,
    getAllCategories,
  } = useCategoryStore();

  const location = useLocation();
  const navigate = useNavigate();

  const category =
    new URLSearchParams(location.search).get("category") || "semua";
  const sortOption =
    new URLSearchParams(location.search).get("sort") || "newest";

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] =
    React.useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = React.useState(false);

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const handleCategoryChange = (selectedCategory) => {
    // Directly using the category value without any changes
    navigate(`/products?category=${selectedCategory}&sort=${sortOption}`);
    setIsCategoryDropdownOpen(false);
  };

  const handleSortChange = (option) => {
    navigate(`/products?category=${category}&sort=${option}`);
    setIsSortDropdownOpen(false);
  };

  useEffect(() => {
    if (categories.length === 0) {
      getAllCategories();
    }

    // Ensure that if category is "semua", we fetch all products
    if (category === "semua") {
      getAllProducts({ category: "", sort: sortOption });
    } else {
      getAllProducts({ category, sort: sortOption });
    }
  }, [category, sortOption, getAllProducts, categories, getAllCategories]);

  const filteredProducts = products.filter(
    (product) => product?.seller?._id !== currentUser?._id
  );

  return (
    <div className="min-h-screen">
      <nav className="text-sm text-accent mb-6 px-6 py-4 md:px-8 lg:px-12">
        <Link to="/" className="hover:underline hover:text-secondary">
          Beranda
        </Link>{" "}
        <span className="text-secondary font-medium">{">"}</span>{" "}
        <span className="text-gray-800 font-semibold">Katalog Produk</span>
      </nav>

      <section className="px-6 pb-2 pt-0 md:px-8 capitalize">
        <TitleSection
          title={
            category.toLowerCase() === "semua"
              ? "Katalog Produk"
              : `Katalog Produk ${category}`
          }
        />
      </section>

      <section className="flex justify-between px-10 py-6 md:px-12 lg:px-12 relative">
        <div className="relative">
          <button
            onClick={toggleCategoryDropdown}
            className="flex items-center px-5 py-2 bg-white text-black shadow-md rounded-full ring-2 ring-secondary hover:bg-primary hover:ring-primary hover:text-black text-sm"
          >
            <span className="mr-2">Kategori</span>
            <FiChevronDown />
          </button>
          {isCategoryDropdownOpen && (
            <div className="absolute left-0 z-30 mt-2 w-28 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg">
              <div className="p-2">
                {isCategoryLoading ? (
                  <div className="text-sm text-center">Loading...</div>
                ) : (
                  <>
                    <button
                      onClick={() => handleCategoryChange("semua")}
                      className={`block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary ${
                        category === "semua" && "bg-gray-50 text-secondary capitalize"
                      }`}
                    >
                      Semua
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => handleCategoryChange(cat.name)}
                        className={`block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary capitalize ${
                          category === cat.name && "bg-gray-50 text-secondary"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={toggleSortDropdown}
            className="flex items-center px-5 py-2 bg-white text-black shadow-md rounded-full ring-2 ring-secondary hover:bg-primary hover:ring-primary hover:text-black text-sm"
          >
            <BiSortAlt2 className="mr-2" />
            Sortir
          </button>
          {isSortDropdownOpen && (
            <div className="absolute left-0 z-30 mt-2 w-28 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg">
              <div className="p-2">
                <button
                  onClick={() => handleSortChange("newest")}
                  className={`block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary ${
                    sortOption === "newest" && "bg-gray-50 text-secondary"
                  }`}
                >
                  Terbaru
                </button>
                <button
                  onClick={() => handleSortChange("oldest")}
                  className={`block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary ${
                    sortOption === "oldest" && "bg-gray-50 text-secondary"
                  }`}
                >
                  Terlama
                </button>
                <button
                  onClick={() => handleSortChange("price-asc")}
                  className={`block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary ${
                    sortOption === "price-asc" && "bg-gray-50 text-secondary"
                  }`}
                >
                  Termurah
                </button>
                <button
                  onClick={() => handleSortChange("price-desc")}
                  className={`block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary ${
                    sortOption === "price-desc" && "bg-gray-50 text-secondary"
                  }`}
                >
                  Termahal
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 md:px-6 lg:px-8 pb-10">
        {isLoading ? (
          <LoadingSpinner />
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 mx-auto justify-center md:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:px-0 lg:w-full">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id || index}
                className="w-full flex justify-center lg:scale-90"
              >
                <Card product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Tidak ada produk ditemukan.
          </div>
        )}
      </section>
    </div>
  );
}
