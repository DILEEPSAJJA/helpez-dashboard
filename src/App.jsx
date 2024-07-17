import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  return (
    <>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </DefaultLayout>
    </>
  );
}

export default App;
