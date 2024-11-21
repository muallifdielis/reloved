import { GoTrash } from "react-icons/go";
import TitleSection from "../../../../components/common/TitleSection";
import { Link } from "react-router-dom";

export default function Orders() {
  return (
    <div className="py-5 bg-background/25">
      <TitleSection title="Daftar Pesanan Masuk" />

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
              Menunggu <span className="text-xs">(1)</span>
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
              Ditolak <span className="text-xs">(1)</span>
            </a>
          </nav>
        </div>
      </div>

      {/* ORDERS */}
      <div className="container flex flex-col gap-5">
        {/* PESANAN MENUNGGU */}
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

          <div className="flex flex-wrap md:flex-col lg:flex-row items-end md:justify-end w-full gap-3 lg:gap-5">
            <Link to="/sell/orders/detail">
              <button className="bg-transparent border border-secondary hover:bg-primary hover:border-primary transition-colors duration-300 px-4 py-2 rounded-xl">
                Lihat detail
              </button>
            </Link>
            <button className="bg-secondary/25 hover:bg-red-600 hover:text-white transition-colors duration-300 px-8 py-2 rounded-xl">
              Tolak
            </button>
            <button className="bg-secondary hover:bg-secondaryHover hover:text-white transition-colors duration-300 px-8 py-2 rounded-xl">
              Terima
            </button>
          </div>
        </div>

        {/* PESANAN DITERIMA */}
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

          <div className="flex flex-wrap md:flex-col lg:flex-row items-end md:justify-end w-full gap-3 lg:gap-5">
            <button className="bg-transparent border border-secondary hover:bg-primary hover:border-primary transition-colors duration-300 px-4 py-2 rounded-xl">
              Lihat detail
            </button>
            <button className="bg-accent hover:bg-accentHover text-white transition-colors duration-300 px-8 py-2 rounded-xl">
              Pesanan diterima
            </button>
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

          <div className="flex flex-wrap md:flex-col lg:flex-row items-end md:justify-end w-full gap-3 lg:gap-5">
            <button className="bg-transparent border border-secondary hover:bg-primary hover:border-primary transition-colors duration-300 px-4 py-2 rounded-xl">
              Lihat detail
            </button>
            <button className="bg-primary hover:bg-primaryDark transition-colors duration-300 px-6 py-2 rounded-xl">
              Menunggu pengiriman
            </button>
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

          <div className="flex flex-wrap md:flex-col lg:flex-row items-end md:justify-end w-full gap-3 lg:gap-5">
            <button className="bg-transparent border border-secondary hover:bg-primary hover:border-primary transition-colors duration-300 px-4 py-2 rounded-xl">
              Lihat detail
            </button>
            <button className="bg-backgroundFooter/45 cursor-not-allowed px-12 py-2 rounded-xl">
              Ditolak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
