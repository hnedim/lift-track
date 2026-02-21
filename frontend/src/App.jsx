import { useState, useEffect } from "react";
import "./App.css";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NewWorkoutSessionPage from "./pages/NewWorkoutSessionPage";

function App() {
  const { checkAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <LoginPage />}
        ></Route>
        <Route
          path="/signup"
          element={!authUser ? <RegisterPage /> : <HomePage />}
        ></Route>
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <HomePage />}
        ></Route>
        <Route
          path="/workout-sessions/new"
          element={!authUser ? <LoginPage /> : <NewWorkoutSessionPage />}
        ></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
