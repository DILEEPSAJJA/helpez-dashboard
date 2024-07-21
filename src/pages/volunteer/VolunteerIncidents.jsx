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
import Modal from "react-modal";
import "../../styles/styles.css";

Modal.setAppElement("#root");

export default function VolunteerIncidents() {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);
  const [incident, setIncident] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useSelector((state) => state.user);

  const fetchUserProfile = async (phoneNumber) => {
    setLoading(true);
    try {
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
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
    setLoading(false);
  };

  const fetchIncident = async (incidentId) => {
    try {
      const docRef = doc(db, "incidents", incidentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const incidentData = docSnap.data();
        setIncident(incidentData);
        fetchTasks(incidentId);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching incident:", error);
    }
  };

  const fetchTasks = async (incidentId) => {
    try {
      const q = query(
        collection(db, "tasks"),
        where("incidentId", "==", incidentId)
      );
      const querySnapshot = await getDocs(q);
      const tasksData = [];
      querySnapshot.forEach((doc) => {
        tasksData.push(doc.data());
      });
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (user?.phoneNumber) {
      fetchUserProfile(user.phoneNumber);
    }
  }, [user]);

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
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: "YOUR_GOOGLE_MAPS_API_KEY" }}
                    defaultCenter={{
                      lat: incident.location.latitude,
                      lng: incident.location.longitude,
                    }}
                    defaultZoom={16}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {incident.images &&
                    incident.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`incident image ${index}`}
                        className="w-full h-auto rounded cursor-pointer"
                        onClick={() => openModal(image)}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Assigned Tasks</h2>
            <ul>
              {tasks.map((task, index) => (
                <li key={index} className="p-4 bg-white rounded shadow mb-4">
                  <h3 className="font-bold">{task.title}</h3>
                  <p>{task.description}</p>
                  <p><strong>Status:</strong> {task.status}</p>
                </li>
              ))}
            </ul>
          </div>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Image Modal" className="modal" overlayClassName="overlay">
            <button onClick={closeModal} className="modal-close-button">Close</button>
            <img src={selectedImage} alt="Selected Incident" className="modal-image" />
          </Modal>
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
