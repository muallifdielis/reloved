import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useOrderStore } from "../../../store/orderStore";
import { useEffect, useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/common/Toast";
import { useTransactionStore } from "../../../store/transactionStore";

export default function Shipping() {
  const navigate = useNavigate();
  const { address, selectedProduct, createOrder } = useOrderStore();
  const { createTransaction } = useTransactionStore();
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    name: "Hemat (AnterAja Economy)",
    cost: 0,
    duration: "5-7 hari",
  });
  const [ongkir, setOngkir] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const options = [
    {
      name: "Hemat (AnterAja Economy)",
      cost: 0,
      duration: "5-7 hari",
    },
    {
      name: "Reguler (JNT Express)",
      cost: 15000,
      duration: "2-5 hari",
    },
  ];

  useEffect(() => {
    if (!address) {
      navigate("/checkout");
    }
  }, [address, navigate]);

  const handleShippingModal = () => {
    setShowShippingModal(!showShippingModal);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setShowShippingModal(false);
    setOngkir(option?.cost);
  };

  useEffect(() => {
    setTotalPrice(selectedProduct?.price + ongkir);
  }, [selectedProduct, ongkir]);

  const handleSubmit = async () => {
    try {
      const response = await createOrder({
        shippingAddress: address,
        order_items: [{ product: selectedProduct._id }],
        shippingMethod:
          selectedOption?.name === "Hemat (AnterAja Economy)"
            ? "Hemat"
            : "Reguler",
      });
      console.log("response", response);
      if (response.success === true) {
        showSuccessToast("Pesanan berhasil dibuat");
        localStorage.removeItem("selectedProductId");
        await createTransaction(response?.data?._id);
        localStorage.setItem("selectedOrderId", response?.data?._id);
        navigate("/shipping/detail-payment");
      }
    } catch (error) {
      console.error(error);
      showErrorToast(
        "Terjadi kesalahan saat membuat pesanan. Silakan coba lagi."
      );
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-between gap-6">
      <div className="mx-5 md:mx-10 md:w-6/12 md:mb-10">
        {/* STEPPER */}
        <nav className="hidden md:block text-sm my-4 cursor-default">
          <Link to="/" className="hover:underline hover:text-secondary">
            Beranda
          </Link>{" "}
          <span className="text-secondary font-medium">{">"}</span>{" "}
          <span
            onClick={() => {
              navigate("/cart"), localStorage.removeItem("selectedProductId");
            }}
            className="hover:underline hover:text-secondary"
          >
            Keranjang
          </span>{" "}
          <span className="text-secondary font-medium">{">"}</span>{" "}
          <span className="font-semibold">Pengiriman</span>
        </nav>

        <div className="flex flex-col gap-6">
          {/* ALAMAT PENERIMA */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-medium">Alamat</h2>
              <div className="w-24 h-1.5 bg-primaryDark"></div>
            </div>

            <div className="p-4 border border-secondary rounded-xl flex flex-col gap-2">
              <p className="font-semibold">{address?.name}</p>
              <p>{address?.phone}</p>

              <p className="mt-3">{address?.address}</p>
              {address?.details && (
                <p className="mt-1 text-sm">
                  Detail alamat : {address?.details}
                </p>
              )}
            </div>
          </div>

          {/* PENGIRIMAN */}
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-medium">Pengiriman</h2>
              <div className="w-36 h-1.5 bg-primaryDark"></div>

              <p className="mt-2">Pilih metode pengiriman</p>
            </div>
            <div
              onClick={handleShippingModal}
              className="p-4 border border-secondary rounded-xl flex flex-col gap-2 cursor-pointer hover:bg-gray-100"
            >
              <p className="font-semibold">{selectedOption?.name}</p>
              <p>
                {" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(selectedOption?.cost)}{" "}
                {selectedOption?.cost === 0 && (
                  <span className="text-sm font-light">(Gratis Ongkir)</span>
                )}
              </p>
              <p className="text-sm text-gray-400">
                {selectedOption?.duration}
              </p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="flex justify-center items-center gap-2 bg-accent hover:bg-accentHover text-white py-3 px-6 mb-10 md:mb-0 text-xl rounded-xl font-bold transition-colors duration-300"
          >
            Lanjut ke pembayaran <IoIosArrowForward className="text-3xl" />
          </button>
        </div>
      </div>

      {/* PESANAN */}
      <div className="bg-background/25 p-5 md:p-10 md:w-5/12 md:min-h-svh">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 md:mt-3">
            <h2 className="text-2xl font-medium">Pesanan</h2>
            <div className="w-28 h-1.5 bg-primaryDark"></div>
          </div>
        </div>

        {/* SELLER */}
        <div className="flex flex-row items-center gap-4 my-5">
          <img
            src={
              selectedProduct?.seller?.image
                ? selectedProduct?.seller?.image
                : "/avatar.png"
            }
            alt="Seller Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{selectedProduct?.seller?.name}</p>
            <p className="text-sm text-gray-400">
              @{selectedProduct?.seller?.username}
            </p>
          </div>
        </div>

        {/* PRODUCT */}
        <div className="flex flex-row gap-4 my-5">
          <img
            src={selectedProduct?.images[0]}
            alt={selectedProduct?.name}
            className="w-24 h-24 rounded-xl object-cover"
          />

          <div className="flex flex-row flex-wrap justify-between w-full">
            <div className="flex flex-col gap-1">
              <p>{selectedProduct?.name}</p>
              <p className="text-sm text-gray-500">
                1 x{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(selectedProduct?.price)}
              </p>
            </div>
            <p className="font-semibold">
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(selectedProduct?.price)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-5 ">
          <div className="flex flex-row justify-between items-center">
            <p className="text-lg font-medium">Harga</p>
            <p className="text-lg font-semibold">
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(selectedProduct?.price)}
            </p>
          </div>

          <div className="flex flex-row justify-between flex-wrap items-center">
            <p className="text-lg font-medium">Pengiriman</p>
            <p className="text-lg font-semibold">
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(ongkir)}{" "}
              {selectedOption?.cost === 0 && (
                <span className="text-sm font-light">(Gratis Ongkir)</span>
              )}
            </p>
          </div>

          <div className="flex flex-row justify-between border-t border-secondary py-5">
            <p className="text-lg font-medium">Total</p>
            <p className="text-2xl font-semibold">
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(totalPrice)}
            </p>
          </div>
        </div>
      </div>

      {/* SELECT SHIPPING METHOD MODAL */}
      {showShippingModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 max-w-md rounded-lg mx-5 flex flex-col md:min-w-96">
            <h3 className="text-xl font-semibold mb-4">
              Pilih Metode Pengiriman
            </h3>
            <ul className="flex flex-col gap-4">
              {options.map((option, index) => (
                <li
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedOption.name === option.name
                      ? "border-secondary bg-gray-100"
                      : "border-gray-300 hover:border-secondary"
                  }`}
                  onClick={() => handleSelectOption(option)}
                >
                  <p className="font-semibold">{option.name}</p>
                  <p>
                    {" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(option?.cost)}{" "}
                    {option?.cost === 0 && (
                      <span className="text-sm font-light">
                        (Gratis Ongkir)
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-400">{option.duration}</p>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowShippingModal(false)}
              className="mt-6 w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primaryDark"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
