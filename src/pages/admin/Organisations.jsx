import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import app from "../../utils/firebase";
import { Link } from "react-router-dom";

const Organisations = () => {
  const db = getFirestore(app);
  const [organizations, setOrganizations] = useState(null);
  const [organizationRequests, setOrganizationRequests] = useState(null);
  const [viewRequests, setViewRequests] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const orgSnapshot = await getDocs(collection(db, "organisations"));
      const orgData = orgSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const acceptedOrgs = orgData.filter((org) => org.isAccepted);
      const notAcceptedOrgs = orgData.filter((org) => !org.isAccepted);

      setOrganizations(acceptedOrgs);
      setOrganizationRequests(notAcceptedOrgs);
    };

    fetchOrganizations();
  }, [db]);

  const handleAccept = async (id) => {
    const orgRef = doc(db, "organisations", id);
    await updateDoc(orgRef, { isAccepted: true });
    const acceptedOrg = organizationRequests.find((org) => org.id === id);
    setOrganizationRequests((prevRequests) =>
      prevRequests.filter((org) => org.id !== id)
    );
    setOrganizations((prevOrgs) => [
      ...prevOrgs,
      { ...acceptedOrg, isAccepted: true },
    ]);
  };

  const handleDelete = async (id, type) => {
    const orgRef = doc(db, "organisations", id);
    await deleteDoc(orgRef);
    if (type == "req")
      setOrganizationRequests((prevRequests) =>
        prevRequests.filter((org) => org.id !== id)
      );
    else
      setOrganizations((prevOrgs) => prevOrgs.filter((org) => org.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-end items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setViewRequests(!viewRequests)}
            className="border p-2 rounded-lg dark:hover:bg-slate-700 hover:bg-slate-200"
          >
            {viewRequests ? "Hide Requests" : "View Requests"}
          </button>
          <Link to="/admin/organisations/add-organisation">
            <button className="border p-2 rounded-lg dark:hover:bg-slate-700 hover:bg-slate-200">
              Add Organisation
            </button>
          </Link>
        </div>
      </div>
      {viewRequests && (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Requests from Organisations
          </h1>
          {organizationRequests?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {organizationRequests.map((org, index) => (
                <div key={index} className="p-4 border rounded shadow">
                  <h2 className="text-xl font-semibold break-all">
                    {org.name}
                  </h2>
                  <p>{org.description}</p>
                  <p className="break-all">
                    <strong>Contact:</strong> {org.contact}
                  </p>
                  <p className="break-all">
                    <strong>Address:</strong> {org.address}
                  </p>
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => handleAccept(org.id)}
                      className="w-1/2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDelete(org.id)}
                      className="w-1/2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="my-4 text-xl">No requests found...</p>
          )}
        </>
      )}
      <h1 className="text-2xl font-bold mb-4">Connected Organisations</h1>
      {organizations?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {organizations.map((org, index) => (
            <div key={index} className="p-4 border rounded shadow relative">
              <h2 className="text-xl font-semibold break-all">{org.name}</h2>
              <p>{org.description}</p>
              <p className="break-all">
                <strong>Contact:</strong> {org.contact}
              </p>
              <p className="break-all">
                <strong>Address:</strong> {org.address}
              </p>
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => handleDelete(org.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-primary dark:fill-white"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="none"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-xl">No organisations found...</p>
      )}
    </div>
  );
};

export default Organisations;
