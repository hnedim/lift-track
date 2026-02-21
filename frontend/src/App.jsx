import { useState, useEffect } from "react";
import "./App.css";
import { axiosInstance } from "./lib/axios";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {
    authUser,
    isCheckingAuth,
    isSigningUp,
    isLoggingIn,
    login,
    register,
    logout,
    checkAuth,
  } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

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
          path="/"
          element={!authUser ? <LoginPage /> : <HomePage />}
        ></Route>
      </Routes>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label htmlFor="email">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button>Submit</button>
      </form>
      <Toaster />
    </div>
  );
}

export default App;
