import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import API from "./api"; // axios instance with baseURL
import registerImg from "./assets/register-ride.png";
//hi
const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // ✅ Corrected route with /api prefix
      const res = await API.post("/api/register", { name, email, password });

      if (!res.data?.message && !res.data?.success) {
        throw new Error("Unexpected response from server.");
      }

      // ✅ Login after successful registration
      const loginRes = await API.post("/api/login", { email, password });

      const { user, token } = loginRes.data;
      if (!user || !token) {
        throw new Error("Login failed after registration.");
      }

      login(user, token);
      navigate("/profile");
    } catch (err) {
      console.error("Registration error:", err);
      const msg =
        err.response?.data?.error || err.message || "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-gray-800">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Join ShareFare</h1>
        <p className="text-lg mb-6">Register to start sharing or finding rides easily</p>
        <img
          src={registerImg}
          alt="Register illustration"
          className="mx-auto rounded-xl shadow-md object-cover w-full max-w-3xl h-[400px] md:h-[500px]"
        />
      </div>

      {/* Registration Form */}
      <main className="flex-grow">
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition duration-200"
            >
              {loading ? "Registering…" : "Register"}
            </button>
          </form>

          {error && (
            <p className="text-red-600 text-center font-medium">{error}</p>
          )}

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} ShareFare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Register;
