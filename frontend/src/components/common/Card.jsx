import { useNavigate } from "react-router-dom";
import useProductStore from "../../store/productStore";
import useAuthStore from "../../store/authStore";
import { useEffect, useState } from "react";
import { showErrorToast, showLoadingToast, showSuccessToast } from "./Toast";
import { useCartStore } from "../../store/cartStore";

export default function Card({ product }) {
  const navigate = useNavigate();

  const { likeUnlikeProduct, deleteProduct } = useProductStore();
  const { currentUser } = useAuthStore();
  const { addToCart, isLoading: isLoadingCart } = useCartStore();

  const [isLiked, setIsLiked] = useState(
    product?.likes?.includes(currentUser?._id) || false
  );
  const [isPostOwner, setIsPostOwner] = useState(
    product?.seller?._id === currentUser?._id || false
  );

  useEffect(() => {
    if (product && currentUser) {
      setIsLiked(product.likes.includes(currentUser._id));
      setIsPostOwner(product.seller._id === currentUser._id);
    }
  }, []);

  const handleLike = async () => {
    try {
      const response = await likeUnlikeProduct(product._id);

      if (response.success) {
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(product._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async () => {
    const response = await addToCart(product._id);
    if (response.success) {
      showSuccessToast("Produk berhasil ditambahkan ke keranjang");
    }
  };

  return (
    <div className="bg-white shadow-lg hover:shadow-2xl rounded-lg p-4 w-80 hover:scale-105 transition duration-300 ease-in-out">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <img
            src={product?.images[0]}
            alt={product?.name}
            className="w-full h-64 object-cover rounded-lg cursor-pointer"
            onClick={() => navigate(`/detail-product/${product?._id}`)}
          />
          {product?.isAvailable === false && (
            <div
              className="absolute inset-0 bg-black bg-opacity-50 grid place-items-center rounded-lg cursor-pointer"
              onClick={() => navigate(`/detail-product/${product?._id}`)}
            >
              <p className="text-white font-bold">TERJUAL</p>
            </div>
          )}
          {!isPostOwner && currentUser && product?.isAvailable && (
            <button
              onClick={() => handleLike(product?._id)}
              className="absolute top-2 right-2 bg-white p-1.5 rounded-full z-10"
            >
              <svg
                fill={isLiked ? "#ff2525" : "#a8a8a8"}
                className="w-5 h-5 hover:fill-[#ff2525] transition-colors duration-300 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-2">
            <h2
              className="text-lg font-semibold truncate cursor-pointer"
              onClick={() => navigate(`/detail-product/${product?._id}`)}
            >
              {product?.name}
            </h2>
            <p
              className="text-nowrap cursor-pointer font-bold"
              onClick={() => navigate(`/detail-product/${product._id}`)}
            >
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(product?.price)}
            </p>
          </div>
          <p
            className="text-gray-600 text-sm h-30 truncate cursor-pointer"
            onClick={() => navigate(`/detail-product/${product?._id}`)}
          >
            {product?.description}
          </p>
          {isPostOwner && product?.isAvailable ? (
            <div className="flex gap-3">
              <button
                className="bg-accent border border-accent text-white py-2 px-4 rounded-full w-max hover:bg-accentHover hover:border-accentHover transition-colors duration-300"
                onClick={() => navigate(`/form-product/${product?._id}`)}
              >
                Edit Produk
              </button>
              <button
                className="bg-background border py-2 px-4 rounded-full w-max hover:bg-red-600 hover:text-white transition-colors duration-300"
                onClick={() => {
                  handleDeleteProduct(product?._id);
                  showLoadingToast({ message: "Menghapus..." });
                }}
              >
                Hapus Produk
              </button>
            </div>
          ) : (
            <button
              className={`bg-transparent border border-accent text-accent py-2 px-4 rounded-full w-max transition-colors duration-300
              ${
                isLoadingCart
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:bg-primary hover:border-primary "
              }`}
              // disabled={!product?.isAvailable}
              onClick={
                currentUser && product?.isAvailable
                  ? () => handleAddToCart(product?._id)
                  : () => navigate(`/detail-product/${product?._id}`)
              }
            >
              {currentUser && product?.isAvailable
                ? isLoadingCart
                  ? "Menambahkan..."
                  : "Masukkan Keranjang"
                : "Lihat Detail"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
