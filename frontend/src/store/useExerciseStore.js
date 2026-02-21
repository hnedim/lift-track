import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useExerciseStore = create((set, get) => ({
  exercises: [],
  isExercisesLoading: false,
  isCreatingExercise: false,
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
  createExercise: async (data) => {
    const { exercises } = get();
    set({ isCreatingExercise: true });
    try {
      const res = await axiosInstance.post("/exercises", data);
      set({ exercises: [...exercises, res.data.exercise] });
      toast.success("Succesfully added new exercise");
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isCreatingExercise: false });
    }
  },
}));
