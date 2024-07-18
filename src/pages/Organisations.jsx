import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../utils/firebase";
import { Link } from "react-router-dom";

const Organisations = () => {
  const db = getFirestore(app);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const orgSnapshot = await getDocs(collection(db, "organisations"));
      const orgData = orgSnapshot.docs.map((doc) => doc.data());
      setOrganizations(orgData);
    };

    fetchOrganizations();
  }, [db]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Connected Organisations</h1>
        <Link to="/organisations/add-organisation">
          <button className="border p-2 rounded-lg dark:hover:bg-slate-700 hover:bg-slate-200">
            Add organisation
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {organizations.map((org, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{org.name}</h2>
            <p>{org.description}</p>
            <p>
              <strong>Contact:</strong> {org.contact}
            </p>
            <p>
              <strong>Address:</strong> {org.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organisations;
