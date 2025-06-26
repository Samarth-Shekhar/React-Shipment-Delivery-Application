import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Home() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="text-center space-y-6 p-8 bg-white dark:bg-gray-900 shadow-xl rounded-2xl max-w-md w-full border border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-extrabold text-blue-700 dark:text-white animate-fadeIn">🚚 Shipment App</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">Manage your deliveries with ease. Please login or register to continue.</p>

        <div className="flex justify-center gap-4 mt-6">
          <Link to="/login">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition-all duration-200">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md transition-all duration-200">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
