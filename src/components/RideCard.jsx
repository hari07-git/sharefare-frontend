import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "../api"; // your axios instance
import { useNavigate } from "react-router-dom";

const RideCard = ({ ride }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleBook = async () => {
    if (!user) {
      alert("Please login first.");
      return navigate("/login");
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/book",
        { ride_id: ride.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Ride booked successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Booking failed");
    }
  };

  return (
    <div className="border p-4 rounded shadow mb-4 bg-white">
      <h3 className="text-xl font-semibold">{ride.source} → {ride.destination}</h3>
      <p>Date: {ride.date}</p>
      <p>Price: ₹{ride.price}</p>
      <p>Driver: {ride.driver}</p>
      <button
        onClick={handleBook}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Book My Ride
      </button>
    </div>
  );
};

export default RideCard;
