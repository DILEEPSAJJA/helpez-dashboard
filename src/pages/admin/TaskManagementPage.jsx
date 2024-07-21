import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import app from "../../utils/firebase";

const taskTemplates = {
  medical: [
    { title: "Assess the Situation", description: "Evaluate the condition of the injured or sick person." },
    { title: "First Aid", description: "Provide necessary first aid if trained and supplies are available." },
    { title: "Contact Emergency Services", description: "Call emergency services and provide them with necessary details." },
    { title: "Assist Emergency Services", description: "Help emergency personnel upon their arrival." },
    { title: "Log Incident", description: "Document details of the incident for future reference." },
  ],
  fire: [
    { title: "Evacuate", description: "Ensure all individuals in the vicinity evacuate safely." },
    { title: "Use Fire Extinguisher", description: "Attempt to extinguish small fires if it is safe to do so." },
    { title: "Call Fire Department", description: "Contact the fire department with details of the fire." },
    { title: "Assist Firefighters", description: "Provide information and assistance to arriving firefighters." },
    { title: "Check for Injuries", description: "Check for and attend to any injuries." },
  ],
  flood: [
    { title: "Move to Higher Ground", description: "Ensure all individuals move to higher and safer ground." },
    { title: "Sandbag Placement", description: "Place sandbags to prevent water from entering buildings." },
    { title: "Assist Evacuation", description: "Help with the evacuation of vulnerable individuals." },
    { title: "Provide Supplies", description: "Distribute essential supplies like food and water." },
    { title: "Assess Damage", description: "Document the extent of the flood damage." },
  ],
  technological: [
    { title: "Identify Issue", description: "Determine the root cause of the technical glitch." },
    { title: "Inform Affected Parties", description: "Notify all affected parties about the delay and issue." },
    { title: "Implement Temporary Solution", description: "Apply a temporary fix to minimize impact." },
    { title: "Document Issue", description: "Record details of the technical glitch for further analysis." },
    { title: "Plan Permanent Fix", description: "Develop a plan for a permanent solution to prevent future occurrences." },
  ]
};

export default function TaskManagementPage() {
  const db = getFirestore(app);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSnapshot = await getDocs(collection(db, "users"));
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);

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
    if (!selectedUserId || !selectedCategory || !selectedTitle) {
      alert("Please complete all fields.");
      return;
    }

    const selectedUser = users.find(user => user.id === selectedUserId);
    const selectedTaskTemplate = taskTemplates[selectedCategory].find(task => task.title === selectedTitle);
    if (!selectedUser || !selectedTaskTemplate) {
      alert("Selected user or task template not found.");
      return;
    }

    const task = {
      title: selectedTitle,
      description: selectedTaskTemplate.description,
      userId: selectedUserId,
      userName: selectedUser.name,
      status: "Pending",
    };

    try {
      const docRef = await addDoc(collection(db, "tasks"), task);
      setTasks([...tasks, { ...task, id: docRef.id }]);
      setSelectedUserId(null);
      setSelectedCategory("");
      setSelectedTitle("");
      setTaskDescription("");
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

  const getTitlesByCategory = (category) => {
    return taskTemplates[category] || [];
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Create a New Task</h2>
        <select
          value={selectedUserId || ""}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        >
          <option value="" disabled>Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <select
          value={selectedCategory || ""}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedTitle(""); // Reset title when category changes
          }}
          className="border p-2 rounded mb-2 w-full"
        >
          <option value="" disabled>Select Category</option>
          {Object.keys(taskTemplates).map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={selectedTitle || ""}
          onChange={(e) => setSelectedTitle(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        >
          <option value="" disabled>Select Title</option>
          {getTitlesByCategory(selectedCategory).map(task => (
            <option key={task.title} value={task.title}>
              {task.title}
            </option>
          ))}
        </select>
        <textarea
          value={selectedTitle ? taskTemplates[selectedCategory].find(task => task.title === selectedTitle)?.description : ""}
          readOnly
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
