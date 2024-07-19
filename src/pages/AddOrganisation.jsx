import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const AddOrganisation = () => {
  const navigate = useNavigate();
  const db = getFirestore(app);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrg = {
      name,
      description,
      contact,
      address,
      isAccepted: true,
    };

    try {
      await addDoc(collection(db, "organisations"), newOrg);
      alert("Organisation added successfully!");
      navigate("/organisations");
      // Clear the form
      setName("");
      setDescription("");
      setContact("");
      setAddress("");
    } catch (error) {
      console.error("Error adding organisation: ", error);
      alert("Failed to add organisation.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Organisation</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Organisation Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add Organisation
        </button>
      </form>
    </div>
  );
};

export default AddOrganisation;
