import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import {
  decodeToken,
  getAccessToken,
  removeAccessToken,
  saveAccessToken,
} from "../utils/tokenManager";
import { showSuccessToast } from "../components/common/Toast";

const useAuthStore = create((set) => ({
  currentUser: null,
  isLoading: false,

  getCurrentUser: async () => {
    try {
      set({ isLoading: true });
      // Check token expiration
      const accessToken = getAccessToken();
      if (accessToken) {
        const { exp } = decodeToken(accessToken);
        const now = Math.floor(Date.now() / 1000);

        if (now > exp) {
          removeAccessToken();
          set({ currentUser: null, isLoading: false });
          window.location.href = "/";
          return;
        }
      }

      if (!accessToken) {
        set({ currentUser: null, isLoading: false });
        return;
      }

      // Get current user
      const user = decodeToken(accessToken).id;

      const response = await api.get(`/users/${user}`);

      set({ currentUser: response.data, isLoading: false });
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil pengguna:", error);
    }
  },

  login: async (email, password) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/auth/login", { email, password });

      saveAccessToken(response.data.token);
      set({
        currentUser: decodeToken(response.data.token),
        isLoading: false,
      });

      return response;
    } catch (error) {
      set({ isLoading: false });
      return error.response;
    }
  },

  register: async (name, username, email, phone, password) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/auth/register", {
        name,
        username,
        email,
        phone,
        password,
      });

      set({ isLoading: false });
      return response;
    } catch (error) {
      set({ isLoading: false });
      return error.response;
    }
  },

  verifyEmail: async (token) => {
    try {
      set({ isLoading: true });
      const response = await api.post(`/auth/verify-email/${token}`);
      set({ isLoading: false });
      return response;
    } catch (error) {
      set({ isLoading: false });
      return error.response;
    }
  },

  resendEmailVerification: async ({ email }) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/auth/resend-verify-email", {
        email,
      });
      set({ isLoading: false });
      showSuccessToast("Email verifikasi berhasil dikirim");
      return response;
    } catch (error) {
      set({ isLoading: false });
      return error.response;
    }
  },

  forgotPassword: async (email) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/auth/forgot-password", {
        email,
      });
      set({ isLoading: false });
      return response;
    } catch (error) {
      set({ isLoading: false });
      return error.response;
    }
  },

  resetPassword: async (token, password) => {
    try {
      set({ isLoading: true });
      const response = await api.post(`/auth/reset-password/${token}`, {
        password,
      });
      set({ isLoading: false });
      return response;
    } catch (error) {
      set({ isLoading: false });
      return error.response;
    }
  },

  logout: async () => {
    removeAccessToken();
    set({ currentUser: null, isLoading: false });
  },
}));

export default useAuthStore;
