import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast, showSuccessToast } from "../components/common/Toast";

const useProductStore = create((set) => ({
  products: [],
  selectedProduct: null,
  isLoading: false,

  addNewProduct: async (formData) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/products", formData);
      console.log("response add", response);
      showSuccessToast("Produk berhasil ditambahkan");
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat menambahkan produk"
      );
      return error.response;
    }
  },

  getProductById: async (id) => {
    set({ selectedProduct: null, isLoading: true });
    try {
      const { data } = await api.get(`/products/${id}`);
      set({ selectedProduct: data, isLoading: false });
      return data;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message || "Terjadi kesalahan saat mengambil produk"
      );
      return error.response;
    }
  },

  updateProduct: async (id, formData) => {
    try {
      set({ isLoading: true });
      const response = await api.put(`/products/${id}`, formData);
      console.log("response update", response);
      showSuccessToast("Produk berhasil diperbarui");
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat memperbarui produk"
      );
      return error.response;
    }
  },
}));

export default useProductStore;
