import { useNavigate } from "react-router-dom";
import { useOrderStore } from "../../../../store/orderStore";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";

export default function Orders() {
  const { getSellerOrders, sellerOrders, isLoading, orderDetail } =
    useOrderStore();
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("semua");
  const [statusLength, setStatusLength] = useState({
    semua: 0,
    proses: 0,
    selesai: 0,
  });

  useEffect(() => {
    getSellerOrders();
  }, [getSellerOrders]);

  useEffect(() => {
    setStatusLength({
      semua: sellerOrders?.length,
      proses: sellerOrders?.filter((order) => order?.status === "proses")
        .length,
      selesai: sellerOrders?.filter((order) => order?.status === "selesai")
        .length,
    });
  }, [sellerOrders]);

  const filteredOrders =
    selectedStatus === "semua"
      ? sellerOrders
      : sellerOrders.filter((order) => order.status === selectedStatus);

  const handleOrderDetail = (id) => {
    orderDetail(id);
    navigate("/seller/orders/detail");
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="py-0 px-4 mx-auto bg-gray-25">
          {/* Title Section */}
          <div className="container">
            <div className="text-center mt-2">
              <h1 className="text-2xl font-semibold text-gray-800 leading-tight">
                Daftar Pesanan Masuk
              </h1>
              <div className="w-28 h-1.5 bg-primaryDark  md:w-20 lg:w-24 mx-auto mt-2"></div>
            </div>
          </div>

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
                  Semua <span className="text-xs">({statusLength?.semua})</span>
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
              </nav>
            </div>
          </div>

          {/* PURCHASES */}
          <div className="container flex flex-col gap-5">
            {filteredOrders?.length === 0 ? (
              <div className="flex flex-col items-center">
                <h1 className="text-gray-500 mb-3">
                  {selectedStatus === "semua"
                    ? "Belum ada pesanan"
                    : `Belum ada pesanan yang ${selectedStatus}`}
                </h1>
              </div>
            ) : (
              filteredOrders?.map((order) => (
                <div
                  key={order?._id}
                  className="flex flex-col lg:flex-row items-center lg:items-start bg-white rounded-xl shadow p-4 gap-4 flex-1"
                >
                  <img
                    src={order?.order_items[0]?.product?.images[0]}
                    alt={order?.order_items[0]?.product?.name}
                    className="w-40 h-40 rounded-xl lg:w-32 lg:h-32"
                  />

                  <div className="flex flex-col w-full">
                    <h4 className="font-medium text-lg">
                      {order?.order_items[0]?.product?.name}
                    </h4>
                    <p className="text-gray-600 text-sm font-medium">
                      1 x{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(order?.total_price)}
                    </p>
                  </div>

                  <div className="flex flex-wrap-reverse lg:flex-wrap gap-3 lg:flex-row lg:justify-end max-lg:items-end lg:gap-3 w-full">
                    <p className="italic capitalize">{order?.status}</p>
                    <div className="flex flex-col lg:flex-row items-end lg:justify-end w-full gap-3 lg:gap-5">
                      <button
                        onClick={() => handleOrderDetail(order?._id)}
                        className="bg-transparent border border-secondary hover:bg-primary hover:border-primary transition-colors duration-300 px-4 py-2 rounded-xl w-full max-md:mt-4"
                      >
                        Lihat detail
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}
