import { FaShoppingBag, FaUser } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import TitleCard from "../../../components/pages/admin-components/TitleCard";
import { Link } from "react-router-dom";
import { useAdminStore } from "../../../store/adminStore";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

export default function Dashboard() {
  const { users, transactions, getAllUsers, getAllTransactions, isLoading } =
    useAdminStore();

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    getAllUsers();
    getAllTransactions();
  }, [getAllUsers, getAllTransactions]);

  useEffect(() => {
    let total = 0;
    transactions
      .filter((transaction) => transaction.payment_status === "paid")
      .forEach((transaction) => {
        total += transaction.amount;
      });
    setTotalAmount(total);
  }, [transactions]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

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
              <p className="text-sm font-medium text-gray-600">
                {users?.length} pengguna
              </p>
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
              <p className="text-sm font-medium text-gray-600">
                {transactions?.length} transaksi
              </p>
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
              <p className="text-sm font-medium text-gray-600">
                {" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(totalAmount)}
              </p>
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

          {transactions?.length === 0 ? (
            <p className="text-sm text-gray-400">Belum ada transaksi</p>
          ) : (
            // {/* TABEL */}
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
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.slice(0, 6).map((transaction) => (
                    <tr
                      className="bg-white border-b hover:bg-gray-100"
                      key={transaction._id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {transaction?.transaction_id}
                      </th>
                      <td className="px-6 py-4 truncate">
                        {transaction?.order?.shippingAddress?.name}
                      </td>
                      <td className="px-6 py-4 max-w-48 truncate">
                        {transaction?.order?.order_items[0]?.product?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(transaction?.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {transaction?.payment_status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

          {users?.length === 0 ? (
            <p className="text-sm text-gray-400">Belum ada pengguna</p>
          ) : (
            //  TABEL
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
                  {users?.slice(0, 6).map((user) => (
                    <tr
                      className="bg-white border-b hover:bg-gray-100"
                      key={user._id}
                    >
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                      >
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src={user?.image ? user?.image : "/avatar.png"}
                          alt={user?.name}
                        />
                        <div className="ps-3">
                          <div className="text-base font-semibold">
                            {user?.name}
                          </div>
                          <div className="font-normal text-gray-500 w-36 lg:w-64 truncate">
                            {user?.email}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4 text-nowrap">
                        @{user?.username}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
