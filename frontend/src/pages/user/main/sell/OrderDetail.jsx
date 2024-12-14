import React from "react";
import TitleSection from "../../../../components/common/TitleSection";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";

export default function OrderDetail() {
  const location = useLocation();
  const orderData = location.state;

  console.log("order detail data", orderData);

  if (!orderData) {
    return <LoadingSpinner />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}.${minutes}`;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="p-5 md:px-10 bg-background/25">
      <div className="container bg-white p-5 md:p-10 rounded-xl relative">
        <Link to="/seller/orders">
          <IoIosArrowBack className="hover:text-secondary cursor-pointer text-2xl absolute top-6 left-5" />
        </Link>

        <TitleSection title="Detail Pesanan Masuk" />

        {/* DETAIL PESANAN */}
        <div className="flex flex-col gap-5 md:px-28">
          <div className="flex flex-wrap items-center justify-between">
            <h4 className="font-medium">Nama pembeli</h4>
            <h4>{orderData.data.user.name}</h4>
          </div>

          <div className="flex flex-wrap max-sm:justify-end justify-between gap-5">
            <img
              src={orderData.data.order_items[0].product.images[0]}
              alt="Product Image"
              className="w-16 h-16 rounded-xl"
            />
            <div className="flex flex-col gap-1 flex-1">
              <h4 className="font-medium">
                {orderData.data.order_items[0].product.name}
              </h4>
              <p className="text-sm text-gray-400">
                1 x Rp{" "}
                {formatCurrency(orderData.data.order_items[0].product.price)}
              </p>
            </div>
            <h4 className="font-medium">
              {formatCurrency(orderData.data.order_items[0].product.price)}
            </h4>
          </div>

          {/* TOTAL */}
          <table className="flex justify-end border-y border-secondary py-3">
            <tbody>
              <tr>
                <td className="font-medium pr-6">Subtotal</td>
                <td className="text-right">
                  {formatCurrency(orderData.data.order_items[0].price)}
                </td>
              </tr>
              <tr>
                <td className="pr-10">Ongkos kirim</td>
                <td className="text-right">
                  {formatCurrency(
                    orderData.data.shippingMethod == "Reguler" ? 15000 : 0
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-medium">Total</td>
                <td className="text-right">
                  {formatCurrency(orderData.data.total_price)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* JUMLAH TOTAL */}
          <div className="flex flex-wrap justify-between gap-5">
            <h4 className="font-medium">Jumlah total</h4>
            <h4 className="font-medium">
              {formatCurrency(orderData.data.total_price)}
            </h4>
          </div>

          {/* INFORMASI LAINNYA */}
          <div className="flex flex-col gap-3 border-y border-secondary py-3">
            <h4 className="font-medium text-lg">Informasi lainnya</h4>
            <div className="flex flex-wrap justify-between gap-5">
              <h4 className="font-medium">No. Pesanan</h4>
              <h4 className="font-medium">
                RLV-{orderData.data._id.toUpperCase().slice(0, 10)}
              </h4>
            </div>
            <div className="flex flex-wrap justify-between gap-5">
              <h4 className="font-medium">Waktu Pesanan</h4>
              <h4 className="font-medium">
                {formatDate(orderData.data.createdAt)}
              </h4>
            </div>
          </div>

          {/* ALAMAT PENERIMA */}
          <div className="flex flex-col gap-2">
            <h4 className="font-medium text-lg">Alamat Penerima</h4>

            <div className="p-4 border border-secondary rounded-xl flex flex-col gap-2 text-sm">
              <p className="font-semibold">
                {orderData.data.shippingAddress.name}
              </p>

              <p>{orderData.data.shippingAddress.phone}</p>

              <p className="mt-3">{orderData.data.shippingAddress.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
