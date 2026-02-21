import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
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

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-md flex flex-col gap-3 bg-blue-200 p-6"
      >
        <h1 className="text-3xl py-6">Log in</h1>
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
    </div>
  );
}
