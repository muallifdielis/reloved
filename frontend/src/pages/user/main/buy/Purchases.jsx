import React, { useEffect, useState } from "react";
import TitleSection from "../../../../components/common/TitleSection";
import { useNavigate } from "react-router-dom";
import Review from "../../../../components/modals/Review";
import Danger from "../../../../components/modals/Danger";
import { useOrderStore } from "../../../../store/orderStore";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import { showSuccessToast } from "../../../../components/common/Toast";

export default function Purchases() {
  const {
    getOrders,
    orders,
    isLoading,
    changeOrderStatus,
    setSelectedOrder: orderDetail,
    deleteOrder,
  } = useOrderStore();
  const navigate = useNavigate();
  const [reviewModal, setReviewModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("semua");
  const [statusLength, setStatusLength] = useState({
    semua: 0,
    menunggu: 0,
    proses: 0,
    selesai: 0,
    dibatalkan: 0,
  });

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  useEffect(() => {
    setStatusLength({
      semua: orders.length,
      menunggu: orders.filter((order) => order.status === "menunggu").length,
      proses: orders.filter((order) => order.status === "proses").length,
      selesai: orders.filter((order) => order.status === "selesai").length,
      dibatalkan: orders.filter((order) => order.status === "dibatalkan")
        .length,
    });
  }, [orders]);

  const filteredOrders =
    selectedStatus === "semua"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  const handleReviewModal = (id) => {
    setReviewModal(!reviewModal);
    setSelectedOrder(id);
  };

  const handleCancelModal = (id) => {
    setCancelModal(!cancelModal);
    setSelectedOrder(id);
  };

  const handleStatusChange = async (orderId, status) => {
    setCancelModal(false);
    try {
      const response = await changeOrderStatus(orderId, status);
      if (response.success) {
        getOrders();
        showSuccessToast(
          status === "dibatalkan" ? "Pesanan dibatalkan" : "Pesanan diterima"
        );
        setSelectedOrder(null);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleOrderDetail = (id) => {
    orderDetail(id);
    navigate("/purchases/detail");
  };

  const handlePaymentDetail = (id) => {
    localStorage.setItem("selectedOrderId", id);
    navigate("/shipping/detail-payment");
  };

  const handleDelete = async (id) => {
    setCancelModal(false);
    try {
      const response = await deleteOrder(id);
      if (response.success) {
        getOrders();
        showSuccessToast(response?.message);
        setSelectedOrder(null);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="py-5 bg-background/25 min-h-svh">
          <TitleSection title="Riwayat Pembelian" />

          {/* TABS */}
          <div className="flex container mt-10 mb-5 overflow-x-auto">
            <div className="border-b border-gray-200 md:w-full">
              <nav className="-mb-px flex gap-6" aria-label="Tabs">
                <button
                  onClick={() => setSelectedStatus("semua")}
                  className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium hover:border-secondary hover:text-secondary ${
                    selectedStatus === "semua"
                      ? "border-secondary text-secondary"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  Semua <span className="text-xs">({orders.length})</span>
                </button>

                <button
                  onClick={() => setSelectedStatus("menunggu")}
                  className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium hover:border-secondary hover:text-secondary ${
                    selectedStatus === "menunggu"
                      ? "border-secondary text-secondary"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  Belum Bayar{" "}
                  <span className="text-xs">({statusLength?.menunggu})</span>
                </button>

                <button
                  onClick={() => setSelectedStatus("proses")}
                  className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium hover:border-secondary hover:text-secondary ${
                    selectedStatus === "proses"
                      ? "border-secondary text-secondary"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  Diproses{" "}
                  <span className="text-xs">({statusLength?.proses})</span>
                </button>

                <button
                  onClick={() => setSelectedStatus("selesai")}
                  className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium hover:border-secondary hover:text-secondary ${
                    selectedStatus === "selesai"
                      ? "border-secondary text-secondary"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  Selesai{" "}
                  <span className="text-xs">({statusLength?.selesai})</span>
                </button>

                <button
                  onClick={() => setSelectedStatus("dibatalkan")}
                  className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium hover:border-secondary hover:text-secondary ${
                    selectedStatus === "dibatalkan"
                      ? "border-secondary text-secondary"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  Dibatalkan{" "}
                  <span className="text-xs">({statusLength?.dibatalkan})</span>
                </button>
              </nav>
            </div>
          </div>

          {/* PURCHASES */}
          <div className="container flex flex-col gap-5">
            {filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center">
                <h1 className="text-gray-500 mb-3">
                  {selectedStatus === "semua"
                    ? "Belum ada pesanan"
                    : `Belum ada pesanan yang ${selectedStatus}`}
                </h1>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex flex-col md:flex-row max-sm:items-center bg-white rounded-xl shadow p-4 gap-4 w-full"
                >
                  <img
                    src={order?.order_items[0]?.product?.images[0]}
                    alt={order?.order_items[0]?.product?.name}
                    className="w-40 h-40 rounded-xl object-cover"
                  />

                  <div className="flex flex-col md:w-10/12">
                    <h4 className="font-medium text-lg">
                      {order?.order_items[0]?.product?.name}
                    </h4>
                    <p className="text-gray-600 text-sm font-medium">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(order?.total_price)}
                    </p>
                  </div>

                  <div className="flex flex-wrap-reverse md:flex-wrap gap-3 md:flex-col lg:flex-row lg:justify-end max-lg:items-end md:gap-10 lg:gap-3 w-full">
                    <p className="italic capitalize">
                      {order?.status === "menunggu"
                        ? order?.order_items[0]?.product?.isAvailable === false
                          ? "produk sudah terjual"
                          : order?.order_items[0]?.product?.seller?.isActive ===
                            true
                          ? "penjual sudah tidak aktif"
                          : "belum bayar"
                        : order?.status}
                    </p>
                    <div className="flex flex-wrap md:flex-col lg:flex-row items-end md:justify-end w-full gap-3 lg:gap-5">
                      {(order?.order_items[0]?.product?.isAvailable === false ||
                        order?.order_items[0]?.product?.seller?.isActive ===
                          true) &&
                      order?.status === "menunggu" ? (
                        <button
                          onClick={() => handleDelete(order?._id)}
                          className="bg-transparent border border-secondary hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors duration-300 px-5 py-2 rounded-xl"
                        >
                          Hapus
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleOrderDetail(order?._id)}
                            className="bg-transparent border border-secondary hover:bg-primary hover:border-primary transition-colors duration-300 px-4 py-2 rounded-xl"
                          >
                            Lihat detail
                          </button>

                          {order?.status === "selesai" ? (
                            <button
                              className="bg-transparent border border-accent hover:bg-accent hover:text-white transition-colors duration-300 px-8 py-2 rounded-xl"
                              onClick={() => handleReviewModal(order)}
                            >
                              Berikan ulasan
                            </button>
                          ) : order?.status === "menunggu" ? (
                            <>
                              <button
                                onClick={() => handlePaymentDetail(order?._id)}
                                className="bg-primary hover:bg-primaryDark transition-colors duration-300 px-8 py-2 rounded-xl"
                              >
                                Bayar sekarang
                              </button>
                              <button
                                onClick={() => handleCancelModal(order?._id)}
                                className="bg-background hover:bg-red-600 hover:text-white transition-colors duration-300 px-8 py-2 rounded-xl"
                              >
                                Batalkan
                              </button>
                            </>
                          ) : order?.status === "proses" ? (
                            <button
                              onClick={() =>
                                handleStatusChange(order?._id, "selesai")
                              }
                              className="bg-accent hover:bg-accentHover text-white transition-colors duration-300 px-8 py-2 rounded-xl"
                            >
                              Pesanan diterima
                            </button>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* REVIEW MODAL */}
          {reviewModal && (
            <Review product={selectedOrder} onClose={handleReviewModal} />
          )}

          {/* CANCEL MODAL */}
          {cancelModal && (
            <Danger
              title="Batalkan pesanan?"
              message="Anda yakin ingin membatalkan pesanan ini?"
              onClose={handleCancelModal}
              onSubmit={() => handleStatusChange(selectedOrder, "dibatalkan")}
            />
          )}
        </div>
      )}
    </>
  );
}
