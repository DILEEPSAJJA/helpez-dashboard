// src/pages/PickupRequests.jsx
import React, { useEffect, useState } from "react";
import app from "../utils/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

export default function PickupRequests() {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);
  const [pickupRequests, setPickupRequests] = useState([]);

  const fetchPickupRequests = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "pickupRequests"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPickupRequests(data);
    } catch (error) {
      console.error("Error fetching pickup requests:", error);
      toast.error("Error fetching pickup requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPickupRequests();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (timeString) => {
    return new Date(`1970-01-01T${timeString}Z`).toLocaleTimeString();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Donor Pickup Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : pickupRequests.length === 0 ? (
        <p>No pickup requests available.</p>
      ) : (
        <ul className="list-disc pl-5">
          {pickupRequests.map((request) => (
            <li
              key={request.id}
              className="mb-4 p-4 border rounded-lg"
            >
              <h2 className="text-xl font-semibold">Pickup Request</h2>
              <p className="text-gray-700"><strong>Address:</strong> {request.address}</p>
              <p className="text-gray-700"><strong>Date:</strong> {formatDate(request.date)}</p>
              <p className="text-gray-700"><strong>Time:</strong> {formatTime(request.time)}</p>
              <p className="text-gray-700"><strong>Location:</strong> {request.location}</p>
              <div className="mt-2">
                <strong>Donation Quantities:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {Object.entries(request.donationQuantities || {}).map(([item, quantity]) => (
                    <li key={item} className="text-gray-700">
                      {item}: {quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
