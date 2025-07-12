import React from "react";
//import { Routes, Route, Navigate } from "react-router-dom";
//import Login from "./pages/auth/Login";
import Sites from "./pages/Sites";
import { Route, Routes } from "react-router-dom";
//import Register from "./pages/auth/Register";
//import Dashboard from "./pages/Dashboard";
import SiteDetails from "./pages/SiteDetails";
//import TopBar from "./components/TopBar";
import WorkHours from "./pages/WorkHours";
import LandingPage from "./pages/LandingPage";
import SnackbarAlerts from "./components/snackbarAlerts";

const App: React.FC = () => {
  //const token = localStorage.getItem("token");

  return (
    <>
      <SnackbarAlerts />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/site/:id" element={<SiteDetails />} />
        <Route path="/workhours" element={<WorkHours />} />
      </Routes>
    </>
  );
};

export default App;

/*
<Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/sites"
        element={token ? <SitesList /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/sites/new"
        element={token ? <NewSite /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/sites/:id"
        element={token ? <SiteDetails /> : <Navigate to="/login" replace />}
      />
      <Route
        path="*"
        element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
*/
