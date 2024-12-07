import React from "react";
import TitleSection from "../../../../components/common/TitleSection";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default function OrderDetail() {
  return (
    <div className="p-5 md:px-10 bg-background/25">
      <div className="container bg-white p-5 md:p-10 rounded-xl relative">
        {/* BACK BUTTON */}
        <Link to="/seller/orders">
          <IoIosArrowBack className="hover:text-secondary cursor-pointer text-2xl absolute top-6 left-5" />
        </Link>

        {/* TITLE SECTION */}
        <TitleSection title="Detail Pesanan" />

        {/* DETAIL PESANAN */}
        <div className="flex flex-col gap-5 md:px-28">
          {/* NAMA PEMBELI */}
          <div className="flex flex-wrap items-center justify-between">
            <h4 className="font-medium">Nama pembeli</h4>
            <h4>Jane Smith</h4>
          </div>

          {/* PRODUK */}
          <div className="flex flex-wrap max-sm:justify-end justify-between gap-5">
            <img
              src="https://picsum.photos/200"
              alt="Product Image"
              className="w-16 h-16 rounded-xl"
            />
            <div className="flex flex-col gap-1 flex-1">
              <h4 className="font-medium">Product Name</h4>
              <p className="text-sm text-gray-400">1 x Rp 1.000.000</p>
            </div>
            <h4 className="font-medium">Rp 90.000.000</h4>
          </div>

          {/* TOTAL */}
          <table className="flex justify-end border-y border-secondary py-3">
            <tbody>
              <tr>
                <td className="font-medium pr-6">Subtotal</td>
                <td className="text-right">Rp 90.000.000</td>
              </tr>
              <tr>
                <td className="pr-10">Ongkos kirim</td>
                <td className="text-right">Rp 0</td>
              </tr>
              <tr>
                <td className="font-medium">Total</td>
                <td className="text-right">Rp 90.000.000</td>
              </tr>
            </tbody>
          </table>

          {/* JUMLAH TOTAL */}
          <div className="flex flex-wrap justify-between gap-5">
            <h4 className="font-medium">Jumlah total</h4>
            <h4 className="font-medium">Rp 90.000.000</h4>
          </div>

          {/* INFORMASI LAINNYA */}
          <div className="flex flex-col gap-3 border-y border-secondary py-3">
            <h4 className="font-medium text-lg">Informasi lainnya</h4>
            <div className="flex flex-wrap justify-between gap-5">
              <h4 className="font-medium">No. Pesanan</h4>
              <h4 className="font-medium">123456789</h4>
            </div>
            <div className="flex flex-wrap justify-between gap-5">
              <h4 className="font-medium">Waktu Pesanan</h4>
              <h4 className="font-medium">12 Januari 2025 - 12:00</h4>
            </div>
          </div>

          {/* ALAMAT PENERIMA */}
          <div className="flex flex-col gap-2">
            <h4 className="font-medium text-lg">Alamat Penerima</h4>

            <div className="p-4 border border-secondary rounded-xl flex flex-col gap-2 text-sm">
              <p className="font-semibold">John Doe (alamat)</p>

              <p>081234567890</p>

              <p className="mt-3">123 Street, City, Country</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
