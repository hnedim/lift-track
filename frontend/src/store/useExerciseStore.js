import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useExerciseStore = create((set, get) => ({
  exercises: [],
  isExercisesLoading: false,
  getExercises: async () => {
    set({ isExercisesLoading: true });
    try {
      const res = await axiosInstance.get("/exercises");
      set({ exercises: res.data.exercises });
    } catch (error) {
      toast.error("Error loading exercises");
    } finally {
      set({ isExercisesLoading: false });
    }
  },
}));
