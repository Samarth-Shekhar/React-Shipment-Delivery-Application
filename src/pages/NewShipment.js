import { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const NewShipment = () => {
  const [form, setForm] = useState({
    sender: "",
    receiver: "",
    phone: "",
    email: "",
    size: "",
    city: "",
    address: "",
    pincode: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("❌ You must be logged in to create a shipment.");
      return;
    }

    try {
      await addDoc(collection(db, "shipments"), {
        ...form,
        user: auth.currentUser.uid,
        status: "Pending",
        createdAt: serverTimestamp()
      });

      alert("✅ Shipment Created!");
      setForm({
        sender: "",
        receiver: "",
        phone: "",
        email: "",
        size: "",
        city: "",
        address: "",
        pincode: ""
      });
    } catch (error) {
      console.error("❌ Firestore Error:", error);
      alert("Failed to create shipment. Check console.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-lg max-w-xl w-full space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-white">
          📦 New Shipment
        </h2>

        {[
          { name: "sender", label: "Sender Name" },
          { name: "receiver", label: "Receiver Name" },
          { name: "phone", label: "Phone Number" },
          { name: "email", label: "Email" },
          { name: "size", label: "Package Size" },
          { name: "city", label: "City" },
          { name: "address", label: "Delivery Address" },
          { name: "pincode", label: "Pincode" },
        ].map(({ name, label }) => (
          <input
            key={name}
            type="text"
            placeholder={label}
            value={form[name]}
            onChange={(e) => setForm({ ...form, [name]: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md transition duration-200"
        >
          Submit Shipment
        </button>
      </form>
    </div>
  );
};

export default NewShipment;
