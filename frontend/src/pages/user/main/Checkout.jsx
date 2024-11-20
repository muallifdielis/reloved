import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/shipping");
  };

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

        {/* ALAMAT PENGIRIMAN */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-medium">Alamat</h2>
            <div className="w-24 h-1.5 bg-primaryDark"></div>
          </div>

          <form action="" className="mt-2">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="Name"
                  className="block overflow-hidden rounded-xl border border-secondary px-3 py-2 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
                >
                  <span className="text-sm"> Nama </span>

                  <input
                    type="text"
                    id="Name"
                    placeholder="Masukkan nama Anda"
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </label>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="PhoneNumber"
                  className="block overflow-hidden rounded-xl border border-secondary px-3 py-2 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
                >
                  <span className="text-sm"> Nomor Telepon </span>

                  <input
                    type="text"
                    id="PhoneNumber"
                    placeholder="Masukkan nomor telepon Anda"
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </label>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="Address"
                  className="block overflow-hidden rounded-xl border border-secondary px-3 py-2 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
                >
                  <span className="text-sm"> Alamat Lengkap </span>

                  <textarea
                    id="Address"
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
                  className="block overflow-hidden rounded-xl border border-secondary px-3 py-2 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
                >
                  <textarea
                    id="Address"
                    placeholder="Detail lainnya (opsional)"
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </label>
                <p className="text-xs text-gray-400">
                  Contoh : blok atau patokan lain.
                </p>
              </div>

              <button
                className="flex justify-center items-center gap-2 bg-primary py-3 px-6 mb-10 md:mb-0 text-xl rounded-xl font-bold hover:bg-primaryDark transition-colors duration-300"
                onClick={handleCheckout}
              >
                Lanjut ke pengiriman <IoIosArrowForward className="text-3xl" />
              </button>
            </div>
          </form>
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
            <p className="text-sm">di tahap selanjutnya</p>
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
