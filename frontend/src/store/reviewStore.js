import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast } from "../components/common/Toast";

export const useReviewStore = create((set) => ({
  reviews: [],
  isLoading: false,

  createReview: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/reviews", data);
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      return error.response;
    }
  },

  getReviews: async (id) => {
    try {
      set({ isLoading: true });
      const response = await api.get(`/reviews/${id}`);
      set({ reviews: response.data, isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      return error.response;
    }
  },

  deleteReview: async (id) => {
    try {
      set({ isLoading: true });
      const response = await api.delete(`/reviews/${id}`);
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log("error", error);
      set({ isLoading: false });
      return error.response;
    }
  },
}));
