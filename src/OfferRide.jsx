// src/OfferRide.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import offerRideImg from "./assets/ride-sharing.png";
import { useAuth } from "./context/AuthContext";

const OfferRide = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    source: "",
    destination: "",
    date: "",
    time: "",
    price: "",
    driver: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const apiUrl = `${import.meta.env.VITE_API_URL}/api/offer`;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { source, destination, date, time, price, driver } = form;
    if (!source || !destination || !date || !time || !price || !driver) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.status === 401) {
        logout();
        navigate("/login");
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit ride.");
      }

      setSuccess("✅ Ride offered successfully!");
      setForm({
        source: "",
        destination: "",
        date: "",
        time: "",
        price: "",
        driver: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Offer a Ride</h1>
        <p className="text-lg">
          Help others and share your trip by offering a ride to fellow students.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="source"
              placeholder="From"
              value={form.source}
              onChange={handleChange}
              className="p-3 border rounded"
            />
            <input
              name="destination"
              placeholder="To"
              value={form.destination}
              onChange={handleChange}
              className="p-3 border rounded"
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="p-3 border rounded"
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="p-3 border rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={form.price}
              onChange={handleChange}
              className="p-3 border rounded"
            />
            <input
              name="driver"
              placeholder="Your Name"
              value={form.driver}
              onChange={handleChange}
              className="p-3 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            {loading ? "Submitting…" : "Submit Ride"}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}
        </form>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-6">
          <Link
            to="/"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            ← Back to Home
          </Link>
          <Link
            to="/find"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Find a Ride →
          </Link>
        </div>
      </div>

      {/* Illustration */}
      <div className="mt-16">
        <img
          src={offerRideImg}
          alt="Offer Ride"
          className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} ShareFare. All rights reserved.</p>
          <p className="text-sm">Made for students, by students.</p>
        </div>
      </footer>
    </div>
  );
};

export default OfferRide;
