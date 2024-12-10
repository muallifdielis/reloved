import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../../../store/cartStore";
import { useEffect, useState } from "react";
import useProductStore from "../../../store/productStore";
import { useOrderStore } from "../../../store/orderStore";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/common/Toast";

export default function Checkout() {
  const navigate = useNavigate();
  const { selectedCart } = useCartStore();
  const { getProductById, selectedProduct, isLoading } = useProductStore();
  const { setOrderAddress } = useOrderStore();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    details: "",
  });

  useEffect(() => {
    if (!selectedCart) {
      navigate("/cart");
    } else {
      getProductById(selectedCart);
    }
  }, [selectedCart, navigate]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/\D/g, "").slice(0, 16);
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      showErrorToast("Semua field harus diisi.");
      return;
    }

    if (formData.name.length < 3) {
      showErrorToast("Nama harus memiliki minimal 3 karakter.");
      return;
    }

    if (formData.phone.length < 9) {
      showErrorToast("Nomor telepon harus memiliki minimal 9 angka.");
      return;
    }

    setOrderAddress(formData, selectedProduct);
    showSuccessToast("Alamat pengiriman berhasil disimpan");
    navigate("/shipping");
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-6">
          <div className="mx-5 md:mx-10 md:w-6/12 md:mb-10">
            {/* STEPPER */}
            <p className="hidden md:block text-sm my-4 cursor-default">
              <Link to="/" className="hover:underline hover:text-secondary">
                Beranda
              </Link>{" "}
              <span className="text-secondary font-medium">{">"}</span>{" "}
              <Link to="/cart" className="hover:underline hover:text-secondary">
                Keranjang
              </Link>{" "}
              <span className="text-secondary font-medium">{">"}</span>{" "}
              <span className="font-semibold">Pengiriman</span>
            </p>

            {/* ALAMAT PENGIRIMAN */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-medium">Alamat</h2>
                <div className="w-24 h-1.5 bg-primaryDark"></div>
              </div>

              <form onSubmit={handleCheckout} className="mt-2">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="Name"
                      className="block overflow-hidden rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary"
                    >
                      <span className="text-sm"> Nama </span>

                      <input
                        type="text"
                        id="Name"
                        name="name"
                        onChange={handleFormChange}
                        value={formData.name}
                        placeholder="Masukkan nama Anda"
                        className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="PhoneNumber"
                      className="block overflow-hidden rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary"
                    >
                      <span className="text-sm"> Nomor Telepon </span>

                      <input
                        type="text"
                        id="PhoneNumber"
                        name="phone"
                        onChange={handleFormChange}
                        value={formatPhoneNumber(formData.phone)}
                        placeholder="Masukkan nomor telepon Anda"
                        className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="Address"
                      className="block overflow-hidden rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary"
                    >
                      <span className="text-sm"> Alamat Lengkap </span>

                      <textarea
                        id="Address"
                        name="address"
                        onChange={handleFormChange}
                        value={formData.address}
                        placeholder="Masukkan alamat lengkap Anda"
                        className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      />
                    </label>
                    <p className="text-xs text-gray-400">
                      Pastikan alamat benar! Contoh : nama perumahan, apartemen,
                      atau kost.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 my-5">
                    <label
                      htmlFor="Address"
                      className="block overflow-hidden rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary"
                    >
                      <textarea
                        id="Address"
                        name="details"
                        onChange={handleFormChange}
                        value={formData.details}
                        placeholder="Detail lainnya (opsional)"
                        className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      />
                    </label>
                    <p className="text-xs text-gray-400">
                      Contoh : blok atau patokan lain.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="flex justify-center items-center gap-2 bg-primary py-3 px-6 mb-10 md:mb-0 text-xl rounded-xl font-bold hover:bg-primaryDark transition-colors duration-300"
                  >
                    Lanjut ke pengiriman{" "}
                    <IoIosArrowForward className="text-3xl" />
                  </button>
                </div>
              </form>
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
                src={selectedProduct?.seller?.image}
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
                <p className="text-sm">di tahap selanjutnya</p>
              </div>

              <div className="flex flex-row justify-between border-t border-secondary py-5">
                <p className="text-lg font-medium">Total</p>
                <p className="text-2xl font-semibold">
                  {" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(selectedProduct?.price)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
