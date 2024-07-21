import React, { useEffect, useState } from "react";
import app from "../../utils/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

export default function Incidents() {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIncident, setEditIncident] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
  });
  const [showAssignPopover, setShowAssignPopover] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [members, setMembers] = useState([]);

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

  const handleOpenAssignPopover = async (incident) => {
    setSelectedIncident(incident);

    // Fetch members (users with isMember: true)
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("isMember", "==", true));
    const querySnapshot = await getDocs(q);
    const membersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      isAssigned:
        incident.suitableVolunteers?.some((v) => v.phoneNumber === doc.id) ||
        false,
    }));

    setMembers(membersData);
    setShowAssignPopover(true);
  };

  const handleAssignVolunteer = async (member) => {
    const userRef = doc(db, "users", member.id);
    const incidentRef = doc(db, "incidents", selectedIncident.id);
    const newAssignedStatus = !member.isAssigned;

    // Update user document
    await updateDoc(userRef, {
      isAssigned: newAssignedStatus,
      assignedIncident: newAssignedStatus
        ? { id: selectedIncident.id, title: selectedIncident.title }
        : null,
    });

    // Update incident document
    const updatedSuitableVolunteers = newAssignedStatus
      ? [
          ...(selectedIncident.suitableVolunteers || []),
          { name: member.name, phoneNumber: member.id, role: member.role },
        ]
      : (selectedIncident.suitableVolunteers || []).filter(
          (v) => v.phoneNumber !== member.id
        );

    await updateDoc(incidentRef, {
      suitableVolunteers: updatedSuitableVolunteers,
    });

    // Update local state
    setMembers((prevMembers) =>
      prevMembers.map((m) =>
        m.id === member.id ? { ...m, isAssigned: newAssignedStatus } : m
      )
    );

    // Refresh incidents
    fetchIncidents();
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
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="p-4 bg-slate-100 rounded-xl shadow-md flex flex-wrap justify-between items-center"
            >
              <div className="lg:w-[85%]">
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
              <div className="flex space-x-2 pt-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                  onClick={() => handleOpenAssignPopover(incident)}
                >
                  Assign Task
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => handleEdit(incident)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
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
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center text-black">
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edit Incident</h2>
            <input
              className="w-full p-2 mb-4 border rounded-lg"
              type="text"
              value={editIncident.title}
              onChange={(e) =>
                setEditIncident({ ...editIncident, title: e.target.value })
              }
              placeholder="Title"
            />
            <input
              className="w-full p-2 mb-4 border rounded-lg"
              type="date"
              value={editIncident.date}
              onChange={(e) =>
                setEditIncident({ ...editIncident, date: e.target.value })
              }
            />
            <textarea
              className="w-full p-2 mb-4 border rounded-lg"
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
                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-700"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-slate-500 text-white rounded-full hover:bg-red-500"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAssignPopover && selectedIncident && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-black">Assign Members</h2>
            <div className="max-h-60 overflow-y-auto">
              {members.length > 0 ? (
                members.map((member) => (
                  <div key={member.id} className="flex items-center mb-2 text-black">
                    <input
                      type="checkbox"
                      id={`member-${member.id}`}
                      checked={member.isAssigned}
                      onChange={() => handleAssignVolunteer(member)}
                      className="mr-2"
                    />
                    <label htmlFor={`member-${member.id}`}>
                      {member.name} - {member.role}
                    </label>
                  </div>
                ))
              ) : (
                <p>No suitable members available for this incident.</p>
              )}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                onClick={() => setShowAssignPopover(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
