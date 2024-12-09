import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast, showSuccessToast } from "../components/common/Toast";

export const useCategoryStore = create((set) => ({
  categories: [],
  selectedCategory: null,
  isLoading: false,

  getAllCategories: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/categories");
      set({ categories: data, isLoading: false });
      return data;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      return error.response;
    }
  },

  deleteCategory: async (id) => {
    try {
      set({ isLoading: true });
      const response = await api.delete(`/categories/${id}`);
      if (response.success === true) {
        showSuccessToast("Kategori berhasil dihapus");
        set({ isLoading: false });
      }
      return response;
    } catch (error) {
      set({ isLoading: false });
      console.log("error", error);
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat menghapus kategori"
      );
      return error.response;
    }
  },

  addNewCategory: async (formData) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/categories", formData);
      console.log("response add", response);
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat menambahkan kategori"
      );
      return error.response;
    }
  },

  updateCategory: async (id, formData) => {
    try {
      set({ isLoading: true });
      const response = await api.put(`/categories/${id}`, formData);
      set({ isLoading: false });
      console.log("response", response);
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat memperbarui kategori"
      );
      return error.response;
    }
  },

  getCategoryById: async (id) => {
    set({ selectedCategory: null, isLoading: true });
    try {
      const { data } = await api.get(`/categories/${id}`);
      set({ selectedCategory: data, isLoading: false });
      return data;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat mengambil kategori"
      );
      return error.response;
    }
  },
}));
