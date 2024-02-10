import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Vans from "./pages/Vans";
import Employee from "./pages/Employee";
import VansForToday from "./pages/VansForToday";
import AddVan from "./pages/AddVan";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Vans />} />
          <Route path="employee" element={<Employee />} />
          <Route path="today" element={<VansForToday />} />
          <Route path="add" element={<AddVan />} />
        </Route>
      </Routes>
    </Router>
  );
}
