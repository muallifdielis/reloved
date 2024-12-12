import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast, showSuccessToast } from "../components/common/Toast";

export const useTransactionStore = create((set) => ({
  transactions: [],
  transaction: null,

  selectedTransaction: null,
  isLoading: false,

  createTransaction: async (orderId) => {
    try {
      set({ isLoading: true });
      const response = await api.post(`/transactions`, { orderId });
      set({ isLoading: false });
      console.log("response", response);
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

  getTransactionById: async (transactionId) => {
    try {
      set({ isLoading: true });
      const response = await api.get(`/transactions/${transactionId}`);
      set({ isLoading: false, transaction: response.data });
      console.log("response", response);
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat mengambil detail transaksi"
      );
      return error.response;
    }
  },
}));
