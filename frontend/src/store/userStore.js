import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showSuccessToast } from "../components/common/Toast";

export const useUserStore = create((set) => ({
  user: null,
  sellerProducts: [],
  likedProducts: [],
  isLoading: false,

  getUserById: async (id) => {
    set({ isLoading: true });
    try {
      const { data } = await api.get(`/users/${id}`);
      set({ user: data, isLoading: false });
      return data;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      return error.response;
    }
  },

  getSellerProducts: async (id) => {
    set({ isLoading: true });
    try {
      const { data } = await api.get(`/products/seller/${id}`);
      set({ sellerProducts: data, isLoading: false });
      return data;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      return error.response;
    }
  },

  getLikedProducts: async (id) => {
    set({ isLoading: true });
    try {
      const { data } = await api.get(`/products/liked/${id}`);
      set({ likedProducts: data, isLoading: false });
      return data;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      return error.response;
    }
  },
}));
