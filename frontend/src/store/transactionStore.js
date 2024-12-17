import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast } from "../components/common/Toast";

export const useTransactionStore = create((set) => ({
  transactions: [],
  isLoading: false,

  createTransaction: async (orderId) => {
    try {
      set({ isLoading: true });
      const response = await api.post(`/transactions`, { orderId });
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat membuat transaksi"
      );
      return error.response;
    }
  },

  paymentSuccess: async (orderId, transaction_status) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/transactions/midtrans/callback", {
        order_id: orderId,
        transaction_status,
      });
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat membuat transaksi"
      );
      return error.response;
    }
  },
}));
