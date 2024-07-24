import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/public/HomePage";
import AdminLogin from "./pages/public/AdminLogin";
import VolunteerLogin from "./pages/public/VolunteerLogin";
import OrganisationRequest from "./pages/public/OrganisationRequest";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Incidents from "./pages/admin/Incidents";
import Members from "./pages/admin/Members";
import Requests from "./pages/admin/Requests";
import Analytics from "./pages/admin/Analytics";
import Organisations from "./pages/admin/Organisations";
import AddOrganization from "./pages/admin/AddOrganisation";
import NotFound from "./pages/NotFound";
import TaskManagementPage from "./pages/admin/TaskManagementPage";
import PickupRequests from "./pages/PickupRequests";
import Inventory from "./pages/admin/Inventory";

import ProtectedAdminRoute from "./auth/ProtectedAdminRoute";
import ProtectedVolunteerRoute from "./auth/ProtectedVolunteerRoute";
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import VolunteerIncidents from "./pages/volunteer/VolunteerIncidents";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        theme="light"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/organisation" element={<OrganisationRequest />} />
        <Route path="/volunteer" element={<VolunteerLogin />} />
        <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/incidents"
          element={
            <ProtectedAdminRoute>
              <Incidents />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/requests"
          element={
            <ProtectedAdminRoute>
              <Requests />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/pickup-requests"
          element={
            <ProtectedAdminRoute>
              <PickupRequests />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/members"
          element={
            <ProtectedAdminRoute>
              <Members />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedAdminRoute>
              <Analytics />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/organisations"
          element={
            <ProtectedAdminRoute>
              <Organisations />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/organisations/add-organisation"
          element={
            <ProtectedAdminRoute>
              <AddOrganization />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/inventory"
          element={
            <ProtectedAdminRoute>
              <Inventory />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/volunteer/dashboard"
          element={
            <ProtectedVolunteerRoute>
              <VolunteerDashboard />
            </ProtectedVolunteerRoute>
          }
        />
        <Route
          path="/volunteer/incidents"
          element={
            <ProtectedVolunteerRoute>
              <VolunteerIncidents />
            </ProtectedVolunteerRoute>
          }
        />
        <Route
          path="/admin/tasks"
          element={
            <ProtectedAdminRoute>
              <TaskManagementPage />
            </ProtectedAdminRoute>
          }
        />
        {/* <Route path="/admin/tasks" element={<TaskManagementPage />} /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
