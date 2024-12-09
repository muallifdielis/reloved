import { Link, useNavigate, useParams } from "react-router-dom";
import TitleCard from "../../../../components/pages/admin-components/TitleCard";
import { useEffect, useState } from "react";
import { useCategoryStore } from "../../../../store/categoryStore";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common/Toast";

export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const { updateCategory, addNewCategory, isLoading, getCategoryById } =
    useCategoryStore();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      setIsUpdate(true);

      const fetchCategory = async () => {
        try {
          const category = await getCategoryById(id);
          setFormData({
            name: category.name,
            description: category.description,
          });
        } catch (error) {
          console.log("error", error);
          showErrorToast(
            error.response.data.message ||
              "Terjadi kesalahan saat mengambil data kategori"
          );
        }
      };

      fetchCategory();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      showErrorToast("Nama kategori harus diisi.");
      return;
    }

    try {
      let response;
      if (isUpdate) {
        response = await updateCategory(id, formData);
      } else {
        response = await addNewCategory(formData);
      }

      if (response.success) {
        showSuccessToast(
          id ? "Kategori berhasil diubah" : "Kategori berhasil ditambahkan"
        );
        navigate("/admin/category");
        setFormData({
          name: "",
          description: "",
        });
      }
    } catch (error) {
      console.log("error", error);
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat menambahkan kategori"
      );
      return error.response;
    }
  };

  return (
    <div>
      <TitleCard title={isUpdate ? "Ubah Kategori" : "Tambah Kategori"} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">
            Nama Kategori
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData?.name}
            onChange={handleChange}
            placeholder="Masukkan nama kategori"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg lowercase focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary block w-full p-2.5"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-medium">
            Deksripsi
          </label>
          <textarea
            name="description"
            id="description"
            value={formData?.description}
            onChange={handleChange}
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
            disabled={isLoading}
            className="bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primaryDark transition-colors duration-300 font-medium rounded-xl w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? "Loading..."
              : isUpdate
              ? "Ubah Kategori"
              : "Tambah Kategori"}
          </button>
        </div>
      </form>
    </div>
  );
}
