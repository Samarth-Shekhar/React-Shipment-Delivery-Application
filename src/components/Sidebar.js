import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Sidebar = ({ user }) => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirect to Home after logout
  };

  const isActive = (path) =>
    location.pathname === path ? "text-yellow-300 font-semibold" : "text-white";

  return (
    <div
      className={`bg-blue-800 text-white h-screen p-4 transition-all duration-300 
      ${open ? "w-64" : "w-20"} flex flex-col fixed sm:relative z-50`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="mb-6 focus:outline-none text-white text-lg"
        title="Toggle Sidebar"
      >
        {open ? "⏪" : "☰"}
      </button>

      <div className="mb-6">
        {open && <p className="text-sm text-gray-200">Welcome,</p>}
        <p
          className={`font-semibold text-yellow-300 text-sm truncate ${
            !open && "text-center"
          }`}
        >
          {user?.email}
        </p>
      </div>

      <nav className="flex-1 space-y-4 text-sm">
        <Link to="/" className={`block hover:text-yellow-300 ${isActive("/")}`}>
          🏠 {open && "Dashboard"}
        </Link>
        <Link
          to="/new-shipment"
          className={`block hover:text-yellow-300 ${isActive("/new-shipment")}`}
        >
          ➕ {open && "New Shipment"}
        </Link>
        <Link
          to="/track"
          className={`block hover:text-yellow-300 ${isActive("/track")}`}
        >
          📦 {open && "Track Shipments"}
        </Link>
      </nav>

      <button
        onClick={() => document.documentElement.classList.toggle("dark")}
        className={`mt-6 text-sm bg-white text-black rounded px-3 py-1 hover:bg-gray-200 ${
          !open && "text-xs px-2 py-1"
        }`}
      >
        {open ? "🌙 Toggle Dark Mode" : "🌓"}
      </button>

      <button
        onClick={handleLogout}
        className={`mt-4 bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300 ${
          !open && "text-xs px-2 py-1"
        }`}
      >
        {open ? "🚪 Logout" : "🚪"}
      </button>
    </div>
  );
};

export default Sidebar;


