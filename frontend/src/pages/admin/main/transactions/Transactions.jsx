import { Link } from "react-router-dom";
import TitleCard from "../../../../components/pages/admin-components/TitleCard";

export default function Transactions() {
  return (
    <div>
      <TitleCard title="Transaksi" />

      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
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
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                01274146871637826
              </th>
              <td className="px-6 py-4 truncate">Lorem ipsum dolor,</td>
              <td className="px-6 py-4 w-48 truncate">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero,
                reiciendis!
              </td>
              <td className="px-6 py-4">Rp 435.000</td>
              <td className="px-6 py-4">
                <Link
                  to="/admin/transaction/detail"
                  className="font-medium text-secondary hover:underline"
                >
                  Lihat
                </Link>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                01274146871637826
              </th>
              <td className="px-6 py-4 truncate">Lorem ipsum dolor,</td>
              <td className="px-6 py-4 w-48 truncate">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero,
                reiciendis!
              </td>
              <td className="px-6 py-4">Rp 435.000</td>
              <td className="px-6 py-4">
                <Link
                  to="/admin/transaction/detail"
                  className="font-medium text-secondary hover:underline"
                >
                  Lihat
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
