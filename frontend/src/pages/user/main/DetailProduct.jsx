import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "../../../components/common/Card";
import { IoStar } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function DetailProduct() {
  const [mainImage, setMainImage] = useState("https://picsum.photos/800");
  const thumbnails = [
    "https://picsum.photos/id/1/800",
    "https://picsum.photos/id/2/800",
    "https://picsum.photos/id/3/800",
    "https://picsum.photos/id/4/800",
  ];

  useEffect(() => {
    setMainImage(thumbnails[0]);
  }, []);

  return (
    <div className="mx-5 md:mx-10">
      {/* STEPPER */}
      <p className="text-sm my-4 cursor-default">
        <Link to="/" className="hover:underline hover:text-secondary">
          Beranda
        </Link>{" "}
        <span className="text-secondary font-medium">{">"}</span>{" "}
        <Link to="/products" className="hover:underline hover:text-secondary">
          Katalog Produk
        </Link>{" "}
        <span className="text-secondary font-medium">{">"}</span>{" "}
        <span className="font-semibold">Detail Produk</span>
      </p>

      {/* DETAIL PRODUK */}
      <div className="flex flex-col items-center md:items-start md:flex-row gap-6 mb-10 mt-5">
        <div className="md:w-10/12 lg:w-6/12 relative">
          <motion.img
            key={mainImage} // Animasi ketika gambar berubah
            src={mainImage}
            alt="Detail Product"
            className="md:w-full rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full z-10">
            <svg
              fill="#a8a8a8"
              className="w-5 h-5 hover:fill-[#ff2525] transition-colors duration-300 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
            </svg>
          </button>
          <div className="flex gap-2 mt-4">
            {thumbnails.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 rounded-lg cursor-pointer ${
                  mainImage === thumb ? "border-2 border-primary" : ""
                }`}
                onClick={() => setMainImage(thumb)}
              />
            ))}
          </div>
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

          <button className="flex justify-center items-center gap-2 bg-primary py-3 px-6 text-xl rounded-xl font-semibold hover:bg-primaryDark transition-colors duration-300">
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

            <div className="flex flex-row gap-2">
              <IoStar className="w-5 h-5 text-yellow-400" />
              <IoStar className="w-5 h-5 text-yellow-400" />
              <IoStar className="w-5 h-5 text-yellow-400" />
              <IoStar className="w-5 h-5 text-yellow-400" />
              <IoStar className="w-5 h-5 text-yellow-400" />
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
            <div className="flex flex-row gap-2">
              <IoStar className="w-5 h-5 text-yellow-400" />
              <IoStar className="w-5 h-5 text-yellow-400" />
              <IoStar className="w-5 h-5 text-yellow-400" />
              <IoStar className="w-5 h-5 text-yellow-400" />
              <IoStar className="w-5 h-5 text-yellow-400" />
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
