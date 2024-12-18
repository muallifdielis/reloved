import React, { useEffect } from "react";
import { GoTrash } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../../../store/cartStore";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

export default function Cart() {
  const { cart, getCart, removeCartItem, isLoading } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, [getCart]);

  const handleRemoveItem = async (productId) => {
    await removeCartItem(productId);
    getCart();
  };

  const handleCheckout = (productId) => {
    localStorage.setItem("selectedProductId", productId);
    navigate("/checkout");
  };

  console.log("cart", cart);

  return (
    <div className="bg-background/50 w-full min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6 p-4 md:px-[68px] lg:px-[74px] bg-white">
        <Link to="/" className="hover:underline hover:text-secondary">
          Beranda
        </Link>{" "}
        <span className="text-secondary font-medium">{">"}</span>{" "}
        <span className="font-semibold">Keranjang</span>
      </nav>

      {/* Daftar Produk */}
      <div className="px-4 mx-auto min-h-screen md:px-[68px] lg:px-[74px] flex flex-col max-w-screen-2xl w-full">
        {isLoading ? (
          <LoadingSpinner />
        ) : cart.length === 0 ? (
          <p className="text-center text-gray-400">Keranjang Anda kosong!</p>
        ) : (
          cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row bg-white rounded-xl shadow p-4 mb-4 hover:bg-gray-100 relative"
            >
              {/* Gambar Produk */}
              <div
                onClick={() => navigate(`/detail-product/${item.product._id}`)}
                className="w-full md:w-[165px] h-full md:h-[165px] rounded-xl overflow-hidden mb-3 md:mb-0 md:mr-4 relative cursor-pointer"
              >
                <img
                  src={
                    item.product.images?.[0] ||
                    "https://via.placeholder.com/100"
                  }
                  alt={item.product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
                {item?.product?.isAvailable === false && (
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <p className="text-white font-semibold uppercase">
                      terjual
                    </p>
                  </div>
                )}
              </div>

              {/* Detail Produk */}
              <div className="flex-grow flex flex-col items-start mb-3 md:mb-0 md:h-[120px] md:py-1 md:w-3/4">
                <h2 className="font-semibold text-lg md:text-base">
                  {item.product.name}
                </h2>
                <p className="text-sm font-medium text-gray-600">
                  {1} x{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(item.product.price)}
                </p>
              </div>

              {/* Tombol */}
              <div className="flex md:flex-row gap-4 md:gap-4 lg:gap-4 w-full md:w-auto md:absolute md:bottom-4 md:right-4 md:mb-0">
                <button
                  type="button"
                  className="flex items-center bg-white text-black border border-secondary rounded-xl px-4 md:px-5 lg:px-5 py-2 hover:bg-red-600 hover:border-red-600 hover:text-white justify-center flex-shrink-0"
                  onClick={() => handleRemoveItem(item.product._id)}
                >
                  <span className="mr-2">
                    <GoTrash />
                  </span>
                  Hapus
                </button>
                {item?.product?.isAvailable ? (
                  <button
                    type="button"
                    onClick={() => handleCheckout(item.product._id)}
                    className="bg-primary text-black rounded-xl px-4 md:px-5 lg:px-5 py-2 hover:bg-primaryDark flex-shrink-0"
                  >
                    Lanjutkan pembelian
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-background text-black rounded-xl px-4 md:px-5 lg:px-5 py-2 flex-shrink-0 disabled:cursor-not-allowed"
                  >
                    Produk sudah terjual
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
