import React from "react";
import BannerSection from "../../../components/pages/home-components/BannerSection";
import HeroSection from "../../../components/pages/home-components/HeroSection";
import TitleSection from "../../../components/common/TitleSection";
import Card from "../../../components/common/Card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useProductStore from "../../../store/productStore";
import { useEffect, useState } from "react";

export default function Home() {
  const { products, getAllProducts, isLoading, error } = useProductStore();

  useEffect(() => {
    // Call to fetch all products when the component mounts
    getAllProducts();
  }, [getAllProducts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* HERO SECTION */}
      <HeroSection />

      <div className="my-10">
        {/* PRODUK TERBARU SECTION */}
        <TitleSection title="Produk Terbaru" />
        <motion.div
          className="flex flex-row flex-nowrap overflow-x-scroll pb-10 px-5 md:px-2 gap-4 md:mx-10 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {products.slice(0, 4).map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </motion.div>

        {/* BELANJA BERDASARKAN KATEGORI SECTION */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <TitleSection title="Belanja Berdasarkan Kategori" />
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center my-8">
            <Link to="/products?category=pria">
              <div className="flex flex-col justify-center items-center gap-4 transition duration-300 ease-in-out hover:scale-105">
                <img src="./men.png" alt="Men" className="w-10/12" />
                <p className="text-center font-semibold text-xl">Pria</p>
              </div>
            </Link>

            <Link to="/products?category=wanita">
              <div className="flex flex-col justify-center items-center gap-4 transition duration-300 ease-in-out hover:scale-105">
                <img src="./women.png" alt="Women" className="w-10/12" />
                <p className="text-center font-semibold text-xl">Wanita</p>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* BANNER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <BannerSection />
        </motion.div>

        {/* KENAPA HARUS PILIH RELOVED? SECTION */}
        <motion.div
          className="my-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
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
        </motion.div>
      </div>
    </>
  );
}
