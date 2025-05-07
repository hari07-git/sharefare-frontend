import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { user, token, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setName(response.data.name);
        setEmail(response.data.email);
        updateUser(response.data); // Update context
      } catch (error) {
        console.error("Error fetching profile:", error);
        setStatus(" load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, token, navigate, updateUser]);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/profile",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      updateUser({ ...user, name }); // Merge updated name
      setEditing(false);
      setStatus("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatus("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <div className="text-center mt-8">Loading profile...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">My Profile</h2>

      {status && <div className="mb-4 text-sm text-green-600">{status}</div>}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Email:</label>
        <p className="text-gray-900">{email}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Name:</label>
        {editing ? (
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p className="text-gray-900">{name}</p>
        )}
      </div>

      <div className="flex justify-between items-center">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-gray-500 underline"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-blue-600 underline"
          >
            Edit Name
          </button>
        )}

        <button
          onClick={handleLogout}
          className="text-red-600 underline ml-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
