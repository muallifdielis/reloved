import { Link } from "react-router-dom";
import TitleCard from "../../../../components/pages/admin-components/TitleCard";
import { useAdminStore } from "../../../../store/adminStore";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";

export default function Transactions() {
  const { transactions, getAllTransactions, isLoading } = useAdminStore();
  const [selectedStatus, setSelectedStatus] = useState("semua");

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);
  console.log("transaction", transactions);

  const filteredTransactions =
    selectedStatus === "semua"
      ? transactions
      : transactions.filter(
          (transaction) => transaction.payment_status === selectedStatus
        );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div>
      <TitleCard title="Transaksi" />

      <div className="mb-4 flex flex-col items-end">
        <label
          htmlFor="role-filter"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Tampilkan berdasarkan status pembayaran :
        </label>
        <select
          id="role-filter"
          className="block w-48 px-4 py-2 bg-white rounded-xl shadow focus:outline-secondary sm:text-sm"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="semua">Semua</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="expired">Expired</option>
          <option value="cancelled">Cancelled</option>
          <option value="denied">Denied</option>
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="text-center text-gray-500">
          Belum ada transaksi
          {selectedStatus !== "semua"
            ? selectedStatus === "menunggu"
              ? " dengan status belum bayar"
              : ` dengan status ${selectedStatus}`
            : ""}
        </p>
      ) : (
        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID Transaksi
                </th>
                <th scope="col" className="px-6 py-3">
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
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr
                  className="bg-white border-b hover:bg-gray-50"
                  key={transaction._id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
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
                  <td className="px-6 py-4">
                    <Link
                      to="/admin/transaction/detail"
                      className="font-medium text-secondary hover:underline"
                    >
                      Lihat
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
