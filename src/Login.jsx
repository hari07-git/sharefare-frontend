import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Correct path
import loginImg from "./assets/login-ride.png";   // Adjusted path if needed

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error(data?.error || "Login failed");
      }

      login(data.user, data.token);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome Back</h1>
        <p className="text-lg mb-6">Login to manage your rides or offer one</p>
        <img
          src={loginImg}
          alt="Login illustration"
          className="mx-auto rounded-xl shadow-md object-cover w-full max-w-3xl h-[400px] md:h-[500px]"
        />
      </div>

      {/* Login Form */}
      <main className="flex-grow">
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition duration-200"
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>

          {error && (
            <p className="text-red-600 text-center font-medium">{error}</p>
          )}

          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} ShareFare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
