import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Card from "../../../components/common/Card";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import useProductStore from "../../../store/productStore";
import useAuthStore from "../../../store/authStore";

export default function SearchResults() {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const sortOption = searchParams.get("sort") || "newest";
  const category = searchParams.get("category") || "semua";

  const { currentUser } = useAuthStore(); 
  const { searchProducts } = useProductStore();

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const handleSortChange = (option) => {
    navigate(`/search?query=${query}&category=${category}&sort=${option}`);
    setIsSortDropdownOpen(false);
  };

  const handleCategoryChange = (category) => {
    navigate(`/search?query=${query}&category=${category}&sort=${sortOption}`);
    setIsCategoryDropdownOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      if (query) {
        try {
          const response = await searchProducts(query, category, sortOption);
          const filteredProducts = response.filter(
            (product) => product?.seller?._id !== currentUser?._id
          );
          setProducts(filteredProducts || []);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();
  }, [query, sortOption, category, searchProducts, currentUser?._id]);

  return (
    <div className="bg-white w-full min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm text-accent mb-6 px-6 py-4 bg-white md:px-8 lg:px-12">
        <Link to="/" className="hover:underline hover:text-secondary">
          Beranda
        </Link>{" "}
        <span className="text-secondary font-medium">{">"}</span>{" "}
        <span className="text-gray-800 font-semibold">Hasil Pencarian</span>
      </nav>

      <section className="px-6 pb-2 pt-0 md:px-8 lg:px-12">
        <div className="flex flex-col justify-center items-start my-6">
          <h2 className="text-3xl font-semibold text-left">
            Hasil Pencarian "<span className="text-secondary">{query}</span>"
          </h2>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-4 md:px-6 lg:px-8 pb-10">
        {isLoading ? (
          <div className="w-full text-center py-10">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 mx-auto justify-center md:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:px-0 lg:w-full">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="w-full flex justify-center lg:scale-90">
                  <Card product={product} />
                </div>
              ))
            ) : (
              <div className="w-full text-center col-span-4 text-gray-500">
                Tidak ada produk yang ditemukan.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
