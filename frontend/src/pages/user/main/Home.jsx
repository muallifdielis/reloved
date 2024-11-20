import React from "react";
import BannerSection from "../../../components/pages/home-components/BannerSection";
import HeroSection from "../../../components/pages/home-components/HeroSection";
import TitleSection from "../../../components/common/TitleSection";
import Card from "../../../components/common/Card";

export default function Home() {
  return (
<<<<<<< Updated upstream
    <>
      {/* HERO SECTION */}
      <HeroSection />

      <div className="my-10">
        {/* PRODUK TERBARU SECTION */}
        <TitleSection title="Produk Terbaru" />
        <div className="flex flex-row flex-nowrap overflow-x-scroll pb-10 px-5 md:px-2 gap-4 md:mx-10 items-center">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        {/* BELANJA BERDASARKAN KATEGORI SECTION */}
        <TitleSection title="Belanja Berdasarkan Kategori" />
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center my-8">
          <div className="flex flex-col justify-center items-center gap-4 transition duration-300 ease-in-out hover:scale-105">
            <img src="./men.png" alt="Men" className="w-10/12" />
            <p className="text-center font-semibold text-xl">Pria</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 transition duration-300 ease-in-out hover:scale-105">
            <img src="./women.png" alt="Women" className="w-10/12" />
            <p className="text-center font-semibold text-xl">Wanita</p>
          </div>
        </div>

        {/* BANNER SECTION */}
        <BannerSection />

        {/* KENAPA HARUS PILIH RELOVED? SECTION */}
        <div className="my-10">
          <TitleSection title="Kenapa Harus Pilih ReLoved?" />
          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container place-items-center">
            <div className="bg-white shadow-lg rounded-lg p-4 w-80 h-80 flex flex-col justify-center items-center">
              <img
                src="./bestQuality.png"
                alt="Quality"
                className="w-40 h-40 rounded-full"
              />
              <h3 className="text-lg font-semibold mt-2">Kualitas Terbaik</h3>
              <p className="text-sm mt-2 text-center">
                Setiap barang dipilih dengan cermat, memastikan kualitas tetap
                terjaga meski preloved.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 w-80 h-80 flex flex-col justify-center items-center">
              <img
                src="./bestPrice.png"
                alt="Quality"
                className="w-40 h-40 rounded-full"
              />
              <h3 className="text-lg font-semibold mt-2">Harga Terjangkau</h3>
              <p className="text-sm mt-2 text-center">
                Temukan barang dengan harga terjangkau dan tetap stylish!
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 w-80 h-80 flex flex-col justify-center items-center md:col-span-2 md:mx-auto lg:col-span-1">
              <img
                src="./shipping.png"
                alt="Quality"
                className="w-40 h-40 rounded-full"
              />
              <h3 className="text-lg font-semibold mt-2">Pengiriman Cepat</h3>
              <p className="text-sm mt-2 text-center">
                Pengiriman cepat, barang sampai tepat waktu dan aman!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
=======
    <div>
      <h1 className="font-title">Home</h1>
      <h1 className="font-title">Home</h1>
    </div>
>>>>>>> Stashed changes
  );
}
