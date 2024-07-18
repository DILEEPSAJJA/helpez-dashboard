import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../utils/firebase";
import IncidentDonut from "../components/charts/IncidentDonut";
import UsersCard from "../components/cards/UsersCard";
import IncidentsCard from "../components/cards/IncidentsCard";
import RequestsCard from "../components/cards/RequestsCard";
import DonationsCard from "../components/cards/DonationsCard";

export default function Dashboard() {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [incidents, setIncidents] = useState(null);
  const [requests, setRequests] = useState(null);
  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      const userSnapshot = await getDocs(collection(db, "users"));
      setUsers(userSnapshot);

      const incidentSnapshot = await getDocs(collection(db, "incidents"));
      setIncidents(incidentSnapshot);

      const requestSnapshot = await getDocs(collection(db, "requests"));
      setRequests(requestSnapshot);
    };

    fetchUsers();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <>
          <p>Loading</p>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <UsersCard users={users} />
            <IncidentsCard incidents={incidents} />
            <RequestsCard requests={requests} />
            <DonationsCard />
          </div>
          <IncidentDonut incidents={incidents} />
        </>
      )}
    </>
  );
}
