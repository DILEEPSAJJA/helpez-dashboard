import "./App.css";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Incidents from "./pages/Incidents";
import Resources from "./pages/Resources";
import Members from "./pages/Members";

function App() {
  return (
    <>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/members" element={<Members />} />
        </Routes>
      </DefaultLayout>
    </>
  );
}

export default App;
