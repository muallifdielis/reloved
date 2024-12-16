import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast, showSuccessToast } from "../components/common/Toast";

export const useSellerStore = create((set) => ({
  userBank: [],
  earnings: [],
  withdrawals: [],
  isLoading: false,

  addUserBank: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`/userBank`, data);
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message || "Terjadi kesalahan saat menambah bank"
      );
      return error.response;
    }
  },

  getUserBank: async (id) => {
    try {
      set({ isLoading: true });
      const response = await api.get(`/userBank/${id}`);
      set({ userBank: response.data, isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message || "Terjadi kesalahan saat mengambil bank"
      );
      return error.response;
    }
  },

  updateUserBank: async (bankId, data) => {
    set({ isLoading: true });
    try {
      const response = await api.put(`/userBank/${bankId}`, data);
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message || "Terjadi kesalahan saat mengubah bank"
      );
      return error.response;
    }
  },

  deleteUserBank: async (bankId) => {
    set({ isLoading: true });
    try {
      const response = await api.delete(`/userBank/${bankId}`);
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message || "Terjadi kesalahan saat menghapus bank"
      );
      return error.response;
    }
  },

  getUserEarnings: async (sellerId) => {
    try {
      set({ isLoading: true });
      const response = await api.get(`/withdrawal/seller/earnings/${sellerId}`);
      set({ earnings: response.data, isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat mengambil pendapatan"
      );
      return error.response;
    }
  },

  getWithdrawalsHistory: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get("/withdrawal/seller");
      set({ isLoading: false, withdrawals: response.withdrawals });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat mengambil riwayat penarikan"
      );
      return error.response;
    }
  },
}));
