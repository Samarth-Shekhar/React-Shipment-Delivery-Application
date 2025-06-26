import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

const TrackShipment = () => {
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchShipments = async () => {
      const q = query(collection(db, "shipments"), where("user", "==", auth.currentUser?.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setShipments(data);
      setFilteredShipments(data);
    };

    fetchShipments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const shipmentRef = doc(db, "shipments", id);
    await updateDoc(shipmentRef, { status: newStatus });
    const updated = shipments.map((s) => s.id === id ? { ...s, status: newStatus } : s);
    setShipments(updated);
    filterShipmentsByStatus(statusFilter, updated);
  };

  const filterShipmentsByStatus = (status, allShipments = shipments) => {
    setStatusFilter(status);
    if (status === "All") {
      setFilteredShipments(allShipments);
    } else {
      setFilteredShipments(allShipments.filter((s) => s.status === status));
    }
  };

  const total = shipments.length;
  const delivered = shipments.filter((s) => s.status === "Delivered").length;
  const pending = shipments.filter((s) => s.status === "Pending").length;
  const transit = shipments.filter((s) => s.status === "In Transit").length;

  return (
    <div className="p-6 max-w-6xl mx-auto text-gray-800 dark:text-white">
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-700 dark:text-blue-400">📦 Your Shipments</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6 text-white">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold">Total</h3>
          <p className="text-3xl font-bold">{total}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-700 p-4 rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold">Delivered</h3>
          <p className="text-3xl font-bold">{delivered}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-4 rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold">In Transit</h3>
          <p className="text-3xl font-bold">{transit}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-500 to-gray-700 p-4 rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-3xl font-bold">{pending}</p>
        </div>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-8 text-center">
        <select
          className="border border-gray-300 dark:border-white px-5 py-2 rounded shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={statusFilter}
          onChange={(e) => filterShipmentsByStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Shipment Cards */}
      {filteredShipments.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">No shipments found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredShipments.map((shipment) => (
            <div
              key={shipment.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md p-6 hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">{shipment.receiver}</h3>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full transition duration-300 ${
                    shipment.status === "Delivered"
                      ? "bg-green-200 text-green-800 dark:bg-green-300 dark:text-green-900"
                      : shipment.status === "In Transit"
                      ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-900"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-300 dark:text-gray-900"
                  }`}
                >
                  {shipment.status}
                </span>
              </div>
              <div className="text-sm space-y-1">
                <p><strong>Email:</strong> {shipment.email}</p>
                <p><strong>Phone:</strong> {shipment.phone}</p>
                <p><strong>City:</strong> {shipment.city}</p>
                <p><strong>Pincode:</strong> {shipment.pincode}</p>
                <p><strong>Size:</strong> {shipment.size}</p>
                <p><strong>Address:</strong> {shipment.address}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Created: {shipment.createdAt?.toDate().toLocaleString()}
                </p>
              </div>

              {/* Status Update */}
              {shipment.status !== "Delivered" && (
                <div className="mt-4">
                  <label className="text-sm font-medium mr-2">Update Status:</label>
                  <select
                    value={shipment.status}
                    onChange={(e) => handleStatusChange(shipment.id, e.target.value)}
                    className="border border-gray-300 dark:border-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackShipment;

