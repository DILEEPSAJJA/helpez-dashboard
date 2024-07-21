import React, { useState } from "react";

export default function TaskForm({ onAddTask, onAssignTask, users, incidents }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [incidentId, setIncidentId] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("Pending");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const newTask = {
      title,
      description,
      incidentId,
      userId,
      status
    };

    onAddTask(newTask).finally(() => setIsSubmitting(false));
  };

  const handleAssign = (taskId) => {
    const assignment = { userId, status: "Assigned" };
    onAssignTask(taskId, assignment);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="incident" className="block text-sm font-medium text-gray-700">
            Incident
          </label>
          <select
            id="incident"
            value={incidentId}
            onChange={(e) => setIncidentId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Incident</option>
            {incidents.map((incident) => (
              <option key={incident.id} value={incident.id}>
                {incident.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="user" className="block text-sm font-medium text-gray-700">
            Assign To
          </label>
          <select
            id="user"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
