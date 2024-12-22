import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;
      const foundUser = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      login(foundUser);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="prose mx-auto flex flex-col gap-6 bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-700 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        {error && <div className="text-red-400">{error}</div>}

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
