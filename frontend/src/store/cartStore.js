import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast } from "../components/common/Toast";

export const useCartStore = create((set) => ({
  cart: [],
  isLoading: false,

  addToCart: async (id) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/cart", { productId: id });
      set({ isLoading: false });
      console.log("response", response);
      return response;
    } catch (error) {
      console.log("error", error);
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat menambahkan produk ke keranjang"
      );
      set({ isLoading: false });
      return error.response;
    }
  },
}));
