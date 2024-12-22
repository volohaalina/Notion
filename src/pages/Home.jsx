import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export function Home() {
  const { user } = useAuth();
  return (
    <div className="prose mx-auto flex flex-col items-center gap-6 text-center bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-700">Profile</h1>
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg text-gray-700">
          Welcome,{" "}
          <span className="font-semibold">{user?.email || "User"}</span>!
        </p>
        <p className="text-sm text-gray-500">
          Your account was created on:{" "}
          <span className="font-medium">
            {new Date(user?.createdAt).toLocaleString() || "Unknown date"}
          </span>
        </p>
      </div>
      <Link
        to="/notes"
        className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 underline"
      >
        To Notes
      </Link>
    </div>
  );
}
