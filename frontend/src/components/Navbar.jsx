import { useAuthStore } from "@/store/useAuthStore.js";

export default function Navbar() {
  const { authUser } = useAuthStore();
  return (
    <div>
      <h1>LiftTrack</h1>
      <div>
        {authUser ? (
          <p>{authUser.email}</p>
        ) : (
          <div>
            <button>Log in</button>
            <button>Sign Up</button>
          </div>
        )}
      </div>
    </div>
  );
}
