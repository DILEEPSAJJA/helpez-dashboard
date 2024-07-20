import "./App.css";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Incidents from "./pages/Incidents";
import Resources from "./pages/Resources";
import Members from "./pages/Members";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import AddOrganization from "./pages/AddOrganisation";
import Organisations from "./pages/Organisations";
import OrganisationRequest from "./pages/OrganisationRequest";
import VolunteerLogin from "./pages/VolunteerLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/organisation" element={<OrganisationRequest />} />
        <Route path="/volunteer" element={<VolunteerLogin />} />
        <Route element={<DefaultLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/members" element={<Members />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/organisations" element={<Organisations />} />
          <Route
            path="/organisations/add-organisation"
            element={<AddOrganization />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
