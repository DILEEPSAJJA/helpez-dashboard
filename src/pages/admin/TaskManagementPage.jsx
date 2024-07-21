import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, updateDoc, doc, getDocs, deleteDoc } from "firebase/firestore";
import app from "../../utils/firebase";
import TaskForm from "../../components/TaskForm"; // Ensure this component exists and is correctly imported

export default function TaskManagementPage() {
  const db = getFirestore(app);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const userSnapshot = await getDocs(collection(db, "users"));
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);

        // Fetch incidents
        const incidentSnapshot = await getDocs(collection(db, "incidents"));
        const incidentList = incidentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setIncidents(incidentList);

        // Fetch tasks
        const taskSnapshot = await getDocs(collection(db, "tasks"));
        const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(taskList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [db]);

  const handleAddTask = async () => {
    if (!selectedUserId || !taskTitle || !taskDescription) {
      alert("Please select a user and provide task details.");
      return;
    }

    const selectedUser = users.find(user => user.id === selectedUserId);
    if (!selectedUser) {
      alert("Selected user not found.");
      return;
    }

    const task = {
      title: taskTitle,
      description: taskDescription,
      userId: selectedUserId,
      incidentId: selectedUser.assignedIncident?.id || "Unknown Incident",
      userName: selectedUser.name,
      incidentName: selectedUser.assignedIncident?.title || "Unknown Incident",
      userPhoneNumber: selectedUser.phoneNumber,
      status: "Pending",
    };

    try {
      const docRef = await addDoc(collection(db, "tasks"), task);
      setTasks([...tasks, { ...task, id: docRef.id }]);
      setTaskTitle("");
      setTaskDescription("");
      setSelectedUserId(null);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Filter users with assigned incidents
  const usersWithAssignedIncidents = users.filter(user => user.assignedIncident);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

      {/* User Selection and Task Form */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Create a New Task</h2>
        <select
          value={selectedUserId || ""}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        >
          <option value="" disabled>Select User</option>
          {usersWithAssignedIncidents.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} - {user.assignedIncident?.title || "No Assigned Incident"}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <textarea
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Task
        </button>
      </div>

      <div className="my-5">
        <h2 className="text-xl font-bold">Tasks</h2>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="border p-4 mb-2 rounded relative">
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p>Incident: {task.incidentName}</p>
              <p>Assigned to: {task.userName}</p>
              <p>Status: {task.status}</p>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="absolute top-2 right-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
