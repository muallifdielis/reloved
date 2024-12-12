import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { useEffect } from "react";
import { useOrderStore } from "../../../store/orderStore";

export default function DetailPayment() {
  const { getOrderById, order } = useOrderStore();
  const orderId = localStorage.getItem("selectedOrderId");

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId);
    }
  }, [getOrderById, orderId]);

  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-between gap-6">
      <div className="mx-2 mb-6 lg:mx-5 md:mx-2 md:w-6/12 lg:w-7/12 md:mb-10">
        {/* Breadcrumb*/}
        <nav className="text-sm mb-6 p-4 md:px-6 md:flex md:flex-row items-center hidden md:flex-nowrap">
          <Link to="/" className="hover:underline hover:text-secondary">
            Beranda
          </Link>
          <FiChevronRight className="text-secondary inline" />
          <Link to="/cart" className="hover:underline hover:text-secondary">
            Keranjang
          </Link>
          <FiChevronRight className="text-secondary inline" />
          <span>Pengiriman</span>
          <FiChevronRight className="text-secondary inline" />
          <span className="font-semibold">Pembayaran</span>
        </nav>

        {/* Title Section */}
        <div className="flex flex-col justify-center items-center my-2 md:mt-10">
          <h2 className="text-2xl font-medium text-center">Pembayaran</h2>
          <div className="w-24 h-1.5 mt-1 bg-primaryDark"></div>
        </div>

        {/* Payment Info */}
        <div className="lg:w-8/12 mx-auto py-5">
          <iframe
            src={order?.transaction?.payment_url}
            title="Midtrans Payment"
            className=""
            style={{
              height: "600px",
              width: "100%",
              maxWidth: "100%",
              minHeight: "300px",
              margin: "0 auto",
            }}
          ></iframe>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-background/25 p-4 md:pb-5 w-full md:w-6/12 md:min-h-svh">
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col justify-center items-center mt-8 md:mt-20">
            <h2 className="text-2xl font-medium text-center">
              Ringkasan Pesanan
            </h2>
            <div className="w-28 h-1.5 bg-primaryDark"></div>
          </div>

          {/* Transaction Info */}
          <div className="flex flex-col text-sm md:text-base text-gray-600 m-0 p-0 text-center">
            <p>
              <span className="font-semibold text-black-800">
                ID Transaksi:
              </span>{" "}
              <span className="text-black font-regular">
                {order?.transaction?.transaction_id}
              </span>
            </p>
          </div>

          {/* Product Summary */}
          <div className="flex flex-col gap-5 px-4">
            {/* Product Item */}
            <div className="flex justify-between">
              <div>
                <p className="font-medium text-sm md:text-base">
                  {order?.order_items[0]?.product?.name}
                </p>
                <p className="text-sm md:text-base">
                  1 x{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(order?.order_items[0]?.product?.price)}
                </p>
              </div>
              <p className="font-medium text-black text-sm md:text-base">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(order?.order_items[0]?.product?.price)}
              </p>
            </div>
            <div className="flex flex-row justify-between border-t border-secondary"></div>

            {/* Price Details */}
            <div className="text-sm md:text-base text-black">
              <div className="flex justify-between items-center font-medium">
                <p className="mr-4 md:mr-8">Subtotal</p>
                <p>
                  {" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(order?.order_items[0]?.product?.price)}
                </p>
              </div>
              <div className="flex justify-between items-center font-light">
                <p className="mr-4 md:mr-8">Ongkos kirim</p>
                <p>
                  {order?.shippingMethod === "Reguler" ? "Rp 15.000" : "Rp 0"}
                </p>
              </div>
              <div className="flex justify-between items-center font-medium">
                <p className="mr-4 md:mr-8">Total biaya</p>
                <p>
                  {" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(order?.total_price)}
                </p>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-t border-secondary py-5">
              <div className="flex justify-between w-full text-black font-bold">
                <p className="text-sm md:text-base">Jumlah Total</p>
                <p className="text-sm md:text-base">
                  {" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(order?.total_price)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
