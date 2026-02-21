import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user");
      set({ authUser: res.data.user });
    } catch (error) {
      console.log("Error in checkAuth", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/login", data);
      toast.success("Account created succesfully");
      set({ authUser: res.data.user });
    } catch (error) {
      console.log("Error in login", error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  register: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/register", data);
      toast.success("Succesfully registered");
      set({ authUser: res.data.user });
    } catch (error) {
      console.log("Error in register", error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/logout");
      set({ authUser: null });
      toast.success("Logged out succesfully");
    } catch (error) {
      console.log("Error in logout", error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },
}));
