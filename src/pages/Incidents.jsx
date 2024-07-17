import React, { useEffect, useState } from "react";
import app from "../utils/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Incidents() {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);
  const [incidents, setIncidents] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editIncident, setEditIncident] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
  });

  const fetchIncidents = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "incidents"));
    const data = snapshot.docs.map((doc) => {
      const vals = doc.data();
      const id = doc.id;
      return { id, ...vals };
    });
    const sortedData = data.sort((a, b) => b.date.localeCompare(a.date));
    setIncidents(sortedData);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "incidents", id));
    fetchIncidents();
  };

  const handleEdit = (incident) => {
    setEditMode(true);
    setEditIncident(incident);
  };

  const handleSave = async () => {
    const incidentRef = doc(db, "incidents", editIncident.id);
    await updateDoc(incidentRef, {
      title: editIncident.title,
      description: editIncident.description,
      date: editIncident.date,
    });
    setEditMode(false);
    setEditIncident({ id: "", title: "", description: "", date: "" });
    fetchIncidents();
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Incidents</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={editMode ? { opacity: 0.2 } : { opacity: 1 }}
          className="space-y-4"
        >
          {incidents &&
            incidents.map((incident) => (
              <div
                key={incident.id}
                className="p-4 bg-slate-100  rounded shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold text-black dark:text-black">
                    {incident.title}
                  </p>
                  <p className="text-sm text-bodydark2 dark:text-gray-400">
                    {incident.date}
                  </p>
                  <p className="text-black dark:text-gray-200">
                    {incident.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={() => handleEdit(incident)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => handleDelete(incident.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {editMode && (
        <div
          className="fixed inset-0 bg-gray-500 opacity-100 text-black flex justify-center items-center"
          style={{ transition: "opacity 0.3s ease" }}
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Incident</h2>
            <input
              className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              type="text"
              value={editIncident.title}
              onChange={(e) =>
                setEditIncident({ ...editIncident, title: e.target.value })
              }
              placeholder="Title"
            />
            <input
              className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              type="date"
              value={editIncident.date}
              onChange={(e) =>
                setEditIncident({ ...editIncident, date: e.target.value })
              }
            />
            <textarea
              className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              value={editIncident.description}
              onChange={(e) =>
                setEditIncident({
                  ...editIncident,
                  description: e.target.value,
                })
              }
              placeholder="Description"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-slate-300 text-black rounded hover:bg-slate-500"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
