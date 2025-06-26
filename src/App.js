import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewShipment from "./pages/NewShipment";
import TrackShipment from "./pages/TrackShipment";

import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

import "./index.css";

function App() {
  const [user] = useAuthState(auth);

  return (
    <ThemeProvider>
      <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen text-black dark:text-white transition-all">
        {/* Theme toggle button */}
        <ThemeToggle />

        {/* Show sidebar only when user is logged in */}
        {user && <Sidebar user={user} />}

        {/* Main content */}
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/new-shipment" element={<PrivateRoute><NewShipment /></PrivateRoute>} />
            <Route path="/track" element={<PrivateRoute><TrackShipment /></PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

