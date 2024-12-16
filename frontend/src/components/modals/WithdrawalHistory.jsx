import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function WithdrawalHistory({ data, onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div
        className={`bg-white p-8 md:max-w-3xl md:min-w-96 min-w-72 max-w-xs rounded-lg transform transition-all duration-300 mx-5 max-h-[80vh] overflow-y-auto ${
          show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-lg font-semibold text-center">
          Riwayat Penarikan Saldo
        </h2>

        {data?.length === 0 ? (
          <p className="text-center text-sm text-gray-500 my-10">
            Tidak ada riwayat penarikan
          </p>
        ) : (
          <div className="relative overflow-auto shadow-md rounded-lg my-10">
            <table className="w-full text-sm text-left text-gray-500 whitespace-nowrap">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr className="text-nowrap">
                  <th scope="col" className="px-6 py-3">
                    ID Penarikan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nomor Rekening
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal Penarikan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Saldo Penarikan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Saldo Akhir
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((data) => (
                  <tr
                    className="bg-white border-b hover:bg-gray-50"
                    key={data._id}
                  >
                    <td scope="row" className="px-6 py-4">
                      {data?.withdrawal_id}
                    </td>
                    <td scope="row" className="px-6 py-4">
                      {data?.userBank?.norek}
                    </td>
                    <td className="px-6 py-4">
                      {data?.createdAt &&
                        format(new Date(data?.createdAt), "dd MMMM yyyy", {
                          locale: id,
                        })}
                    </td>
                    <td className="px-6 py-4">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(data?.amount)}
                    </td>
                    <td className="px-6 py-4">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(data?.remainingEarnings)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg ml-2 transition-colors duration-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
