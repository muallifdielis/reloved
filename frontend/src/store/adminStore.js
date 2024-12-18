import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast, showSuccessToast } from "../components/common/Toast";

export const useAdminStore = create((set) => ({
  users: [],
  transactions: [],
  transaction: null,
  isLoading: false,

  getAllUsers: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/users");
      set({ users: data, isLoading: false });
      return data;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      return error.response;
    }
  },

  changeRole: async (userId, role) => {
    try {
      set({ isLoading: true });
      const response = await api.put("/auth/change-role/", { userId, role });
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat mengubah role user"
      );
      return error.response;
    }
  },

  deleteUser: async (id) => {
    try {
      set({ isLoading: true });
      const response = await api.delete(`/users/${id}`);
      if (response.success === true) {
        showSuccessToast("Pengguna berhasil dihapus");
        set({ isLoading: false });
      }
      return response;
    } catch (error) {
      set({ isLoading: false });
      console.log("error", error);
      showErrorToast(
        error.response.data.message || "Terjadi kesalahan saat menghapus user"
      );
      return error.response;
    }
  },

  getAllTransactions: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/transactions");
      set({ transactions: response.data, isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      return error.response;
    }
  },

  getTransactionById: async (transactionId) => {
    try {
      set({ isLoading: true });
      const response = await api.get(`/transactions/${transactionId}`);
      set({ isLoading: false, transaction: response.data });
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

  softDeleteUser: async (id) => {
    try {
      set({ isLoading: true });
      const response = await api.patch(`/users/${id}/soft-delete`);
      if (response.success === true) {
        showSuccessToast("Pengguna berhasil dinonaktifkan");
        set({ isLoading: false });
      }
      return response;
    } catch (error) {
      set({ isLoading: false });
      console.log("error", error);
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat menonaktifkan user"
      );
      return error.response;
    }
  },

  restoreUser: async (id) => {
    try {
      set({ isLoading: true });
      const response = await api.patch(`/users/${id}/restore-admin`);
      if (response.success === true) {
        showSuccessToast("Pengguna berhasil diaktifkan");
        set({ isLoading: false });
      }
      return response;
    } catch (error) {
      set({ isLoading: false });
      console.log("error", error);
      showErrorToast(
        error.response.data.message ||
          "Terjadi kesalahan saat mengaktifkan user"
      );
      return error.response;
    }
  },
}));
