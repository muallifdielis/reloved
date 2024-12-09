import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast } from "../components/common/Toast";

export const useOrderStore = create((set) => ({
  orders: [],
  address: null,
  selectedProduct: null,
  isLoading: false,

  setOrderAddress: (address, product) => {
    set({ address, selectedProduct: product });
  },

  createOrder: async (shippingAddress, order_items, shippingMethod) => {
    try {
      set({ isLoading: true });
      const response = await api.post(
        "/order",
        shippingAddress,
        order_items,
        shippingMethod
      );
      console.log("response", response);
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message || "Terjadi kesalahan saat membuat pesanan"
      );
      return error.response;
    }
  },
}));
