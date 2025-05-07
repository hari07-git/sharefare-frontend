// src/FindRide.jsx
import React, { useState } from "react";

const FindRide = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!from || !to || !date) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/search?from=${from}&to=${to}&date=${date}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch rides. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-10">Find a Ride</h1>

      {/* Search Form */}
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-gray-200 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {loading && <p className="text-blue-600 mt-4 text-center">Searching for rides...</p>}
      </div>

      {/* Ride Results */}
      <div className="grid gap-4">
        {results.length === 0 && !loading && (
          <p className="text-center text-gray-500">No rides found for your search.</p>
        )}
        {results.map((ride) => (
          <div
            key={ride.id}
            className="p-4 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition"
          >
            <p className="text-lg font-semibold text-gray-800">
              {ride.source} → {ride.destination}
            </p>
            <p className="text-sm text-gray-600">
              {ride.date} — ₹{ride.price} — By {ride.driver}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindRide;
