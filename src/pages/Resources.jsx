import React, { useEffect, useState, useRef, useCallback } from "react";
import app from "../utils/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  deleteDoc,
  doc,
} from "firebase/firestore";
import GoogleMapReact from "google-map-react";

export default function Resources() {
  const db = getFirestore(app);
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

  const fetchResources = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "requests"));
    const data = snapshot.docs.map((doc) => {
      const vals = doc.data();
      const id = doc.id;
      return { id, ...vals };
    });
    setResources(data);
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
    const selected = resources.find(r => r.id === id);
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

  const sortedResources = filteredResources.sort((a, b) =>
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
      <div style={{ height: "500px", width: "100%", position: "relative" }}>
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1, backgroundColor: "white", padding: "10px", borderRadius: "5px" }}>
          <select 
            value={selectedResourceId} 
            onChange={handleResourceSelect}
            className="p-2 border bg-white rounded text-black"
          >
            <option value="">Select a resource</option>
            {resources.map(resource => (
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
        >
          {/* No custom markers needed here */}
        </GoogleMapReact>
      </div>
    );
  };

  // Cleanup effect for marker
  useEffect(() => {
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Resources</h1>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label className="mr-2">Category:</label>
          <select
            name="category"
            value={filter.category}
            onChange={handleFilterChange}
            className="p-2 border bg-transparent rounded"
          >
            <option className="text-black" value="All">All</option>
            <option className="text-black" value="Clothing">Clothing</option>
            <option className="text-black" value="Technical">Technical</option>
            <option className="text-black" value="Food">Food</option>
          </select>
          <label className="mr-2 ml-4">Severity:</label>
          <select
            name="severity"
            value={filter.severity}
            onChange={handleFilterChange}
            className="p-2 border bg-transparent rounded"
          >
            <option className="text-black" value="All">All</option>
            <option className="text-black" value="Low">Low</option>
            <option className="text-black" value="Medium">Medium</option>
            <option className="text-black" value="High">High</option>
          </select>
        </div>
        <div>
          <button
            onClick={handleToggleMap}
            className="ml-4 px-4 py-2 mr-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {showMap ? "Hide Map" : "Show Map"}
          </button>
          <label className="mr-2">Sort by:</label>
          <select
            value={sortField}
            onChange={handleSortChange}
            className="p-2 border bg-transparent rounded"
          >
            <option className="text-black" value="neededBy">Needed By</option>
            <option className="text-black" value="severity">Severity</option>
          </select>
        </div>
      </div>

      {showMap && renderMap()}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {sortedResources?.length > 0 ? (
            <div className="space-y-4 my-4">
              {sortedResources?.map((resource) => (
                <div
                  key={resource.id}
                  className="p-4 dark:bg-slate-200 bg-slate-100 rounded shadow-md flex justify-between items-center"
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
                    <span className="ext-sm text-black">
                      <span className="font-bold">category: </span>
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
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => handleDelete(resource.id)}
                    >
                      Delete
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