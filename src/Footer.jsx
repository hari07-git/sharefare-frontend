// src/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-700">
        <div>
          <h3 className="font-semibold mb-2">About ShareFare</h3>
          <p>
            ShareFare is your college ride-sharing platform — save money, travel safely, and reduce carbon emissions.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Navigation</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/find" className="hover:text-blue-600">Find a Ride</Link></li>
            <li><Link to="/offer" className="hover:text-blue-600">Offer a Ride</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
            <li><a href="#" className="hover:text-blue-600">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-blue-600">Instagram</a></li>
            <li><a href="#" className="hover:text-blue-600">Twitter</a></li>
            <li><a href="#" className="hover:text-blue-600">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} ShareFare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
