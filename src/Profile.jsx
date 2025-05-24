import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "./api";

const Profile = () => {
  const { user, token, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(res.data.name);
        setEmail(res.data.email);
        updateUser(res.data);
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await API.get("/my-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data.bookings || []);
      } catch (err) {
        console.error("Fetch bookings error:", err);
      }
    };

    fetchProfile();
    fetchBookings();
  }, [user, token, navigate, updateUser]);

  const handleSave = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Name cannot be empty.");
      return;
    }

    try {
      const res = await API.put(
        "/profile",
        { name: trimmedName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      updateUser({ ...user, name: trimmedName });
      setStatus(res.data.message || "Profile updated successfully.");
      setError("");
      setEditing(false);
    } catch (err) {
      console.error("Update profile error:", err);
      setError("Failed to update profile.");
      setStatus("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return <div className="text-center mt-8 text-blue-500">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 text-gray-800">
      {/* Profile Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">My Profile</h2>

        {status && <div className="mb-4 text-green-600 text-sm">{status}</div>}
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email:</label>
          <p className="text-gray-900">{email}</p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Name:</label>
          {editing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.trimStart())}
              className="w-full border border-gray-300 p-2 rounded"
              autoFocus
            />
          ) : (
            <p className="text-gray-900">{name}</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          {editing ? (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setName(user?.name || "");
                  setError("");
                  setStatus("");
                }}
                className="text-gray-500 underline"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="text-blue-600 underline"
            >
              Edit Name
            </button>
          )}

          <button onClick={handleLogout} className="text-red-600 underline">
            Logout
          </button>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-indigo-700">My Bookings</h3>
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((ride, index) => (
              <div key={index} className="border p-4 rounded shadow bg-gray-50">
                <h4 className="text-lg font-semibold">
                  {ride.source} → {ride.destination}
                </h4>
                <p>Date: {ride.date}</p>
                <p>Time: {ride.time}</p>
                <p>Price: ₹{ride.price}</p>
                <p>Driver: {ride.driver}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You haven't booked any rides yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
