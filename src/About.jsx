// src/About.jsx
import React from "react";
import aboutImg from "./assets/college-carpool.jpg"; // Replace with your relevant image

const About = () => {
  return (
    <div className="text-gray-800">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">About ShareFare</h1>
        <p className="text-lg">
          Empowering students and staff with smarter, greener travel options.
        </p>
      </div>

      {/* About Content */}
      <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
        <img
          src={aboutImg}
          alt="About ShareFare"
          className="rounded-2xl shadow-lg w-full"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-4">Why ShareFare?</h2>
          <p className="text-gray-700 mb-4">
            ShareFare is a student-driven ride-sharing platform created to make
            long-distance travel to and from college easier, safer, and more
            economical. Whether you're commuting daily or heading home for the
            weekend, ShareFare connects you with trusted fellow students and staff.
          </p>
          <p className="text-gray-700 mb-4">
            Our mission is to reduce travel costs, minimize environmental impact,
            and promote a community-based transportation network within your
            college.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Verified rides with students and faculty only</li>
            <li>Split fares and save on fuel costs</li>
            <li>Eco-friendly travel made simple</li>
            <li>Backed by a safe and secure system</li>
          </ul>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We envision a campus where carpooling is second nature, where empty
            seats are opportunities, and where technology and community work
            together to create a sustainable future.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} ShareFare. All rights reserved.</p>
          <p className="text-sm">Made for students, by students.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
