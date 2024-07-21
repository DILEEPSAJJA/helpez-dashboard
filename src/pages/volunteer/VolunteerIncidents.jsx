import React, { useEffect, useState, useRef } from "react";
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
import { FaDirections } from "react-icons/fa";

export default function VolunteerIncidents() {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);
  const [incident, setIncident] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const mapRef = useRef(null);
  const mapsRef = useRef(null);
  const [marker, setMarker] = useState(null);
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
      const data = docSnap.data();
      setIncident(data);
      if (data.location) {
        setMapCenter({
          lat: data.location.latitude,
          lng: data.location.longitude,
        });
      }
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (user?.phoneNumber) {
      fetchUserProfile(user.phoneNumber);
    }
  }, [user]);

  const handleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
    mapsRef.current = maps;

    if (incident && incident.location) {
      const position = new maps.LatLng(
        incident.location.latitude,
        incident.location.longitude
      );

      const newMarker = new maps.Marker({
        position: position,
        map: map,
        title: incident.title,
      });

      setMarker(newMarker);
      map.setCenter(position);
    }
  };

  useEffect(() => {
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  const handleNavigation = () => {
    if (incident && incident.location) {
      const { latitude, longitude } = incident.location;
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      window.open(googleMapsUrl, "_blank");
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : incident ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Assigned Incident</h1>
          <div className="space-y-4">
            <div className="p-4 bg-slate-100 rounded-xl shadow-md flex flex-wrap lg:flex-nowrap justify-between items-start">
              <div className="w-full lg:w-1/2 lg:pr-4 relative">
                <div style={{ height: "400px", width: "100%" }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyAcRopFCtkeYwaYEQhw1lLF2bbU50RsQgc",
                      libraries: ["visualization"],
                    }}
                    defaultCenter={{
                      lat: incident.location.latitude,
                      lng: incident.location.longitude,
                    }}
                    defaultZoom={16}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={handleApiLoaded}
                  ></GoogleMapReact>
                </div>
              </div>
              <div className="w-full lg:w-1/2 lg:pl-2">
                <div className="flex justify-between items-center pt-4">
                  <p className="text-lg font-bold text-black dark:text-black">
                    {incident.title}
                  </p>
                  <button
                    className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
                    onClick={handleNavigation}
                  >
                    <FaDirections size={36}/>
                  </button>
                </div>
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
                <div className="grid grid-cols-2 gap-4 my-4">
                  {incident.images && incident.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`incident image ${index}`}
                      className="w-full h-auto rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <p className="light:text-slate-900 text-3xl">
            No incident assigned to you
          </p>
        </div>
      )}
    </div>
  );
}
