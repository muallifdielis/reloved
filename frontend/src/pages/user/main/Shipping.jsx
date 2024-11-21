import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Shipping() {
  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-between gap-6">
      <div className="mx-5 md:mx-10 md:w-6/12 md:mb-10">
        {/* STEPPER */}
        <p className="hidden md:block text-sm my-4 cursor-default">
          <Link to="/" className="hover:underline hover:text-secondary">
            Beranda
          </Link>{" "}
          <span className="text-secondary font-medium">{">"}</span>{" "}
          <Link to="/" className="hover:underline hover:text-secondary">
            Keranjang
          </Link>{" "}
          <span className="text-secondary font-medium">{">"}</span> Pengiriman
        </p>

        <div className="flex flex-col gap-6">
          {/* ALAMAT PENERIMA */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-medium">Alamat</h2>
              <div className="w-24 h-1.5 bg-primaryDark"></div>
            </div>

            <div className="p-4 border border-secondary rounded-xl flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold">
                  John Doe <span className="font-normal text-sm">(alamat)</span>
                </p>
                <Link to="/checkout">
                  <FaRegEdit className="text-xl font-bold hover:text-secondary cursor-pointer" />
                </Link>
              </div>

              <p>081234567890</p>

              <p className="mt-3">123 Street, City, Country</p>
            </div>
          </div>

          {/* PENGIRIMAN */}
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-medium">Pengiriman</h2>
              <div className="w-36 h-1.5 bg-primaryDark"></div>
            </div>
            <div className="p-4 border border-secondary rounded-xl flex flex-col gap-2">
              <p className="font-semibold">Reguler (JNT Express) </p>
              <p>Rp 0 (Gratis Ongkir)</p>
              <p className="text-sm text-gray-400">2-5 hari</p>
            </div>
          </div>

          <button className="flex justify-center items-center gap-2 bg-accent hover:bg-accentHover text-white py-3 px-6 mb-10 md:mb-0 text-xl rounded-xl font-bold transition-colors duration-300">
            Lanjut ke pembayaran <IoIosArrowForward className="text-3xl" />
          </button>
        </div>
      </div>

      {/* PESANAN */}
      <div className="bg-background/25 p-5 md:p-10 md:w-5/12">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 md:mt-3">
            <h2 className="text-2xl font-medium">Pesanan</h2>
            <div className="w-28 h-1.5 bg-primaryDark"></div>
          </div>
        </div>

        {/* SELLER */}
        <div className="flex flex-row items-center gap-4 my-5">
          <img
            src="https://picsum.photos/200"
            alt="Seller Profile"
            className="w-16 h-16 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Nama Toko</p>
            <p className="text-sm text-gray-400">@username</p>
          </div>
        </div>

        {/* PRODUCT */}
        <div className="flex flex-row gap-4 my-5">
          <img
            src="https://picsum.photos/200"
            alt="Product"
            className="w-24 h-24 rounded-xl"
          />

          <div className="flex flex-row flex-wrap justify-between w-full">
            <p>Nama Produk</p>
            <p className="font-semibold">Rp 200.000</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-5 ">
          <div className="flex flex-row justify-between items-center">
            <p className="text-lg font-medium">Harga</p>
            <p className="text-lg font-semibold">Rp 200.000</p>
          </div>

          <div className="flex flex-row justify-between flex-wrap items-center">
            <p className="text-lg font-medium">Pengiriman</p>
            <p className="text-lg font-semibold">Rp 0</p>
          </div>

          <div className="flex flex-row justify-between border-t border-secondary py-5">
            <p className="text-lg font-medium">Total</p>
            <p className="text-2xl font-semibold">Rp 200.000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
