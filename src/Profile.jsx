import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "./api"; // use axios instance with base URL

const Profile = () => {
  const { user, token, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await API.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setName(response.data.name);
        setEmail(response.data.email);
        updateUser(response.data);
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, token, navigate, updateUser]);

  const handleSave = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Name cannot be empty.");
      return;
    }

    try {
      const response = await API.put(
        "/profile",
        { name: trimmedName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      updateUser({ ...user, name: trimmedName });
      setStatus("Profile updated successfully.");
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

  if (loading) return <div className="text-center mt-8">Loading profile...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
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

        <button
          onClick={handleLogout}
          className="text-red-600 underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
