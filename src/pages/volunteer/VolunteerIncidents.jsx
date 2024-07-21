import React, { useEffect, useState } from "react";
import app from "../../utils/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
// import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

export default function VolunteerIncidents() {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);
  const [incident, setIncident] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const { user } = useSelector((state) => state.user);

  const fetchUserProfile = async (phoneNumber) => {
    setLoading(true);
    const q = query(
      collection(db, "users"),
      where("phoneNumber", "==", phoneNumber)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      setUserProfile(userData);
      fetchIncident(userData.assignedIncident.id);
    } else {
      console.log("No such user!");
    }
    setLoading(false);
  };

  const fetchIncident = async (incidentId) => {
    const docRef = doc(db, "incidents", incidentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //   setIncident(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (user?.phoneNumber) {
      fetchUserProfile(user.phoneNumber);
    }
  }, [user]);
  //   const Marker = (props) => {
  //     return <div className="SuperAwesomePin"></div>;
  //   };
  //   const handleApiLoaded = ({ map, maps }) => {
  //     mapRef.current = map;
  //     mapsRef.current = maps;
  //     // renderHeatmap();
  //   };
  //   const renderMarkers = (map, maps) => {
  //     let marker = new maps.Marker({
  //       position: {
  //         lat: incident.location.latitude,
  //         lng: incident.location.longitude,
  //       },
  //       map,
  //       title: "Hello World!",
  //     });
  //     return marker;
  //   };
  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : incident ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Assigned Incident</h1>
          <div className="space-y-4">
            <div className="p-4 bg-slate-100 rounded shadow-md flex flex-wrap justify-between items-center">
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
                <p className="text-black dark:text-gray-200">
                  <strong>Category:</strong> {incident.category}
                </p>
                <p className="text-black dark:text-gray-200">
                  <strong>Contact:</strong> {incident.contact}
                </p>
                <p className="text-black dark:text-gray-200">
                  <strong>Severity:</strong> {incident.severity}
                </p>
                <div className="my-4">
                  {/* <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyAcRopFCtkeYwaYEQhw1lLF2bbU50RsQgc",
                      //   libraries: ["visualization"],
                    }}
                    defaultCenter={{
                      lat: incident.location.latitude,
                      lng: incident.location.longitude,
                    }}
                    defaultZoom={16}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) =>
                      renderMarkers(map, maps)
                    }
                  ></GoogleMapReact> */}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {incident.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`incident image ${index}`}
                      className="w-full h-auto rounded"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <p className="light:text-slate-900 text-3xl">
              No incident assigned to you
            </p>
          </div>
        </>
      )}
    </div>
  );
}
