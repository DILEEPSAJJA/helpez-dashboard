import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import DefaultHeader from "../../components/Header/DefaultHeader";
import { toast } from "react-toastify";


const OrganisationRequest = () => {
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
      isAccepted: false,
    };

    try {
      await addDoc(collection(db, "organisations"), newOrg);
      toast.success("Request sent successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error sending request: ", error);
      toast.error("Failed to add request..");
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#111a22]">
        <DefaultHeader />
        <div className="flex flex-col items-center justify-center flex-1 w-full p-4">
          <div className="bg-[#1a2632] p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="mb-6 text-center">
              <h1 className="text-white text-2xl font-bold mb-2">
                Request Collaboration
              </h1>
              <p className="text-[#93adc8] text-sm">
                Thank you for your interest in collaborating with us. Please
                fill out the form below and we will get back to you as soon as
                possible.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white text-sm font-medium mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  placeholder="Enter organization name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-[#344d65] bg-[#1a2632] rounded-lg text-white placeholder-[#93adc8] focus:outline-none focus:ring-2 focus:ring-[#344d65]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-medium mb-2">
                  Contact Details
                </label>
                <input
                  type="text"
                  placeholder="Enter your preferred contact details"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full p-3 border border-[#344d65] bg-[#1a2632] rounded-lg text-white placeholder-[#93adc8] focus:outline-none focus:ring-2 focus:ring-[#344d65]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter the headquarter's address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 border border-[#344d65] bg-[#1a2632] rounded-lg text-white placeholder-[#93adc8] focus:outline-none focus:ring-2 focus:ring-[#344d65]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter details here"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-[#344d65] bg-[#1a2632] rounded-lg text-white placeholder-[#93adc8] focus:outline-none focus:ring-2 focus:ring-[#344d65]"
                  required
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button className="bg-[#1980e6] text-white px-24 py-3 rounded-lg font-bold hover:bg-[#146abf] transition duration-300 ease-in-out shadow-lg transform hover:scale-105">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganisationRequest;
