import { FaShoppingBag, FaUser } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import TitleCard from "../../../components/pages/admin-components/TitleCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <TitleCard title="Dashboard" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* JUMLAH USER */}
        <Link to="/admin/users" className="w-full">
          <div className="bg-white p-4 shadow-md rounded-xl flex flex-col items-center md:items-start lg:flex-row gap-4 justify-between group transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className=" bg-secondary p-4 rounded-full text-white group-hover:bg-secondaryHover transition-all duration-300">
              <FaUser className="text-4xl" />
            </div>
            <div className="flex flex-col gap-1 text-center md:text-end">
              <h4 className="font-semibold text-xl text-secondary">
                Total Pengguna
              </h4>
              <p className="text-sm font-medium text-gray-600">90 pengguna</p>
            </div>
          </div>
        </Link>

        {/* JUMLAH TRANSAKSI */}
        <Link to="/admin/transactions" className="w-full">
          <div className="bg-white p-4 shadow-md rounded-xl flex flex-col items-center md:items-start lg:flex-row gap-4 justify-between group transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className=" bg-secondary p-4 rounded-full text-white group-hover:bg-secondaryHover transition-all duration-300">
              <FaShoppingBag className="text-4xl" />
            </div>
            <div className="flex flex-col gap-1 text-center md:text-end">
              <h4 className="font-semibold text-xl text-secondary">
                Total Transaksi
              </h4>
              <p className="text-sm font-medium text-gray-600">90 transaksi</p>
            </div>
          </div>
        </Link>

        {/* JUMLAH PEMASUKAN */}
        <Link to="/admin/transactions" className="w-full">
          <div className="bg-white p-4 shadow-md rounded-xl flex flex-col items-center md:items-start lg:flex-row gap-4 justify-between group transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className=" bg-secondary p-4 rounded-full text-white group-hover:bg-secondaryHover transition-all duration-300">
              <BsCashCoin className="text-4xl" />
            </div>
            <div className="flex flex-col gap-1 text-center md:text-end">
              <h4 className="font-semibold text-xl text-secondary">
                Total Penjualan
              </h4>
              <p className="text-sm font-medium text-gray-600">Rp 1.000.000</p>
            </div>
          </div>
        </Link>
      </div>

      {/* TRANSAKSI BARU DAN USER BARU */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10">
        {/* TRANSAKSI BARU */}
        <div className="flex flex-col gap-3">
          {/* JUDUL */}
          <div className="flex flex-row gap-1">
            <div className="w-1.5 bg-primaryDark"></div>
            <div className="flex justify-between items-center w-full">
              <h1 className="font-semibold text-lg">Transaksi baru</h1>
              <Link to="/admin/transactions">
                <button className="text-sm font-medium hover:text-secondary text-gray-400">
                  Lihat semua
                </button>
              </Link>
            </div>
          </div>

          {/* TABEL */}
          <div className="relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID Transaksi
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    Nama Pembeli
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Produk
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Harga
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-100">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    09182764715761263
                  </th>
                  <td className="px-6 py-4 truncate">Jane Doe</td>
                  <td className="px-6 py-4 truncate">
                    Hoodie Hijau Muntah Kocenk
                  </td>
                  <td className="px-6 py-4 truncate">Rp 380.000</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-100">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    09182764715761263
                  </th>
                  <td className="px-6 py-4 truncate">Jane Doe</td>
                  <td className="px-6 py-4 truncate">Hoodie Hijau Miskin</td>
                  <td className="px-6 py-4 truncate">Rp 380.000</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-100">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    09182764715761263
                  </th>
                  <td className="px-6 py-4 truncate">Jane Doe</td>
                  <td className="px-6 py-4 truncate">Hoodie Kuning Neon</td>
                  <td className="px-6 py-4 truncate">Rp 380.000</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-100">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    09182764715761263
                  </th>
                  <td className="px-6 py-4 truncate">Jane Doe</td>
                  <td className="px-6 py-4 truncate">
                    Hoodie Hijau Muntah Kocenk
                  </td>
                  <td className="px-6 py-4 truncate">Rp 380.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* USER BARU */}
        <div className="flex flex-col gap-3">
          {/* JUDUL */}
          <div className="flex flex-row gap-1">
            <div className="w-1.5 bg-primaryDark"></div>
            <div className="flex justify-between items-center w-full">
              <h1 className="font-semibold text-lg">Pengguna baru</h1>
              <Link to="/admin/users">
                <button className="text-sm font-medium hover:text-secondary text-gray-400">
                  Lihat semua
                </button>
              </Link>
            </div>
          </div>

          {/* TABEL */}
          <div className="relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 max-sm:text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama Pengguna
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-100">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://picsum.photos/100"
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">Neil Sims</div>
                      <div className="font-normal text-gray-500 w-36 lg:w-64 truncate">
                        kamilahsyahrabanu@gmail.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4 text-nowrap">@johndoe</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-100">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://picsum.photos/100"
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        Bonnie Green
                      </div>{" "}
                      <div className="font-normal text-gray-500 w-36 lg:w-64 truncate">
                        bonnie@gmail.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4 text-nowrap">@johndoe</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-100">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://picsum.photos/100"
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">Jese Leos</div>
                      <div className="font-normal text-gray-500 w-36 lg:w-64 truncate">
                        jese@gmail.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4 text-nowrap">@johndoe</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-100">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://picsum.photos/100"
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">Thomas Lean</div>
                      <div className="font-normal text-gray-500 w-36 lg:w-64 truncate">
                        thomes@gmail.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4 text-nowrap">@johndoe</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
