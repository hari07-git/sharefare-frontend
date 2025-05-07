import React, { useState } from 'react';
import axios from 'axios';

const SearchSection = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/search', {
        params: { from, to, date }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching rides:', error);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {/* Display ride results */}
      <div className="space-y-4">
        {results.map((ride) => (
          <div key={ride.id} className="border rounded p-4 shadow">
            <h3 className="text-lg font-semibold">{ride.source} → {ride.destination}</h3>
            <p>Date: {ride.date}</p>
            <p>Price: ₹{ride.price}</p>
            <p>Driver: {ride.driver}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSection;
