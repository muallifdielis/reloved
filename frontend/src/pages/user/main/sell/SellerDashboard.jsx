import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../../../store/authStore";
import { useOrderStore } from "../../../../store/orderStore";
import { useUserStore } from "../../../../store/userStore";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import WithdrawModal from "../../../../components/modals/Withdrawal";
import { useSellerStore } from "../../../../store/sellerStore";
import WithdrawalHistory from "../../../../components/modals/WithdrawalHistory";

export default function SellerDashboard() {
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const { currentUser, isLoading } = useAuthStore();
  const {
    getSellerProducts,
    sellerProducts,
    isLoading: loadingProduct,
  } = useUserStore();
  const {
    getSellerOrders,
    sellerOrders,
    isLoading: loadingOrder,
  } = useOrderStore();
  const {
    getUserBank,
    isLoading: bankLoading,
    userBank,
    earnings,
    getUserEarnings,
    withdrawals,
    getWithdrawalsHistory,
  } = useSellerStore();

  // State untuk mengontrol tampilan modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi membuka modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fungsi menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isLoading && currentUser?._id) {
      getSellerProducts(currentUser?._id);
    }
  }, [isLoading, getSellerProducts, currentUser?._id]);

  useEffect(() => {
    getSellerOrders();
  }, [getSellerOrders]);

  useEffect(() => {
    if (currentUser?._id) {
      getUserBank(currentUser?._id);
      getUserEarnings(currentUser?._id);
    }
  }, [currentUser?._id, getUserBank, getUserEarnings]);

  useEffect(() => {
    if (currentUser?._id) {
      getWithdrawalsHistory();
    }
  }, [currentUser?._id, getWithdrawalsHistory]);

  return (
    <>
      {loadingProduct || loadingOrder || bankLoading ? (
        <div className="w-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="py-0 px-4 mx-auto">
          {/* Title Section */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 md:mt-3">
              <h2 className="font-semibold text-2xl text-black">
                Selamat datang {currentUser?.name}!
              </h2>
              <p className="text-lg text-gray-500">
                Berikut adalah status toko anda
              </p>
            </div>
          </div>

          {/* Informasi Rekening dan Pendapatan */}
          <div className="bg-white p-4 rounded-xl border border-secondary mt-4 mb-6 flex flex-col gap-3 shadow-sm">
            <div>
              <p className="text-gray-600 text-sm">No. Rekening</p>
              <p className="font-medium text-lg">
                {userBank
                  ? userBank[0]?.norek
                  : "Anda belum memasukkan nomor rekening"}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Pendapatan</p>
              <p className="font-medium text-lg">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(earnings?.availableEarnings)}
              </p>
            </div>

            <button
              onClick={openModal} // Buka modal saat tombol diklik
              className="bg-primary hover:bg-primaryDark text-black font-medium px-6 py-2 rounded-lg self-end"
            >
              Tarik Saldo
            </button>
            <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-end">
              <button
                onClick={() => setShowWithdrawalModal(true)}
                className="bg-primary hover:bg-primaryDark text-black font-medium px-6 py-2 rounded-lg self-end"
              >
                Riwayat Penarikan
              </button>
              <button className="bg-primary hover:bg-primaryDark text-black font-medium px-6 py-2 rounded-lg self-end">
                Tarik Saldo
              </button>
            </div>
            <p className="text-xs text-gray-500 self-end">
              *min. saldo Rp 10.000
            </p>
          </div>

          {/* Produk Pesanan */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Produk Pesanan</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {sellerOrders?.length === 0 ? (
                <p className="text-gray-500 text-sm">Belum ada pesanan</p>
              ) : (
                sellerOrders?.slice(0, 4).map((order) => (
                  <Link to="/seller/orders" key={order?._id}>
                    <img
                      src={order?.order_items[0]?.product?.images[0]}
                      alt="Product Image 1"
                      className="w-40 h-40 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition duration-300 object-cover"
                    />
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Produk Saya */}
          <div className="mt-6">
            <h2 className="font-semibold text-lg mb-2">Produk Saya</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {sellerProducts?.length === 0 ? (
                <p className="text-gray-500 text-sm">Belum ada produk</p>
              ) : (
                sellerProducts?.slice(0, 4).map((product) => (
                  <Link
                    to={`/detail-product/${product?._id}`}
                    key={product?._id}
                  >
                    <img
                      src={product?.images[0]}
                      alt="Product Image 2"
                      className="w-40 h-40 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition duration-300 object-cover"
                    />
                  </Link>
                ))
              )}
            </div>
          </div>
          {/* MODAL RIWAYAT WITHDRAWAL */}
          {showWithdrawalModal && (
            <WithdrawalHistory
              onClose={() => setShowWithdrawalModal(false)}
              data={withdrawals}
            />
          )}
        </div>
      )}

      {/* Modal ditampilkan */}
      {isModalOpen && <WithdrawModal onClose={closeModal} />}
    </>
  );
}
