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
  sellerOrders: [],

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
      set({ isLoading: false });
      if (response.success === true) {
        localStorage.removeItem("selectedProductId");
      }
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

  getSellerOrders: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get("/order/seller");
      set({ sellerOrders: response.data, isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat mengambil pesanan penjual"
      );
      return error.response;
    }
  },

  deleteOrder: async (orderId) => {
    try {
      set({ isLoading: true });
      const response = await api.delete(`/order/${orderId}`);
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat menghapus pesanan"
      );
      return error.response;
    }
  },
}));
