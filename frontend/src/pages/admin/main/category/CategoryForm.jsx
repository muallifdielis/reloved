import { Link, useParams } from "react-router-dom";
import TitleCard from "../../../../components/pages/admin-components/TitleCard";
import { useEffect, useState } from "react";

export default function CategoryForm() {
  const { id } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
    }
  }, [id]);

  return (
    <div>
      <TitleCard title={isUpdate ? "Ubah Kategori" : "Tambah Kategori"} />

      <form action="" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="category-name" className="text-sm font-medium">
            Nama Kategori
          </label>
          <input
            type="text"
            name="category-name"
            id="category-name"
            placeholder="Masukkan nama kategori"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary block w-full p-2.5"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-medium">
            Deksripsi
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Masukkan deskripsi kategori"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary block w-full p-2.5"
          />
        </div>

        <div className="flex flex-row justify-end gap-4 items-center">
          <Link to="/admin/category">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 transition-colors duration-300 font-medium rounded-xl w-auto px-5 py-2.5 text-center"
            >
              Batal
            </button>
          </Link>
          <button
            type="submit"
            className="bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primaryDark transition-colors duration-300 font-medium rounded-xl w-auto px-5 py-2.5 text-center"
          >
            {isUpdate ? "Ubah Kategori" : "Tambah Kategori"}
          </button>
        </div>
      </form>
    </div>
  );
}
