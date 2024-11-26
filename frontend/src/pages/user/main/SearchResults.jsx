import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import Card from "../../../components/common/Card";

export default function SearchResults() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

      {/* Filter & Sort */}
      <section className="flex justify-between px-10 py-6 md:px-12 lg:px-12 relative">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className={`flex items-center px-5 py-2 ${
              location.search.includes("category")
                ? "bg-primary ring-primary"
                : "bg-white ring-secondary hover:bg-primary hover:ring-primary"
            } text-black shadow-md rounded-full ring-2 hover:text-black text-sm`}
          >
            <span className="mr-2">Kategori</span>
            <FiChevronDown />
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute left-0 z-30 mt-2 w-28 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg">
              <div className="p-2">
                <button
                  onClick={() => navigate("/products")}
                  className={`block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary ${
                    location.search === "" && "bg-gray-50 text-secondary"
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => navigate("/products?category=men")}
                  className={`block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary ${
                    location.search.includes("category=men") &&
                    "bg-gray-50 text-secondary"
                  }`}
                >
                  Pria
                </button>
                <button
                  onClick={() => navigate("/products?category=women")}
                  className={`block rounded-lg px-4 py-2 w-full text-sm text-gray-500 hover:bg-gray-50 hover:text-secondary ${
                    location.search.includes("category=women") &&
                    "bg-gray-50 text-secondary"
                  }`}
                >
                  Wanita
                </button>
              </div>
            </div>
          )}
        </div>

        <button className="flex items-center px-5 py-2 bg-white text-black shadow-md rounded-full ring-2 ring-secondary hover:bg-primary hover:text-black hover:ring-primary text-sm">
          <BiSortAlt2 className="mr-2" />
          Sortir
        </button>
      </section>

      {/* Product Grid */}
      <section className="px-4 md:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 gap-6 mx-auto justify-center md:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:px-0 lg:w-full">
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
          <div className="w-full flex justify-center lg:scale-90">
            <Card />
          </div>
        </div>
      </section>
    </div>
  );
}
