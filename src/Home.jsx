// src/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import rideSharingImg from "./assets/ride-sharing.png";
import carImg from "./assets/car.png";
import locationImg from "./assets/location.png";
import savingsImg from "./assets/savings.png";

const Home = () => {
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
    <div className="text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto z-10 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            College Ride-Sharing Made Easy
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Connect. Ride. Save — With Verified College Commuters.
          </p>
          <div className="flex justify-center gap-4 flex-wrap mb-8">
            <Link
              to="/find"
              className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-full shadow hover:bg-gray-100 transition"
            >
              Find a Ride
            </Link>
            <Link
              to="/offer"
              className="bg-white text-indigo-700 font-semibold py-3 px-6 rounded-full shadow hover:bg-gray-100 transition"
            >
              Offer a Ride
            </Link>
          </div>
          <img
            src={rideSharingImg}
            alt="Ride Sharing"
            className="mx-auto rounded-3xl shadow-2xl w-full h-[300px] md:h-[400px] object-cover max-w-full"
          />
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-6xl mx-auto mt-16 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 mb-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-center">Search for a Ride</h2>
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

        <div className="grid gap-4 mb-16">
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
      </section>

      {/* Ride Carousel Section */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Popular Rides from Campus
        </h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="min-w-[250px] bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition"
            >
              <p className="text-lg font-medium">Campus → City {i}</p>
              <p className="text-sm text-gray-600">Tomorrow — ₹100 — By Jane Doe</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How ShareFare Works
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <img src={carImg} alt="Post or Find" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Post or Find a Ride</h3>
            <p className="text-gray-600 text-sm">
              Share your empty seat or book a ride heading your way in minutes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <img src={locationImg} alt="Verified" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Verified Connections</h3>
            <p className="text-gray-600 text-sm">
              Ride confidently with fellow verified students and faculty.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <img src={savingsImg} alt="Save" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Save & Go Green</h3>
            <p className="text-gray-600 text-sm">
              Split fares, cut fuel costs, and reduce your carbon footprint.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Students Say</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {["Ali", "Sara", "Dev"].map((name, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-md">
              <p className="text-sm text-gray-600 mb-4">
                “I’ve saved so much on travel with ShareFare. The rides are safe and affordable!”
              </p>
              <p className="font-semibold text-gray-800">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} <strong>ShareFare</strong>. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">Built with love for the student community.</p>
        </div>
      </footer>
    </div>
  );
};
//hi there 
export default Home;
