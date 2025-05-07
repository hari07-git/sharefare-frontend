// RideCarousel.jsx
import React from 'react';

const rides = [
  {
    id: 1,
    from: 'Hyderabad',
    to: 'Warangal',
    date: '2025-05-05',
    price: '₹250',
    user: 'Akhil K.',
  },
  {
    id: 2,
    from: 'Chennai',
    to: 'Bangalore',
    date: '2025-05-06',
    price: '₹500',
    user: 'Sita R.',
  },
  {
    id: 3,
    from: 'Pune',
    to: 'Mumbai',
    date: '2025-05-07',
    price: '₹300',
    user: 'Rahul V.',
  },
  {
    id: 4,
    from: 'Delhi',
    to: 'Jaipur',
    date: '2025-05-08',
    price: '₹450',
    user: 'Neha M.',
  },
];

const RideCarousel = () => {
  return (
    <div className="bg-black py-10 px-4">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Popular Rides</h2>
      <div className="flex overflow-x-auto gap-6 scrollbar-hide">
        {rides.map((ride) => (
          <div
            key={ride.id}
            className="min-w-[250px] bg-gray-800 rounded-xl p-6 shadow-md flex-shrink-0 hover:shadow-lg transition-all"
          >
            <div className="text-xl font-semibold text-white">{ride.from} → {ride.to}</div>
            <div className="text-gray-300 mt-2">{ride.date}</div>
            <div className="text-blue-400 mt-2 font-bold">{ride.price}</div>
            <div className="text-gray-400 mt-1 text-sm">By {ride.user}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideCarousel;
