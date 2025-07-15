import React, { useEffect } from "react";
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
import EmployeesPage from "./pages/EmployeesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  //const token = localStorage.getItem("token");
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      //dispatch(restoreSession(token)); // תגדירי thunk שמביא את המשתמש מהשרת לפי הטוקן
    }
  }, []);
  return (
    <>
      <SnackbarAlerts />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/sites" element={<Sites />} />
        <Route path="/site/:id" element={<SiteDetails />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/workhours" element={<WorkHours />} />
      </Routes>
    </>
  );
};

export default App;

/*
 <Route
        path="/sites"
        element={
          <ProtectedRoute>
            <Sites />
          </ProtectedRoute>
        }
      />

      <Route
        path="/site/:id"
        element={
          <ProtectedRoute>
            <SiteDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <EmployeesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/workhours"
        element={
          <ProtectedRoute>
            <WorkHours />
          </ProtectedRoute>
        }
      />
*/
