import { Link } from "react-router-dom";
import TitleCard from "../../../../components/pages/admin-components/TitleCard";
import { useCategoryStore } from "../../../../store/categoryStore";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import Danger from "../../../../components/modals/Danger";

export default function Category() {
  const { categories, isLoading, getAllCategories, deleteCategory } =
    useCategoryStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  const handleModal = (id) => {
    setSelectedCategory(id);
    setShowModal(!showModal);
  };

  const handleDeleteCategory = async (id) => {
    setShowModal(false);
    try {
      const response = await deleteCategory(id);
      if (response.success) {
        getAllCategories();
        showSuccessToast("Kategori berhasil dihapus");
      }
    } catch (error) {
      showErrorToast("Terjadi kesalahan saat menghapus kategori");
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <TitleCard title="Kategori" />

          <div className="flex justify-end mt-3 mb-6">
            <Link to="/admin/category/form">
              <button className="bg-primary hover:bg-primaryDark font-semibold transition-colors duration-300 px-4 py-2 rounded-xl">
                Tambah Kategori
              </button>
            </Link>
          </div>

          {/* TABEL KATEGORI */}
          {categories.length === 0 ? (
            <p className="text-center text-gray-500">Belum ada kategori</p>
          ) : (
            <div className="relative overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
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
                  {categories.map((category) => (
                    <tr
                      className="bg-white border-b hover:bg-gray-50"
                      key={category._id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap align-baseline capitalize"
                      >
                        {category?.name}
                      </th>
                      <td className="px-6 py-4 md:w-9/12 max-sm:truncate">
                        {category?.description}
                      </td>
                      <td className="px-6 py-4 text-right flex items-center align-baseline">
                        <Link
                          to={`/admin/category/form/${category?._id}`}
                          className="font-medium text-secondary hover:underline"
                        >
                          Ubah
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleModal(category?._id)}
                          className="font-medium text-red-600 hover:underline ml-3"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {showModal && (
        <Danger
          title="Hapus Kategori"
          message="Apakah Anda yakin ingin menghapus kategori ini?"
          onSubmit={() => handleDeleteCategory(selectedCategory)}
          onCancel={() => setShowModal(false)}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
