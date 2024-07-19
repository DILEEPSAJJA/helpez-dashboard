import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import DefaultHeader from "../components/Header/DefaultHeader";

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
      alert("request sent succesfully!!");
      navigate("/");
    } catch (error) {
      console.error("Error sending request: ", error);
      alert("Failed to add request.");
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#111a22]">
        <DefaultHeader />
        <div className="container mx-auto">
          <div className="px-40 flex flex-1 justify-center py-2">
            <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-white tracking-light text-[32px] font-bold leading-tight">
                    Request Collaboration
                  </p>
                  <p className="text-[#93adc8] text-sm font-normal leading-normal">
                    Thank you for your interest in collaborating with us. Please
                    fill out the form below and we will get back to you as soon
                    as possible.
                  </p>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-white text-base font-medium leading-normal pb-2">
                      Organization Name
                    </p>
                    <input
                      placeholder="Enter organization name"
                      onChange={(e) => setName(e.target.value)}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#344d65] bg-[#1a2632] focus:border-[#344d65] h-14 placeholder:text-[#93adc8] p-[15px] text-base font-normal leading-normal"
                      required
                    />
                  </label>
                </div>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-white text-base font-medium leading-normal pb-2">
                      Contact details
                    </p>
                    <input
                      placeholder="Enter your preferred contact details"
                      onChange={(e) => setContact(e.target.value)}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#344d65] bg-[#1a2632] focus:border-[#344d65] h-14 placeholder:text-[#93adc8] p-[15px] text-base font-normal leading-normal"
                      required
                    />
                  </label>
                </div>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-white text-base font-medium leading-normal pb-2">
                      Address
                    </p>
                    <input
                      placeholder="Enter the headquarter's address"
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#344d65] bg-[#1a2632] focus:border-[#344d65] h-14 placeholder:text-[#93adc8] p-[15px] text-base font-normal leading-normal"
                      required
                    />
                  </label>
                </div>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-white text-base font-medium leading-normal pb-2">
                      Please describe your organization and what you hope to
                      achieve through collaboration?
                    </p>
                    <textarea
                      placeholder="Enter details here"
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#344d65] bg-[#1a2632] focus:border-[#344d65] min-h-36 placeholder:text-[#93adc8] p-[15px] text-base font-normal leading-normal"
                      required
                    ></textarea>
                  </label>
                </div>
                <div className="flex px-4 py-3">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Submit</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganisationRequest;
