// src/components/RideCard.jsx
import React from "react";
import { useUser } from "../UserContext";
import API from "../api";

const RideCard = ({ ride }) => {
  const { user } = useUser();

  const handleBook = async () => {
    if (!user) {
      alert("You must be logged in to book a ride.");
      return;
    }

    try {
      const res = await API.post(
        "/book",
        { ride_id: ride.id || ride._id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.data.success) {
        alert("Ride booked successfully!");
      } else {
        alert("Failed to book ride. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("An error occurred while booking.");
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <div className="text-lg font-semibold">
        {ride.source} → {ride.destination}
      </div>
      <div className="text-sm text-gray-600">Date: {ride.date}</div>
      <div className="text-sm text-gray-600">Time: {ride.time}</div>
      <div className="text-sm text-gray-600">Seats Available: {ride.seats}</div>
      <div className="text-sm text-gray-600">Driver: {ride.driver_name}</div>

      <button
        onClick={handleBook}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Book Ride
      </button>
    </div>
  );
};

export default RideCard;
