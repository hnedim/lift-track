import { useAuthStore } from "@/store/useAuthStore.js";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  return (
    <div className="flex w-screen justify-between p-5 bg-blue-200">
      <h1>LiftTrack</h1>
      <div className="flex gap-3">
        <Link to="/">Home</Link>
        {authUser ? (
          <div className="flex gap-3">
            <p className="">{authUser.email}</p>
            <button onClick={logout}>Log out</button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </div>
    </div>
  );
}
