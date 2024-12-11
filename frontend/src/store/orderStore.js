import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast } from "../components/common/Toast";

export const useOrderStore = create((set) => ({
  orders: [],
  order: null,
  address: null,
  selectedProduct: null,
  selectedOrder: null,
  isLoading: false,

  setOrderAddress: (address, product) => {
    set({ address, selectedProduct: product });
  },

  setSelectedOrder: (order) => {
    set({ selectedOrder: order });
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

  getOrders: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get("/order");
      set({ orders: response.data, isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat mengambil pesanan"
      );
      return error.response;
    }
  },

  changeOrderStatus: async (orderId, status) => {
    try {
      set({ isLoading: true });
      const response = await api.put(`/order/${orderId}/status`, { status });
      set({ isLoading: false });
      console.log("response", response);
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat mengubah status pesanan"
      );
      return error.response;
    }
  },

  getOrderById: async (orderId) => {
    try {
      set({ isLoading: true });
      const response = await api.get(`/order/${orderId}`);
      set({ isLoading: false, order: response.data });
      console.log("response", response);
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat mengambil detail pesanan"
      );
      return error.response;
    }
  },
}));
