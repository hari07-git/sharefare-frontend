// src/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "./assets/logo.png";
import { useAuth } from "./context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkStyle = (path) =>
    `block px-4 py-2 rounded-full transition font-medium ${
      location.pathname === path
        ? "text-white bg-blue-600"
        : "text-gray-700 hover:bg-blue-100"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ShareFare" className="h-9 w-auto" />
          <span className="text-2xl font-bold text-blue-600">ShareFare</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/" className={linkStyle("/")}>Home</Link>
          <Link to="/find" className={linkStyle("/find")}>Find a Ride</Link>
          <Link to="/offer" className={linkStyle("/offer")}>Offer a Ride</Link>
          <Link to="/about" className={linkStyle("/about")}>About</Link>
          {user && <Link to="/profile" className={linkStyle("/profile")}>Profile</Link>}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-gray-700 text-sm">Hi, {user.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 border border-red-600 text-red-600 rounded-full hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-700"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <nav className="px-4 py-4 space-y-2">
            <Link to="/" onClick={() => setMobileOpen(false)} className={linkStyle("/")}>Home</Link>
            <Link to="/find" onClick={() => setMobileOpen(false)} className={linkStyle("/find")}>Find a Ride</Link>
            <Link to="/offer" onClick={() => setMobileOpen(false)} className={linkStyle("/offer")}>Offer a Ride</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className={linkStyle("/about")}>About</Link>
            {user && (
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className={linkStyle("/profile")}
              >
                Profile
              </Link>
            )}
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="px-4 py-4 border-t space-y-2">
            {user ? (
              <>
                <p className="text-gray-700 text-sm">Hi, {user.email}</p>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
