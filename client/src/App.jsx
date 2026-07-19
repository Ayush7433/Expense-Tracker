import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Expenses from "./pages/Expenses";
import Profile from "./pages/Profile";
import Budgets from "./pages/Budgets";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/budgets" element={<Budgets />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
