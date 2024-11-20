import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "../../../components/common/Card";

export default function DetailProduct() {
  return (
    <div className="mx-5 md:mx-10">
      {/* STEPPER */}
      <p className="text-sm my-4 cursor-default">
        <Link to="/" className="hover:underline hover:text-secondary">
          Beranda
        </Link>{" "}
        <span className="text-secondary font-medium">{">"}</span>{" "}
        <Link
          to="/katalog-produk"
          className="hover:underline hover:text-secondary"
        >
          Katalog Produk
        </Link>{" "}
        <span className="text-secondary font-medium">{">"}</span> Detail Produk
      </p>

      {/* DETAIL PRODUK */}
      <div className="flex flex-col items-center md:items-start md:flex-row gap-6 mb-10 mt-5">
        <div className="md:w-10/12 lg:w-6/12">
          <img
            src="https://picsum.photos/800"
            alt="Detail Product"
            className="md:w-full rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-3 md:w-10/12">
          <h2 className="text-3xl font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nobis
          </h2>
          <p className="text-sm">Ukuran : M • Kondisi : Baru</p>
          <p className="text-lg font-medium">Rp 435.000</p>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>

          <button className="flex justify-center items-center gap-2 bg-primaryDark md:bg-primary py-3 px-6 text-xl rounded-xl font-semibold hover:bg-primaryDark transition-colors duration-300">
            <FaPlus /> Masukkan Keranjang
          </button>

          <p className="text-sm text-gray-400">3 hari yang lalu</p>

          <div className="flex items-center gap-3">
            <img
              src="https://picsum.photos/800"
              alt="Profile Picture"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-sm font-semibold">John Doe</p>
              <p className="text-sm text-gray-400">@johndoe</p>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEW */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-medium">
          Ulasan <span className="text-sm">(2)</span>
        </h2>
        <div className="flex flex-row flex-nowrap gap-4 overflow-x-scroll pb-10 pl-2">
          <div className="flex flex-col gap-4 border border-secondary rounded-xl p-4 h-max min-w-96">
            <div className="flex flex-row justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://picsum.photos/800"
                  alt="Profile Picture"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">John Doe</p>
                  <p className="text-sm text-gray-400">@johndoe</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">3 hari yang lalu</p>
              </div>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
          <div className="flex flex-col gap-4 border border-secondary rounded-xl p-4 h-max min-w-96">
            <div className="flex flex-row justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://picsum.photos/800"
                  alt="Profile Picture"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">John Doe</p>
                  <p className="text-sm text-gray-400">@johndoe</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">3 hari yang lalu</p>
              </div>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </div>
      </div>

      {/* PRODUK LAIN */}
      <div className="flex flex-col gap-4 mb-10">
        <h2 className="text-2xl font-medium">Kamu mungkin suka</h2>

        <div className="flex flex-row flex-nowrap gap-4 items-center overflow-x-scroll pb-10 pl-2">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}
