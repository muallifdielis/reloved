import TitleSection from "../../../../components/common/TitleSection";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { IoWallet } from "react-icons/io5";
import { useOrderStore } from "../../../../store/orderStore";
import { useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";

export default function PurchaseDetail() {
  const { selectedOrder, getOrderById, order, isLoading } = useOrderStore();

  const navigate = useNavigate();

  console.log("selectedOrder", selectedOrder);
  console.log("order", order);

  useEffect(() => {
    if (selectedOrder) {
      getOrderById(selectedOrder);
    } else {
      navigate("/purchases");
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="p-5 md:px-10 bg-background/25 min-h-svh">
          <div className="container bg-white p-5 md:p-10 rounded-xl">
            <div className="flex justify-between items-center mb-5">
              {/* BACK BUTTON */}
              <Link to="/purchases">
                <IoIosArrowBack className="hover:text-secondary cursor-pointer text-2xl " />
              </Link>
              <p className="italic capitalize">
                {order?.status === "menunggu" ? "Belum bayar" : order?.status}
              </p>
            </div>

            {/* TITLE SECTION */}
            <TitleSection title="Detail Pembelian" />

            {/* DETAIL PESANAN */}
            <div className="flex flex-col gap-5 md:px-28">
              {/* NAMA PEMBELI */}
              <div className="flex flex-wrap items-center justify-between">
                <h4 className="font-medium">Nama penjual</h4>
                <h4>{order?.order_items[0]?.product?.seller?.name}</h4>
              </div>

              {/* PRODUK */}
              <div className="flex flex-wrap max-sm:justify-end justify-between gap-5">
                <img
                  src={order?.order_items[0]?.product?.images[0]}
                  alt={order?.order_items[0]?.product?.name}
                  className="w-16 h-16 rounded-xl object-cover cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/detail-product/${order?.order_items[0]?.product?._id}`
                    )
                  }
                />
                <div
                  className="flex flex-col gap-1 flex-1 cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/detail-product/${order?.order_items[0]?.product?._id}`
                    )
                  }
                >
                  <h4 className="font-medium">
                    {order?.order_items[0]?.product?.name}
                  </h4>
                  <p className="text-sm text-gray-400">
                    1 x{" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(order?.order_items[0]?.price)}
                  </p>
                </div>
                <h4 className="font-medium">
                  {" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(order?.order_items[0]?.price)}
                </h4>
              </div>

              {/* TOTAL */}
              <table className="flex justify-end border-y border-secondary py-3">
                <tbody>
                  <tr>
                    <td className="font-medium pr-6">Subtotal</td>
                    <td className="text-right">
                      {" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(order?.order_items[0]?.price)}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-10">Ongkos kirim</td>
                    <td className="text-right">
                      {order?.shippingMethod === "Reguler"
                        ? "Rp 15.000"
                        : "Rp 0"}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Total</td>
                    <td className="text-right">
                      {" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(order?.total_price)}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* JUMLAH TOTAL */}
              <div className="flex flex-wrap justify-between gap-5">
                <h4 className="font-medium">Jumlah total</h4>
                <h4 className="font-medium">
                  {" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(order?.total_price)}
                </h4>
              </div>

              {/* INFORMASI LAINNYA */}
              <div className="flex flex-col gap-3 border-y border-secondary py-3">
                <h4 className="font-medium text-lg">Informasi lainnya</h4>
                <div className="flex flex-wrap justify-between gap-5">
                  <h4 className="font-medium">No. Pesanan</h4>
                  <h4 className="font-medium uppercase">
                    RLV-{order?._id.slice(-10)}
                  </h4>
                </div>
                <div className="flex flex-wrap justify-between gap-5">
                  <h4 className="font-medium">Waktu Pesanan</h4>
                  <h4 className="font-medium">
                    {order?.createdAt &&
                      format(new Date(order?.createdAt), "dd/MM/yyyy - HH:mm", {
                        locale: id,
                      })}
                  </h4>
                </div>
                <div className="flex flex-wrap justify-between gap-5">
                  <h4 className="font-medium">Jasa Pengiriman</h4>
                  <h4 className="font-medium">
                    {order?.shippingMethod === "Reguler"
                      ? "Reguler (JNT Express)"
                      : "Hemat (AnterAja Economy)"}
                  </h4>
                </div>
                <div className="flex flex-wrap justify-between gap-5">
                  <h4 className="font-medium">Estimasi Pengiriman</h4>
                  <h4 className="font-medium">{order?.deliveryTime}</h4>
                </div>
              </div>

              {/* ALAMAT PENERIMA */}
              <div className="flex flex-col gap-2">
                <h4 className="font-medium text-lg">Alamat Penerima</h4>

                <div className="p-4 border border-secondary rounded-xl flex flex-col gap-2 text-sm">
                  <p className="font-semibold">
                    {order?.shippingAddress?.name}
                  </p>

                  <p>{order?.shippingAddress?.phone}</p>

                  <p className="mt-3">{order?.shippingAddress?.address}</p>
                  {order?.shippingAddress?.details && (
                    <p className="mt-3 text-gray-500">
                      Detail : {order?.shippingAddress?.details}
                    </p>
                  )}
                </div>
              </div>

              {/* BUTTON */}
              {order?.status !== "menunggu" &&
                order?.status !== "dibatalkan" && (
                  <div className="flex flex-col gap-2 border-t border-secondary pt-3">
                    <h4 className="font-medium text-lg">Metode Pembayaran</h4>

                    <div className="flex justify-center">
                      <div className="bg-primary hover:bg-primaryDark font-semibold transition-colors duration-300 px-8 py-3 rounded-xl w-full flex items-center gap-2">
                        <IoWallet className="text-3xl flex justify-start" />
                        <span className="text-center text-lg w-full">
                          e-Wallet
                        </span>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
