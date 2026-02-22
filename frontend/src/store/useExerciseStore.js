import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useExerciseStore = create((set, get) => ({
  exercises: [],
  exerciseDetail: null,
  isExercisesLoading: false,
  isCreatingExercise: false,
  isLoadingExerciseDetail: false,
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
  showExerciseDetails: async (id) => {
    set({ isLoadingExerciseDetail: true });
    try {
      const res = await axiosInstance.get(`/exercises/${id}`);
      set({ exerciseDetail: res.data.exercise });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    } finally {
      set({ isLoadingExerciseDetail: false });
    }
  },
  deleteExercise: async (id) => {
    const { exercises } = get();
    try {
      await axiosInstance.delete(`/exercises/${id}`);
      set({ exercises: [...exercises.filter((ex) => ex._id !== id)] });
      toast.success("Exercise succesfully deleted!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Error deleting exercise",
      );
    }
  },
  updateExercise: async (id, data) => {
    const { exercises } = get();
    try {
      const res = await axiosInstance.put(`exercises/${id}`, data);
      set({
        exercises: [
          ...exercises.map((ex) => {
            if (ex._id === id) {
              return res.data.updatedExercise;
            } else return ex;
          }),
        ],
      });
      toast.success("Succesfully updated exercise");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Error updating exercise",
      );
    }
  },
}));
