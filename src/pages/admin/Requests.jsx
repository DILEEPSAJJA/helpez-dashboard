import React, { useEffect, useState, useRef, useCallback } from "react";
import app from "../../utils/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import GoogleMapReact from "google-map-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Resources() {
  const db = getFirestore(app);
  const navigate = useNavigate(); // Initialize useNavigate
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState({ category: "All", severity: "All" });
  const [sortField, setSortField] = useState("neededBy");
  const [showMap, setShowMap] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const mapRef = useRef(null);
  const mapsRef = useRef(null);
  const heatmapRef = useRef(null);
  const [selectedResourceId, setSelectedResourceId] = useState("");
  const [marker, setMarker] = useState(null);
  const [uniqueCategories, setUniqueCategories] = useState(["All"]);

  const fetchResources = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "requests"));
    const data = snapshot.docs.map((doc) => {
      const vals = doc.data();
      const id = doc.id;
      return { id, ...vals };
    });
    setResources(data);

    const categories = [
      "All",
      ...new Set(data.map((resource) => resource.category)),
    ];
    setUniqueCategories(categories);

    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "requests", id));
    fetchResources();
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    setSortField(e.target.value);
  };

  const handleResourceSelect = (e) => {
    const id = e.target.value;
    setSelectedResourceId(id);
    const selected = resources.find((r) => r.id === id);
    if (selected && mapRef.current && mapsRef.current) {
      const position = new mapsRef.current.LatLng(
        selected.location.latitude,
        selected.location.longitude
      );

      if (marker) {
        marker.setPosition(position);
      } else {
        const newMarker = new mapsRef.current.Marker({
          position: position,
          map: mapRef.current,
        });
        setMarker(newMarker);
      }

      mapRef.current.panTo(position);
    }
  };

  const filteredResources = resources.filter((resource) => {
    return (
      (filter.category === "All" || resource.category === filter.category) &&
      (filter.severity === "All" || resource.severity === filter.severity)
    );
  });

  const sortedAndFilteredResources = filteredResources.sort((a, b) =>
    a[sortField].localeCompare(b[sortField])
  );

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "text-red-600";
      case "Moderate":
        return "text-yellow-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    if (resources.length > 0) {
      const avgLat =
        resources.reduce((sum, r) => sum + r.location.latitude, 0) /
        resources.length;
      const avgLng =
        resources.reduce((sum, r) => sum + r.location.longitude, 0) /
        resources.length;
      setMapCenter({ lat: avgLat, lng: avgLng });
    }
  }, [resources]);

  
  const handleShowPickupRequests = () => {
    navigate("/pickup-requests"); // Navigate to the new page
  };
  const renderHeatmap = useCallback(() => {
    if (!mapRef.current || !mapsRef.current || !resources.length) return;

    if (heatmapRef.current) {
      heatmapRef.current.setMap(null);
    }

    const heatmapData = resources.map((resource) => ({
      location: new mapsRef.current.LatLng(
        resource.location.latitude,
        resource.location.longitude
      ),
      weight:
        resource.severity === "High" ? 5 : resource.severity === "Low" ? 1 : 3,
    }));

    heatmapRef.current = new mapsRef.current.visualization.HeatmapLayer({
      data: heatmapData,
      map: mapRef.current,
    });
  }, [resources]);

  useEffect(() => {
    if (showMap && mapRef.current && mapsRef.current) {
      renderHeatmap();
    }
  }, [showMap, renderHeatmap, resources]);

  const handleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
    mapsRef.current = maps;
    renderHeatmap();
  };

  const handleToggleMap = () => {
    setShowMap((prev) => !prev);
  };

  const renderMap = () => {
    return (
      <div
        style={{
          height: "500px",
          width: "100%",
          position: "relative",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 1,
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <select
            value={selectedResourceId}
            onChange={handleResourceSelect}
            className="p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: "transparent" }}
          >
            <option value="">Select a resource</option>
            {sortedAndFilteredResources.map((resource) => (
              <option key={resource.id} value={resource.id}>
                {resource.requestTitle}
              </option>
            ))}
          </select>
        </div>

        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyAcRopFCtkeYwaYEQhw1lLF2bbU50RsQgc",
            libraries: ["visualization"],
          }}
          defaultCenter={mapCenter}
          defaultZoom={16}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={handleApiLoaded}
          options={{
            styles: [
              {
                featureType: "all",
                elementType: "all",
              },
            ],
          }}
        ></GoogleMapReact>
      </div>
    );
  };

  useEffect(() => {
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  const handleSendAlert = async (resourceId) => {
    try {
      await updateDoc(doc(db, "requests", resourceId), {
        sendAlert: true,
      });
      // toast.success("Alert sent successfully");
      console.log("Success alert in send");
      fetchResources();
    } catch (error) {
      console.error("Error sending alert:", error);
      toast.error("Error sending alert");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Requests</h1>
      <div className="mb-4 flex justify-between items-center">
        <div>
        <div className="mb-4 flex justify-between items-center">
  <div>
  <button
          onClick={handleShowPickupRequests}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4"
        >
          Show Pickup Requests
        </button>
    <label className="mr-2">Category:</label>
    <select
      name="category"
      value={filter.category}
      onChange={handleFilterChange}
      className="p-2 border bg-transparent rounded-lg"
    >
      {uniqueCategories.map((category) => (
        <option key={category} className="text-black" value={category}>
          {category}
        </option>
      ))}
    </select>
    <label className="mr-2 ml-4">Severity:</label>
    <select
      name="severity"
      value={filter.severity}
      onChange={handleFilterChange}
      className="p-2 border bg-transparent rounded-lg"
    >
      <option className="text-black" value="All">
        All
      </option>
      <option className="text-black" value="Low">
        Low
      </option>
      <option className="text-black" value="Moderate">
        Moderate
      </option>
      <option className="text-black" value="High">
        High
      </option>
    </select>
    <label className="mr-2 ml-4">Sort by:</label>
    <select
      value={sortField}
      onChange={handleSortChange}
      className="p-2 border bg-transparent rounded-lg"
    >
      <option className="text-black" value="neededBy">
        Needed By
      </option>
      <option className="text-black" value="severity">
        Severity
      </option>
    </select>
  </div>
  <button
  onClick={handleToggleMap}
  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 ml-4"
>
  {showMap ? "Hide Map" : "Show Map"}
</button>

</div>

        </div>
      </div>

      {showMap && renderMap()}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {sortedAndFilteredResources?.length > 0 ? (
            <div className="space-y-4 my-4">
              {sortedAndFilteredResources?.map((resource) => (
                <div
                  key={resource.id}
                  className="p-4 dark:bg-slate-200 bg-slate-100 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black">
                      {resource.requestTitle}
                    </p>
                    <p className="text-black">{resource.requestDescription}</p>
                    <p className="text-sm text-black">
                      <span className="font-bold">Needed By: </span>
                      {resource.neededBy}
                    </p>
                    <span className="text-sm text-black">
                      <span className="font-bold">Category: </span>
                      {resource.category},
                    </span>
                    <span className="ms-2 text-sm text-black">
                      <span className="font-bold">Contact: </span>
                      {resource.contact}
                    </span>
                    <p className="text-sm text-black">
                      <span className="font-bold">Location:</span>
                      {` Lat: ${resource.location.latitude}, Long: ${resource.location.longitude}`}
                    </p>
                    <p
                      className={`text-sm font-semibold ${getSeverityColor(
                        resource.severity
                      )}`}
                    >
                      Severity: {resource.severity}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                      onClick={() => handleDelete(resource.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                      onClick={() => handleSendAlert(resource.id)}
                      disabled={resource.alertSent}
                    >
                      {resource.alertSent ? "Alert Sent" : "Send Alert"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[50vh] flex items-center justify-center">
              <p className="text-center text-gray-600">No resources found.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
