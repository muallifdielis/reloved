import React from "react";
import TitleCard from "../../../../components/pages/admin-components/TitleCard";

export default function Users() {
  return (
    <div>
      <TitleCard title="Pengguna" />

      {/* TABEL PENGGUNA */}
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 max-sm:text-center">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama Pengguna
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Tanggal Bergabung
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
              <td className="px-6 py-4 text-nowrap">25 November 2024</td>

              <td className="px-6 py-4 ">
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline text-nowrap"
                >
                  Lihat
                </a>
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline text-nowrap mx-3"
                >
                  Ubah
                </a>
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline hover:text-red-600 text-nowrap"
                >
                  Hapus
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
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
                  <div className="text-base font-semibold">Bonnie Green</div>{" "}
                  <div className="font-normal text-gray-500 w-36 lg:w-64 truncate">
                    bonnie@gmail.com
                  </div>
                </div>
              </th>
              <td className="px-6 py-4 text-nowrap">@johndoe</td>
              <td className="px-6 py-4 text-nowrap">25 November 2024</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline text-nowrap"
                >
                  Lihat
                </a>
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline text-nowrap mx-3"
                >
                  Ubah
                </a>
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline hover:text-red-600 text-nowrap"
                >
                  Hapus
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
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
              <td className="px-6 py-4 text-nowrap">25 November 2024</td>
              <td className="px-6 py-4 ">
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline text-nowrap"
                >
                  Lihat
                </a>
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline text-nowrap mx-3"
                >
                  Ubah
                </a>
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline hover:text-red-600 text-nowrap"
                >
                  Hapus
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
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
              <td className="px-6 py-4 text-nowrap">25 November 2024</td>
              <td className="px-6 py-4 ">
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline text-nowrap"
                >
                  Lihat
                </a>
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline text-nowrap mx-3"
                >
                  Ubah
                </a>
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline hover:text-red-600 text-nowrap"
                >
                  Hapus
                </a>
              </td>
            </tr>
            <tr className="bg-white hover:bg-gray-50">
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
                    Leslie Livingston
                  </div>
                  <div className="font-normal text-gray-500 w-36 lg:w-64 truncate">
                    leslie@gmail.com
                  </div>
                </div>
              </th>
              <td className="px-6 py-4 text-nowrap">@johndoe</td>
              <td className="px-6 py-4 text-nowrap">25 November 2024</td>
              <td className="px-6 py-4 ">
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline text-nowrap"
                >
                  Lihat
                </a>
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline text-nowrap mx-3"
                >
                  Ubah
                </a>
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline hover:text-red-600 text-nowrap"
                >
                  Hapus
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
