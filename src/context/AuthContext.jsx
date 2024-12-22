import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;
      const foundUser = users.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password
      );
      if (!foundUser) {
        throw new Error("Invalid email or password");
      }
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
