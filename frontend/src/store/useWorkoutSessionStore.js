import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";

export const useWorkoutSessionStore = create((get, set) => ({
  workoutSessions: [],
  isWorkoutSessionsLoading: false,
  getWorkoutSessions: async () => {
    try {
      set({ isWorkoutSessionsLoading: true });
      const res = await axiosInstance.get("/workoutSessions");
      set({ workoutSessions: res.data });
    } catch (error) {
      toast.error("Error loading workout sessions");
      console.log(error.response?.data?.message);
    } finally {
      set({ isWorkoutSessionsLoading: false });
    }
  },
  createWorkoutSession: async () => {},
  deleteWorkoutSession: async () => {},
}));
