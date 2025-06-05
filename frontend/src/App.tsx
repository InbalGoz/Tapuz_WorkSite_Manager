import React from "react";
//import { Routes, Route, Navigate } from "react-router-dom";
//import Login from "./pages/auth/Login";
import TopBar from "./components/TopBar";
//import Register from "./pages/auth/Register";
//import Dashboard from "./pages/Dashboard";
//import SitesList from "./pages/SitesList";
//import SiteDetails from "./pages/SiteDetails";
//import NewSite from "./pages/NewSite";

const App: React.FC = () => {
  //const token = localStorage.getItem("token");

  return (
    <>
      <TopBar />
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
