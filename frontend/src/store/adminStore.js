import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast, showSuccessToast } from "../components/common/Toast";

export const useAdminStore = create((set) => ({
  users: [],
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
      console.log("response", response);
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
}));
