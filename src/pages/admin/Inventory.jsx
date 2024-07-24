import React, { useState, useEffect } from "react";
import app from "../../utils/firebase";
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function Inventory() {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [itemSummary, setItemSummary] = useState([]);
  const [donationRequests, setDonationRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const userSnapshot = await getDocs(collection(db, "users"));
        setUsers(
          userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        // Fetch incidents
        const incidentSnapshot = await getDocs(collection(db, "incidents"));
        setIncidents(
          incidentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        // Fetch requests
        const requestSnapshot = await getDocs(collection(db, "requests"));
        setRequests(
          requestSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        // Fetch item summary
        const itemSummarySnapshot = await getDocs(
          collection(db, "itemSummary")
        );
        setItemSummary(
          itemSummarySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        // Fetch donation requests
        const donationRequestsSnapshot = await getDocs(
          collection(db, "pickupRequests")
        );
        setDonationRequests(
          donationRequestsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [db]);

  //   const handleConfirmDonation = async (requestId, donationQuantities) => {
  //     try {
  //       // Update item summary
  //       for (const [itemName, quantity] of Object.entries(donationQuantities)) {
  //         const item = itemSummary.find((i) => i.itemName === itemName);
  //         if (item) {
  //           const updatedSatisfiedCount = item.satisfiedCount + quantity;
  //           const itemRef = doc(db, "itemSummary", item.id);
  //           await updateDoc(itemRef, { satisfiedCount: updatedSatisfiedCount });
  //         }
  //       }

  //       // Delete the donation request
  //       const requestRef = doc(db, "pickupRequests", requestId);
  //       await deleteDoc(requestRef);

  //       // Refresh the donation requests
  //       const donationRequestsSnapshot = await getDocs(
  //         collection(db, "pickupRequests")
  //       );
  //       setDonationRequests(
  //         donationRequestsSnapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }))
  //       );
  //     } catch (error) {
  //       console.error("Error confirming donation:", error);
  //     }
  //   };

  const handleConfirmDonation = async (requestId, donationQuantities) => {
    try {
      // Update item summary
      const updatedItemSummary = [...itemSummary];
      for (const [itemName, quantity] of Object.entries(donationQuantities)) {
        const itemIndex = updatedItemSummary.findIndex(
          (i) => i.itemName === itemName
        );
        if (itemIndex !== -1) {
          const item = updatedItemSummary[itemIndex];
          // Calculate new satisfied count
          const updatedSatisfiedCount = item.satisfiedCount + quantity;
          // Update the item summary locally
          updatedItemSummary[itemIndex] = {
            ...item,
            satisfiedCount: updatedSatisfiedCount,
          };
          // Update the satisfied count in Firestore
          const itemRef = doc(db, "itemSummary", item.id);
          await updateDoc(itemRef, { satisfiedCount: updatedSatisfiedCount });
        }
      }
      // Update state with the new item summary
      setItemSummary(updatedItemSummary);

      // Delete the donation request
      const requestRef = doc(db, "pickupRequests", requestId);
      await deleteDoc(requestRef);

      // Refresh the donation requests
      const donationRequestsSnapshot = await getDocs(
        collection(db, "pickupRequests")
      );
      const updatedDonationRequests = donationRequestsSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() })
      );
      setDonationRequests(updatedDonationRequests);
    } catch (error) {
      console.error("Error confirming donation:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Item Summary</h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b text-black">
              <th className="py-2 px-4 text-left text-gray-700">Item</th>
              <th className="py-2 px-4 text-left text-gray-700">
                Total Needed
              </th>
              <th className="py-2 px-4 text-left text-gray-700">
                Satisfied Count
              </th>
              <th className="py-2 px-4 text-left text-gray-700">
                Incoming Donations
              </th>
            </tr>
          </thead>
          <tbody>
            {itemSummary.map((item) => {
              // Calculate total donations for each item
              const totalDonations = donationRequests.reduce(
                (sum, request) =>
                  sum + (request.donationQuantities[item.itemName] || 0),
                0
              );

              return (
                <tr key={item.itemName} className="border-b text-black">
                  <td className="py-2 px-4">{item.itemName}</td>
                  <td className="py-2 px-4">{item.totalNeeded}</td>
                  <td className="py-2 px-4">{item.satisfiedCount}</td>
                  <td className="py-2 px-4">{totalDonations}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        {donationRequests.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Donation Requests</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 border-b text-black">
                  <th className="py-2 px-4 text-left text-gray-700">Donor</th>
                  <th className="py-2 px-4 text-left text-gray-700">Address</th>
                  <th className="py-2 px-4 text-left text-gray-700">Date</th>
                  <th className="py-2 px-4 text-left text-gray-700">Items</th>
                  <th className="py-2 px-4 text-left text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {donationRequests.map((request) => (
                  <tr key={request.id} className="border-b text-black">
                    <td className="py-2 px-4">{request.username}</td>
                    <td className="py-2 px-4">{request.address}</td>
                    <td className="py-2 px-4">{request.date}</td>
                    <td className="py-2 px-4">
                      {Object.entries(request.donationQuantities).map(
                        ([itemName, quantity]) => (
                          <div key={itemName}>
                            {itemName}: {quantity}
                          </div>
                        )
                      )}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() =>
                          handleConfirmDonation(
                            request.id,
                            request.donationQuantities
                          )
                        }
                        className="text-green-500 hover:underline"
                      >
                        ✓ Confirm
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <p className="text-2xl">No pickup requests available now</p>
          </>
        )}
      </div>
    </div>
  );
}
