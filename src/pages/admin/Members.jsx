import React, { useEffect, useState } from "react";
import app from "../../utils/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Members() {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editMember, setEditMember] = useState({
    id: "",
    name: "",
    age: "",
    location: "",
    phoneNumber: "",
    role: "",
    skills: "",
  });
  const [filter, setFilter] = useState("");

  const fetchMembers = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "volunteers"));
    const data = snapshot.docs.map((doc) => {
      const vals = doc.data();
      const id = doc.id;
      return { id, ...vals };
    });
    setMembers(data);
    setFilteredMembers(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "members", id));
    fetchMembers();
  };

  const handleEdit = (member) => {
    setEditMode(true);
    setEditMember(member);
  };

  const handleSave = async () => {
    const memberRef = doc(db, "members", editMember.id);
    await updateDoc(memberRef, {
      name: editMember.name,
      age: editMember.age,
      location: editMember.location,
      phoneNumber: editMember.phoneNumber,
      role: editMember.role,
      skills: editMember.skills,
    });
    setEditMode(false);
    setEditMember({
      id: "",
      name: "",
      age: "",
      location: "",
      phoneNumber: "",
      role: "",
      skills: "",
    });
    fetchMembers();
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setFilter(filterValue);
    const filtered = members.filter((member) =>
      member.name.toLowerCase().includes(filterValue)
    );
    setFilteredMembers(filtered);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Team Members</h1>
      <input
        type="text"
        className="p-2 mb-4 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        placeholder="Search by name"
        value={filter}
        onChange={handleFilterChange}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="p-4 bg-slate-100 dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold text-black">
                  {member.name}
                </p>
                <p className="text-sm text-black">
                  <span className="font-bold">Age: </span>
                  {member.age} - <span className="font-bold">Location: </span>
                  {member.location}
                </p>
                <p className="text-sm text-black dark:text-gray-200">
                  <span className="font-bold">PhoneNumber: </span>
                  {member.phoneNumber}
                </p>
                <p className="text-sm text-black dark:text-gray-200">
                  <span className="font-bold">Role: </span> {member.role}
                </p>
                <p className="text-sm text-black dark:text-gray-200">
                  <span className="font-bold">Skills: </span> {member.skills}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => handleEdit(member)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                  onClick={() => handleDelete(member.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editMode && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Member</h2>
            <input
              className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              type="text"
              value={editMember.name}
              onChange={(e) =>
                setEditMember({ ...editMember, name: e.target.value })
              }
              placeholder="Name"
            />
            <input
              className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              type="text"
              value={editMember.age}
              onChange={(e) =>
                setEditMember({ ...editMember, age: e.target.value })
              }
              placeholder="Age"
            />
            <input
              className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              type="text"
              value={editMember.location}
              onChange={(e) =>
                setEditMember({ ...editMember, location: e.target.value })
              }
              placeholder="Location"
            />
            <input
              className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              type="text"
              value={editMember.phoneNumber}
              onChange={(e) =>
                setEditMember({ ...editMember, phoneNumber: e.target.value })
              }
              placeholder="Phone Number"
            />
            <input
              className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              type="text"
              value={editMember.role}
              onChange={(e) =>
                setEditMember({ ...editMember, role: e.target.value })
              }
              placeholder="Role"
            />
            <textarea
              className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              value={editMember.skills}
              onChange={(e) =>
                setEditMember({ ...editMember, skills: e.target.value })
              }
              placeholder="Skills"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-slate-300 text-black rounded-lg hover:bg-slate-500"
                onClick={() => setEditMode(false)}
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
