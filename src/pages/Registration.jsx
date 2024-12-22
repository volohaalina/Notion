import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const userSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
});

export function Registration() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const parsedData = userSchema.parse(formData);
      if (parsedData.password !== formData.confirmPassword) {
        throw { confirmPassword: "Passwords do not match" };
      }
      const response = await fetch("http://localhost:5000/users");
      const users = await response.json();
      const existingUser = users.find((user) => user.email === formData.email);
      if (existingUser) {
        throw { email: "A user with this email already exists" };
      }
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          createdAt: new Date().toISOString(),
        }),
      });
      navigate("/login");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      } else {
        setErrors(err);
      }
    }
  };

  return (
    <div className="prose mx-auto flex flex-col gap-6 bg-white p-6 text-center">
      <h1 className="text-3xl font-bold text-gray-700">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full text-gray-700"
        />
        {errors.email && (
          <div className="text-red-400">
            {errors.email._errors ? errors.email._errors[0] : errors.email}
          </div>
        )}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full text-gray-700"
        />
        {errors.password && (
          <div className="text-red-400">{errors.password._errors[0]}</div>
        )}
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border p-2 w-full text-gray-700"
        />
        {errors.confirmPassword && (
          <div className="text-red-400">{errors.confirmPassword}</div>
        )}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}
