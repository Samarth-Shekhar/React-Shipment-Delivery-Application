import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirect to Home after logout
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-6 text-sm sm:text-base">
          <Link to="/" className="hover:text-yellow-300 font-semibold">
            Dashboard
          </Link>
          <Link to="/new-shipment" className="hover:text-yellow-300 font-semibold">
            New Shipment
          </Link>
          <Link to="/track" className="hover:text-yellow-300 font-semibold">
            Track
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300 text-sm sm:text-base"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;




