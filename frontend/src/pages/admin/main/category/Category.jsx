import { Link } from "react-router-dom";
import TitleCard from "../../../../components/pages/admin-components/TitleCard";

export default function Category() {
  return (
    <div>
      <TitleCard title="Kategori" />

      <div className="flex justify-end mt-3 mb-6">
        <Link to="/admin/category/form">
          <button className="bg-primary hover:bg-primaryDark font-semibold transition-colors duration-300 px-4 py-2 rounded-xl">
            Tambah Kategori
          </button>
        </Link>
      </div>

      {/* TABEL KATEGORI */}
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-nowrap">
                Nama Kategori
              </th>
              <th scope="col" className="px-6 py-3">
                Deskripsi
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Pria
              </th>
              <td className="px-6 py-4 md:w-9/12 max-sm:truncate">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita laboriosam numquam, nobis laudantium omnis voluptate
                saepe rerum facere illum, eveniet corrupti! Quidem nemo, itaque
                animi qui doloremque aut. Illum harum aliquam voluptatibus fuga
                earum distinctio, enim obcaecati blanditiis, ducimus modi iusto
                ullam facilis tempore, accusamus ut cupiditate quos quibusdam
                dolor.
              </td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline"
                >
                  Ubah
                </a>
                <a
                  href="#"
                  className="font-medium text-secondary hover:text-red-600 hover:underline ml-3"
                >
                  Hapus
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Wanita
              </th>
              <td className="px-6 py-4 md:w-9/12 max-sm:truncate">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita laboriosam numquam, nobis laudantium omnis voluptate
                saepe rerum facere illum, eveniet corrupti! Quidem nemo, itaque
                animi qui doloremque aut. Illum harum aliquam voluptatibus fuga
                earum distinctio, enim obcaecati blanditiis, ducimus modi iusto
                ullam facilis tempore, accusamus ut cupiditate quos quibusdam
                dolor.
              </td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-secondary hover:underline"
                >
                  Ubah
                </a>
                <a
                  href="#"
                  className="font-medium text-secondary hover:text-red-600 hover:underline ml-3"
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
