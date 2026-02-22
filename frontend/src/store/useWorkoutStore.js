import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useWorkoutStore = create((set, get) => ({
  workouts: [],
  workoutDetail: null,
  isWorkoutsLoading: false,
  isCreatingWorkout: false,
  isLoading: false,
  getWorkouts: async () => {
    set({ isWorkoutsLoading: true });
    try {
      const res = await axiosInstance.get("/workouts");
      set({ workouts: res.data.workouts });
    } catch (error) {
      toast.error("Error loading workouts");
    } finally {
      set({ isWorkoutsLoading: false });
    }
  },
  createWorkout: async (data) => {
    set({ isCreatingWorkout: true });
    const { workouts } = get();
    try {
      const res = await axiosInstance.post("/workouts", data);
      set({ workouts: [...workouts, res.data.workout] });
      toast.success("Succesfully created workout");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    } finally {
      set({ isCreatingWorkout: false });
    }
  },
  showWorkoutDetails: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/workouts/${id}`);
      set({ workoutDetail: res.data.workout });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    } finally {
      set({ isLoading: false });
    }
  },
  deleteWorkout: async (id) => {
    const { workouts } = get();
    try {
      await axiosInstance.delete(`/workouts/${id}`);
      set({ workouts: [...workouts.filter((wk) => wk._id !== id)] });
      toast.success("Succesfully deleted workout");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  },
  updateWorkout: async (id, data) => {
    const { workouts } = get();
    try {
      const res = await axiosInstance.put(`/workouts/${id}`, data);
      set({
        workouts: [
          ...workouts.map((wk) => {
            if (wk._id === id) {
              return res.data.workout;
            } else return wk;
          }),
        ],
      });
      toast.success("Succesfully updated workout");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  },
}));
