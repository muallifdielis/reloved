import { FaWallet, FaQrcode, FaRegClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

export default function DetailPayment() {
  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-between gap-6">
      <div className="mx-2 mb-6 lg:mx-5 md:mx-2 md:w-6/12 lg:w-7/12 md:mb-10">
        {/* Breadcrumb*/}
        <nav className="text-sm text-accent mb-6 p-4 md:px-6 md:flex md:flex-row items-center hidden md:flex-nowrap">
          <Link to="/" className="hover:underline hover:text-secondary">
            Beranda
          </Link>
          <FiChevronRight className="text-secondary inline mx-1" />
          <Link to="/cart" className="hover:underline hover:text-secondary">
            Keranjang
          </Link>
          <FiChevronRight className="text-secondary inline mx-1" />
          <Link to="/shipping" className="hover:underline hover:text-secondary">
            Pengiriman
          </Link>
          <FiChevronRight className="text-secondary inline mx-1" />
          <span className="font-semibold">Pembayaran</span>
        </nav>

        {/* Title Section */}
        <div className="flex flex-col justify-center items-center my-2 md:mt-10">
          <h2 className="text-2xl font-medium text-center">Pembayaran</h2>
          <div className="w-24 h-1.5 mt-1 bg-primaryDark"></div>
        </div>

        {/* Payment Info */}
        <div className="flex flex-col gap-6 p-6 lg:p-4">
          <div className="p-10 border border-secondary rounded-xl flex flex-col gap-2">
            <p className="text-sm lg:text-lg font-semibold text-gray-700 text-center">
              BAYAR SEBELUM 18 NOVEMBER 2024 PUKUL 23.59
            </p>
            <p className="text-3xl font-bold text-black mt-2 text-center">
              Rp 435.000
            </p>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col gap-6 p-0">
            <h3 className="text-lg font-semibold">Metode Pembayaran</h3>

            <button className="flex items-center justify-between p-4 bg-primary text-black font-semibold rounded-lg hover:bg-secondaryHover">
              <FaWallet className="text-2xl" />
              <span className="mx-auto">e-Wallet</span>
            </button>

            <button className="flex items-center justify-between p-4 border border-primaryDark rounded-lg font-semibold hover:bg-primaryDark">
              <FaQrcode className="text-2xl" />
              <span className="mx-auto">Pembayaran QR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-background/25 p-4 md:pb-5 w-full md:w-6/12">
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
                ID Transaksi:{" "}
              </span>
              <span className="text-black font-regular">123456</span>
            </p>
            <p className="p-2 flex items-center space-x-2 md:space-x-4 md:px-3 mx-auto">
              <FaRegClock className="text-lg hidden md:hidden lg:block" />
              <span>Bayar sebelum 18 November 2024 pukul 23.59</span>
            </p>
          </div>

          {/* Product Summary */}
          <div className="flex flex-col gap-5 px-4">
            {/* Product Item */}
            <div className="flex justify-between">
              <div>
                <p className="font-medium text-sm md:text-base">
                  Lorem ipsum odor amet
                </p>
                <p className="text-sm md:text-base">1 X Rp. 435.000</p>
              </div>
              <p className="font-medium text-black text-sm md:text-base">
                Rp 435.000
              </p>
            </div>
            <div className="flex flex-row justify-between border-t border-secondary"></div>

            {/* Price Details */}
            <div className="text-sm md:text-base text-black">
              <div className="flex justify-between items-center font-medium">
                <p className="mr-4 md:mr-8">Subtotal</p>
                <p>Rp 435.000</p>
              </div>
              <div className="flex justify-between items-center font-light">
                <p className="mr-4 md:mr-8">Ongkos kirim</p>
                <p>Rp 0</p>
              </div>
              <div className="flex justify-between items-center font-medium">
                <p className="mr-4 md:mr-8">Total biaya</p>
                <p>Rp 435.000</p>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-t border-secondary py-5">
              <div className="flex justify-between w-full text-black font-bold">
                <p className="text-sm md:text-base">Jumlah Total</p>
                <p className="text-sm md:text-base">Rp 435.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
