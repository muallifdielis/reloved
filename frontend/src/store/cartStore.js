import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast, showSuccessToast } from "../components/common/Toast";

export const useCartStore = create((set) => ({
  cart: [],
  selectedCart: null,
  isLoading: false,

  addToCart: async (id) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/cart", { productId: id });
      set({ isLoading: false });
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

  getCart: async () => {
    try {
      set({ isLoading: true });
      const { data } = await api.get("/cart");
      set({ isLoading: false, cart: data || [] });
      return data;
    } catch (error) {
      console.error("Get cart error:", error);
      showErrorToast(
        error?.response?.data?.message ||
          "Terjadi kesalahan saat mengambil keranjang"
      );
      set({ isLoading: false, cart: [] });
      return error?.response;
    }
  },

  removeCartItem: async (productId) => {
    try {
      set({ isLoading: true });
      const response = await api.delete(`/cart/remove/${productId}`);
      set({ isLoading: false, cart: response?.data?.data || [] });
      showSuccessToast("Produk berhasil dihapus dari keranjang");
      return response;
    } catch (error) {
      console.error("Remove cart item error:", error);
      showErrorToast(
        error?.response?.data?.message ||
          "Terjadi kesalahan saat menghapus produk dari keranjang"
      );
      set({ isLoading: false });
      return error?.response;
    }
  },

  clearCart: async () => {
    try {
      set({ isLoading: true });
      const response = await api.delete("/cart/clear");
      set({ isLoading: false, cart: response?.data?.data || [] });
      showSuccessToast("Keranjang Anda berhasil dikosongkan");
      return response;
    } catch (error) {
      console.error("Clear cart error:", error);
      showErrorToast(
        error?.response?.data?.message ||
          "Terjadi kesalahan saat mengosongkan keranjang"
      );
      set({ isLoading: false });
      return error?.response;
    }
  },
}));

export default useCartStore;
