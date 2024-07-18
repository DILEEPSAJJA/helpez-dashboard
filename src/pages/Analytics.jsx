import React, { useState, useEffect } from "react";
import app from "../utils/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import IncidentDonut from "../components/charts/IncidentDonut";
import RequestDonut from "../components/charts/RequestDonut";

export default function Analytics() {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);
  const [incidents, setIncidents] = useState(null);
  const [requests, setRequests] = useState(null);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const incidentSnapshot = await getDocs(collection(db, "incidents"));
      setIncidents(incidentSnapshot);

      const requestSnapshot = await getDocs(collection(db, "requests"));
      setRequests(requestSnapshot);
    };

    fetchData();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <p>loading..</p>
        </div>
      ) : (
        <>
          <div>
            <IncidentDonut incidents={incidents} />
            <RequestDonut requests={requests} />
          </div>
        </>
      )}
    </>
  );
}
