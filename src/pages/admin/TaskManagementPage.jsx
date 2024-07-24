import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import app from "../../utils/firebase";

export default function TaskManagementPage() {
  const db = getFirestore(app);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState({
    id: "",
    title: "",
    description: "",
    userId: "",
    userName: "",
    status: "",
    phoneNumber: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const userSnapshot = await getDocs(collection(db, "users"));
      const userList = userSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.assignedIncident);
      setUsers(userList);

      const taskSnapshot = await getDocs(collection(db, "tasks"));
      const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(taskList);
      setFilteredTasks(taskList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleCreateTask = async () => {
    if (!editTask.userId || !editTask.title || !editTask.description) {
      alert("Please complete all fields.");
      return;
    }

    const selectedUser = users.find(user => user.id === editTask.userId);
    if (!selectedUser) {
      alert("Selected user not found.");
      return;
    }

    const task = {
      title: editTask.title,
      description: editTask.description,
      userId: editTask.userId,
      userName: selectedUser.name,
      status: "Pending",
      phoneNumber: selectedUser.phoneNumber,
    };

    try {
      const docRef = await addDoc(collection(db, "tasks"), task);
      const newTask = { ...task, id: docRef.id };
      setTasks([...tasks, newTask]);
      setFilteredTasks([...filteredTasks, newTask]);
      setEditTask({
        id: "",
        title: "",
        description: "",
        userId: "",
        userName: "",
        status: "",
        phoneNumber: "",
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async () => {
    if (!editTask.userId || !editTask.title || !editTask.description) {
      alert("Please complete all fields.");
      return;
    }

    const selectedUser = users.find(user => user.id === editTask.userId);
    if (!selectedUser) {
      alert("Selected user not found.");
      return;
    }

    const updatedTask = {
      title: editTask.title,
      description: editTask.description,
      userId: editTask.userId,
      userName: selectedUser.name,
      status: editTask.status,
      phoneNumber: selectedUser.phoneNumber,
    };

    try {
      await updateDoc(doc(db, "tasks", editTask.id), updatedTask);
      const updatedTasks = tasks.map(task => 
        task.id === editTask.id ? { ...updatedTask, id: editTask.id } : task
      );
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      setEditMode(false);
      setEditTask({
        id: "",
        title: "",
        description: "",
        userId: "",
        userName: "",
        status: "",
        phoneNumber: "",
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditMode(true);
    setEditTask(task);
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setFilter(filterValue);
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(filterValue) ||
      task.userName.toLowerCase().includes(filterValue)
    );
    setFilteredTasks(filtered);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="p-2 flex-grow border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          placeholder="Search by task title or user name"
          value={filter}
          onChange={handleFilterChange}
        />
        <button
          className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
          onClick={() => setShowCreateForm(true)}
        >
          Create Task
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-slate-100 dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold text-black">{task.title}</p>
                <p className="text-sm text-black dark:text-gray-200">{task.description}</p>
                <p className="text-sm text-black dark:text-gray-200">
                  <span className="font-bold">Assigned to: </span>{task.userName}
                </p>
                <p className="text-sm text-black dark:text-gray-200">
                  <span className="font-bold">Status: </span>{task.status}
                </p>
                <p className="text-sm text-black dark:text-gray-200">
                  <span className="font-bold">Phone: </span>{task.phoneNumber}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(showCreateForm || editMode) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-1/3 text-black">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Task" : "Create New Task"}
            </h2>
            <input
              className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              type="text"
              value={editTask.title}
              onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
              placeholder="Title"
            />
            <textarea
              className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              value={editTask.description}
              onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
              placeholder="Description"
            />
            <select
              className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              value={editTask.userId}
              onChange={(e) => setEditTask({ ...editTask, userId: e.target.value })}
            >
              <option value="">Select Volunteer</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                onClick={editMode ? handleUpdateTask : handleCreateTask}
              >
                {editMode ? "Update" : "Create"}
              </button>
              <button
                className="px-4 py-2 bg-slate-300 text-black rounded-lg hover:bg-slate-500"
                onClick={() => {
                  setShowCreateForm(false);
                  setEditMode(false);
                  setEditTask({
                    id: "",
                    title: "",
                    description: "",
                    userId: "",
                    userName: "",
                    status: "",
                    phoneNumber: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}