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

function App() {
  return (
    <>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
        </Routes>
      </DefaultLayout>
    </>
  );
}

export default App;
