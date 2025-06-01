import React, { useState } from "react";
import { Link } from "react-router-dom";
import rideSearchImg from "../assets/find-ride.png";
import { useUser } from "../UserContext";
import API from "../api";
import RideCard from "../components/RideCard";

const FindRide = () => {
  const [form, setForm] = useState({ source: "", destination: "", date: "" });
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const { user } = useUser();
  const token = user?.token;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const { source, destination, date } = form;

    if (!source.trim() || !destination.trim() || !date) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await API.get("/search", {
        params: {
          source: source.trim(),        // ✅ FIXED
          destination: destination.trim(), // ✅ FIXED
          date,
        },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setResults(res.data || []);
      setError("");
      setSearched(true);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search rides. Please try again.");
      setResults([]);
      setSearched(true);
    }
  };

  return (
    <div className="text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Find a Ride</h1>
        <p className="text-lg">Search for available rides from your peers.</p>
      </div>

      {/* Search Form */}
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="source"
            value={form.source}
            onChange={handleChange}
            placeholder="From"
            className="p-3 border rounded"
          />
          <input
            type="text"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            placeholder="To"
            className="p-3 border rounded"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="p-3 border rounded"
          />
          <button
            onClick={handleSearch}
            className="md:col-span-3 mt-4 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>

      {/* Ride Results */}
      <div className="max-w-4xl mx-auto mt-10 px-4">
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((ride) => (
              <RideCard key={ride.id || ride._id} ride={ride} />
            ))}
          </div>
        ) : (
          searched &&
          !error && (
            <p className="text-center text-gray-600 mt-6">
              No rides found for the selected route and date.
            </p>
          )
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-10">
        <Link
          to="/"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          ← Back to Home
        </Link>
        <Link
          to="/offer"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Offer a Ride →
        </Link>
      </div>

      {/* Visual */}
      <div className="mt-16">
        <img
          src={rideSearchImg}
          alt="Find Ride"
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

export default FindRide;
