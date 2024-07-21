import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../utils/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { TbArrowBackUpDouble } from "react-icons/tb";

export default function PickupRequests() {
  const navigate = useNavigate();
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

  const handleClose = () => {
    navigate("/admin/requests");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Donor Pickup Requests</h1>
        <button
          onClick={handleClose}
          className="bg-blue-500 text-white py-2 px-4 rounded-md flex"
        >
          <TbArrowBackUpDouble size={20}/> Back to Requests
        </button>
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : pickupRequests.length === 0 ? (
        <p className="text-center text-gray-600">No pickup requests available.</p>
      ) : (
        <div className="space-y-4">
          {pickupRequests.map((request) => (
            <div
              key={request.id}
              className="p-4 bg-slate-100 dark:bg-slate-200 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold text-black mb-2">Pickup Request</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-black">
                    <span className="font-bold">Address: </span>
                    {request.address}
                  </p>
                  <p className="text-sm text-black">
                    <span className="font-bold">Date: </span>
                    {formatDate(request.date)}
                  </p>
                  <p className="text-sm text-black">
                    <span className="font-bold">Time: </span>
                    {formatTime(request.time)}
                  </p>
                  <p className="text-sm text-black">
                    <span className="font-bold">Location: </span>
                    {request.location}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-sm text-black mb-1">Donation Quantities:</p>
                  <ul className="list-disc pl-5">
                    {Object.entries(request.donationQuantities || {}).map(([item, quantity]) => (
                      <li key={item} className="text-sm text-black">
                        {item}: {quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}