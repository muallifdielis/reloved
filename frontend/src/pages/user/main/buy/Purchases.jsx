import React, { useState } from "react";
import TitleSection from "../../../../components/common/TitleSection";
import { Link } from "react-router-dom";
import Review from "../../../../components/modals/Review";

export default function Purchases() {
  const [reviewModal, setReviewModal] = useState(false);

  const handleReviewModal = () => {
    setReviewModal(!reviewModal);
  };

  return (
    <div className="py-5 bg-background/25">
      <TitleSection title="Riwayat Pembelian" />

      {/* TABS */}
      <div className="flex container mt-10 mb-5 overflow-x-auto">
        <div className="border-b border-gray-200 md:w-full">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            <a
              href="#"
              className="shrink-0 border-b-2 border-secondary px-1 pb-4 text-sm font-medium text-secondary"
              aria-current="page"
            >
              Semua <span className="text-xs">(3)</span>
            </a>

            <a
              href="#"
              className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-secondary hover:text-secondary"
            >
              Belum Bayar <span className="text-xs">(1)</span>
            </a>

            <a
              href="#"
              className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-secondary hover:text-secondary"
            >
              Diproses <span className="text-xs">(1)</span>
            </a>

            <a
              href="#"
              className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-secondary hover:text-secondary"
            >
              Selesai <span className="text-xs">(1)</span>
            </a>

            <a
              href="#"
              className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-secondary hover:text-secondary"
            >
              Dibatalkan <span className="text-xs">(1)</span>
            </a>
          </nav>
        </div>
      </div>

      {/* PURCHASES */}
      <div className="container flex flex-col gap-5">
        {/* PESANAN SELESAI */}
        <div className="flex flex-col md:flex-row max-sm:items-center bg-white rounded-xl shadow p-4 gap-4 w-full">
          <img
            src="https://picsum.photos/100"
            alt="Product Image"
            className="w-40 h-40 rounded-xl"
          />

          <div className="flex flex-col w-full">
            <h4 className="font-medium text-lg">Lorem ipsum dolor sit</h4>
            <p className="text-gray-600 text-sm font-medium">1 x Rp 435.000</p>
          </div>

          <div className="flex flex-wrap-reverse md:flex-wrap gap-3 md:flex-col lg:flex-row lg:justify-end max-lg:items-end md:gap-10 lg:gap-3 w-full">
            <p className="italic">Selesai</p>
            <div className="flex flex-wrap md:flex-col lg:flex-row items-end md:justify-end w-full gap-3 lg:gap-5">
              <Link to="/purchases/detail">
                <button className="bg-transparent border border-secondary hover:bg-primary hover:border-primary transition-colors duration-300 px-4 py-2 rounded-xl">
                  Lihat detail
                </button>
              </Link>
              <button
                className="bg-transparent border border-accent hover:bg-accent hover:text-white transition-colors duration-300 px-8 py-2 rounded-xl"
                onClick={handleReviewModal}
              >
                Berikan ulasan
              </button>
            </div>
          </div>
        </div>

        {/* PESANAN DIPROSES */}
        <div className="flex flex-col md:flex-row max-sm:items-center bg-white rounded-xl shadow p-4 gap-4 w-full">
          <img
            src="https://picsum.photos/100"
            alt="Product Image"
            className="w-40 h-40 rounded-xl"
          />

          <div className="flex flex-col w-full">
            <h4 className="font-medium text-lg">Lorem ipsum dolor sit</h4>
            <p className="text-gray-600 text-sm font-medium">1 x Rp 435.000</p>
          </div>

          <div className="flex flex-wrap-reverse md:flex-wrap gap-3 md:flex-col lg:flex-row lg:justify-end max-lg:items-end md:gap-10 lg:gap-3 w-full">
            <p className="italic">Diproses</p>
            <div className="flex flex-wrap md:flex-col lg:flex-row items-end md:justify-end w-full gap-3 lg:gap-5">
              <button className="bg-transparent border border-secondary hover:bg-primary hover:border-primary transition-colors duration-300 px-4 py-2 rounded-xl">
                Lihat detail
              </button>
              <button className="bg-accent hover:bg-accentHover text-white transition-colors duration-300 px-8 py-2 rounded-xl">
                Pesanan diterima
              </button>
            </div>
          </div>
        </div>

        {/* PESANAN DIBATALKAN */}
        <div className="flex flex-col md:flex-row max-sm:items-center bg-white rounded-xl shadow p-4 gap-4 w-full">
          <img
            src="https://picsum.photos/100"
            alt="Product Image"
            className="w-40 h-40 rounded-xl"
          />

          <div className="flex flex-col w-full">
            <h4 className="font-medium text-lg">Lorem ipsum dolor sit</h4>
            <p className="text-gray-600 text-sm font-medium">1 x Rp 435.000</p>
          </div>

          <div className="flex flex-wrap-reverse md:flex-wrap gap-3 md:flex-col lg:flex-row lg:justify-end max-lg:items-end md:gap-10 lg:gap-3 w-full">
            <p className="italic">Dibatalkan</p>
          </div>
        </div>

        {/* PESANAN BELUM DIBAYAR */}
        <div className="flex flex-col md:flex-row max-sm:items-center bg-white rounded-xl shadow p-4 gap-4 w-full">
          <img
            src="https://picsum.photos/100"
            alt="Product Image"
            className="w-40 h-40 rounded-xl"
          />

          <div className="flex flex-col w-full">
            <h4 className="font-medium text-lg">Lorem ipsum dolor sit</h4>
            <p className="text-gray-600 text-sm font-medium">1 x Rp 435.000</p>
          </div>

          <div className="flex flex-wrap-reverse md:flex-wrap gap-3 md:flex-col lg:flex-row lg:justify-end max-lg:items-end md:gap-10 lg:gap-3 w-full">
            <p className="italic">Belum bayar</p>

            <div className="flex flex-wrap md:flex-col lg:flex-row items-end md:justify-end w-full gap-3 lg:gap-5">
              <button className="bg-transparent border border-secondary hover:bg-primary hover:border-primary transition-colors duration-300 px-4 py-2 rounded-xl">
                Lihat detail
              </button>
              <button className="bg-primary hover:bg-primaryDark transition-colors duration-300 px-8 py-2 rounded-xl">
                Bayar sekarang
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEW MODAL */}
      {reviewModal && <Review onClose={handleReviewModal} />}
    </div>
  );
}
