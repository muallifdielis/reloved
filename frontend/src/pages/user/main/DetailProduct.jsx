import { FaPlus } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../../components/common/Card";
import { IoStar, IoPencil } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useProductStore from "../../../store/productStore";
import useAuthStore from "../../../store/authStore";
import { formatDate } from "../../../utils/formatDate";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/common/Toast";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import Danger from "../../../components/modals/Danger";
import { useCartStore } from "../../../store/cartStore";

export default function DetailProduct() {
  const { id } = useParams();
  const {
    selectedProduct,
    getProductById,
    isLoading,
    likeUnlikeProduct,
    deleteProduct,
    getAllProducts,
  } = useProductStore();
  const { currentUser } = useAuthStore();
  const { addToCart, isLoading: isLoadingCart } = useCartStore();

  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState(selectedProduct?.images[0]);
  const [likes, setLikes] = useState(selectedProduct?.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(
    selectedProduct?.likes?.includes(currentUser?._id) || false
  );
  const [isPostOwner, setIsPostOwner] = useState(
    selectedProduct?.seller?._id === currentUser?._id || false
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
  }, [id]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser._id === selectedProduct?.seller?._id) {
        setIsPostOwner(true);
      } else {
        setIsPostOwner(false);
      }
    } else {
      setIsPostOwner(false);
    }

    const fetchProducts = async () => {
      const allProducts = await getAllProducts();
      const filteredProducts = allProducts.filter(
        (product) =>
          product._id !== id && product.seller._id !== currentUser?._id
      );
      setRecommendations(filteredProducts);
    };

    fetchProducts();

    setIsLiked(selectedProduct?.likes?.includes(currentUser?._id) || false);
    setLikes(selectedProduct?.likes?.length || 0);

    if (selectedProduct) {
      setMainImage(selectedProduct.images[0]);
    }
  }, [selectedProduct, currentUser]);

  const handleLike = async () => {
    try {
      const response = await likeUnlikeProduct(selectedProduct?._id);
      setIsLiked(!isLiked);
      if (response.success === false) {
        return;
      } else {
        setLikes(isLiked ? likes - 1 : likes + 1);
      }
    } catch (error) {
      console.error(error);
      showErrorToast(
        error.response.message || "Terjadi kesalahan saat menyukai produk"
      );
    }
  };

  const handleDeleteProduct = async () => {
    try {
      setShowModal(false);
      const response = await deleteProduct(selectedProduct?._id);
      if (response.success === true) {
        navigate("/seller/dashboard");
      }
    } catch (error) {
      console.error(error);
      showErrorToast(
        error.response.message || "Terjadi kesalahan saat menghapus produk"
      );
    }
  };

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddToCart = async () => {
    if (currentUser) {
      const response = await addToCart(selectedProduct?._id);
      if (response.success) {
        showSuccessToast("Produk berhasil ditambahkan ke keranjang");
      }
    } else {
      showErrorToast("Anda harus login terlebih dahulu");
      navigate("/login");
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="mx-5 md:mx-10">
          {!selectedProduct ? (
            <div className="flex flex-col justify-center items-center gap-2 text-center min-h-svh">
              <img
                src="/product-notfound.svg"
                alt="Error"
                className="lg:w-1/2 h-auto mb-5"
              />
              <h2 className="text-2xl font-semibold">Produk tidak ditemukan</h2>
            </div>
          ) : (
            <>
              {/* STEPPER */}
              <p className="text-sm my-4 cursor-default">
                <Link to="/" className="hover:underline hover:text-secondary">
                  Beranda
                </Link>{" "}
                <span className="text-secondary font-medium">{">"}</span>{" "}
                <Link
                  to="/products"
                  className="hover:underline hover:text-secondary"
                >
                  Katalog Produk
                </Link>{" "}
                <span className="text-secondary font-medium">{">"}</span>{" "}
                <span className="font-semibold">Detail Produk</span>
              </p>

              {/* DETAIL PRODUK */}
              <div className="flex flex-col items-center md:items-start md:flex-row gap-6 mb-10 mt-5">
                <div className="md:w-10/12 w-full lg:w-6/12 relative">
                  <motion.img
                    key={mainImage}
                    src={mainImage}
                    alt="Detail Product"
                    className="md:w-full rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  {!isPostOwner && currentUser && (
                    <button
                      className="absolute top-2 right-2 bg-white p-1.5 rounded-full z-10"
                      onClick={() => handleLike(selectedProduct?._id)}
                    >
                      <svg
                        fill={isLiked ? "#ff2525" : "#a8a8a8"}
                        className="w-5 h-5 hover:fill-[#ff2525] transition-colors duration-300 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                      </svg>
                      <p className="text-xs mt-1">{likes}</p>
                    </button>
                  )}
                  <div className="flex gap-2 mt-4 overflow-x-auto">
                    {selectedProduct?.images?.map((thumb, index) => (
                      <img
                        key={index}
                        src={thumb}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-16 h-16 rounded-lg cursor-pointer object-cover ${
                          mainImage === thumb ? "border-2 border-primary" : ""
                        }`}
                        onClick={() => setMainImage(thumb)}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-10/12">
                  <h2 className="text-3xl font-medium">
                    {selectedProduct?.name}
                  </h2>
                  <p className="text-sm">
                    Ukuran : {selectedProduct?.size} • Kondisi :{" "}
                    {selectedProduct?.condition}
                  </p>
                  <p className="text-lg font-medium">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(selectedProduct?.price)}
                  </p>
                  <p className="whitespace-pre-line">
                    {selectedProduct?.description}
                  </p>

                  {isPostOwner ? (
                    <div className="flex w-full gap-3">
                      <button
                        onClick={() =>
                          navigate(`/form-product/${selectedProduct?._id}`)
                        }
                        className="flex lg:w-2/4 justify-center items-center gap-2 bg-primary py-3 px-6 text-xl rounded-xl font-semibold hover:bg-primaryDark transition-colors duration-300"
                      >
                        <IoPencil /> Ubah Produk
                      </button>
                      <div className="relative">
                        <button
                          onClick={handleMenu}
                          className="flex justify-center items-center border-accent border-2 py-3 px-6 text-xl rounded-xl font-semibold hover:bg-accent transition-colors duration-300 hover:text-white"
                        >
                          <BsThreeDots className="text-2xl" />
                        </button>
                        {isMenuOpen && (
                          <div className="absolute top-12 mt-2 right-0 lg:left-0 bg-white border border-gray-200 rounded-md shadow-md w-max">
                            <button
                              onClick={handleModal}
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full"
                            >
                              Hapus Produk
                            </button>
                            <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full">
                              Tandai produk sudah laku
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart}
                      disabled={isLoadingCart}
                      className={`flex justify-center w-full items-center gap-2 bg-primary py-3 px-6 text-xl rounded-xl font-semibold hover:bg-primaryDark transition-colors duration-300" ${
                        isLoadingCart && "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <FaPlus />
                      {isLoadingCart ? "Memasukkan..." : "Masukkan Keranjang"}
                    </button>
                  )}

                  <p className="text-sm text-gray-400">
                    {formatDate(selectedProduct?.createdAt)}
                  </p>

                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/profile/${selectedProduct?.seller?._id}`)
                    }
                  >
                    <img
                      src={
                        selectedProduct?.seller?.image
                          ? selectedProduct?.seller?.image
                          : "/avatar.png"
                      }
                      alt="Profile Picture"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">
                        {selectedProduct?.seller?.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        @{selectedProduct?.seller?.username}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* REVIEW */}
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-medium">
                  Ulasan <span className="text-sm">(2)</span>
                </h2>
                <div className="flex flex-row flex-nowrap gap-4 overflow-x-scroll pb-10 pl-2">
                  <div className="flex flex-col gap-4 border border-secondary rounded-xl p-4 h-max min-w-96">
                    <div className="flex flex-row justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://picsum.photos/800"
                          alt="Profile Picture"
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">John Doe</p>
                          <p className="text-sm text-gray-400">@johndoe</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">
                          3 hari yang lalu
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row gap-2">
                      <IoStar className="w-5 h-5 text-yellow-400" />
                      <IoStar className="w-5 h-5 text-yellow-400" />
                      <IoStar className="w-5 h-5 text-yellow-400" />
                      <IoStar className="w-5 h-5 text-yellow-400" />
                      <IoStar className="w-5 h-5 text-yellow-400" />
                    </div>

                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 border border-secondary rounded-xl p-4 h-max min-w-96">
                    <div className="flex flex-row justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://picsum.photos/800"
                          alt="Profile Picture"
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">John Doe</p>
                          <p className="text-sm text-gray-400">@johndoe</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">
                          3 hari yang lalu
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2">
                      <IoStar className="w-5 h-5 text-yellow-400" />
                      <IoStar className="w-5 h-5 text-yellow-400" />
                      <IoStar className="w-5 h-5 text-yellow-400" />
                      <IoStar className="w-5 h-5 text-yellow-400" />
                      <IoStar className="w-5 h-5 text-yellow-400" />
                    </div>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </div>
                </div>
              </div>

              {/* PRODUK LAIN */}
              <div className="flex flex-col gap-4 mb-10">
                <h2 className="text-2xl font-medium">Kamu mungkin suka</h2>
                {recommendations.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    Tidak ada produk rekomendasi
                  </p>
                ) : (
                  <div className="flex flex-row flex-nowrap gap-4 items-center overflow-x-scroll pb-10 px-2">
                    {recommendations.slice(0, 4).map((product) => (
                      <Card key={product._id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <Danger
          title="Hapus Produk"
          message="Apakah Anda yakin ingin menghapus produk ini? Produk yang telah dihapus tidak dapat dikembalikan."
          onSubmit={handleDeleteProduct}
          onClose={handleModal}
        />
      )}
    </>
  );
}
