import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useWorkoutStore = create((set, get) => ({
  workouts: [],
  isWorkoutsLoading: false,
  isCreatingWorkout: false,
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
    try {
      const res = await axiosInstance.post("/workouts", data);
      set({ workouts: [...workouts, res.data.workout] });
    } catch (error) {
      toast.error("Error creating workout");
    } finally {
      set({ isCreatingWorkout: false });
    }
  },
}));
