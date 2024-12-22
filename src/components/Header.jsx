import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="bg-gray-50 shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-lg font-bold text-gray-700">
        {user ? `Hi, ${user.email}` : "Welcome"}
      </h1>
      <nav className="flex gap-4 text-gray-700 items-center">
        {user ? (
          <>
            {location.pathname === "/notes" ? (
              <Link
                to="/home"
                className="hover:text-green-500 bg-gray-100 px-4 py-2 shadow-sm underline"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/notes"
                className="hover:text-green-500 bg-gray-100 px-4 py-2 shadow-sm underline"
              >
                Notes
              </Link>
            )}
            <button
              onClick={logout}
              className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-500 underline">
              Login
            </Link>
            <Link to="/register" className="hover:text-green-500 underline">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
