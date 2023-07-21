import { useState, useEffect, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardLoginPage from "./pages/DashboardLoginPage";
import PostLoginPage from "./pages/PostLoginPage";
import RoutePage from "./pages/RoutePage/routepage";
import MapsPage from "./pages/MapsPage";
import { GlobalContex } from "./globalContext";

function App() {
  const { loginData, selectedApp, setSelectedApp, globalMenu } =
    useContext(GlobalContex);

  useEffect(() => {

    if (localStorage.getItem("selectedApp") && selectedApp === null) {
      setSelectedApp(JSON.parse(localStorage.getItem("selectedApp")));
    } else if (localStorage.getItem("selectedApp")) {
      localStorage.setItem("selectedApp", JSON.stringify(selectedApp));
    } else {
      localStorage.setItem("selectedApp", JSON.stringify(globalMenu[0]));
      setSelectedApp(globalMenu[0]);
    }
  }, [selectedApp]);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/dashboard" element={<DashboardLoginPage />} /> */}
      <Route
        path="/example"
        element={
          loginData !== null ? (
            <Navigate to={`/${selectedApp?.appName}`} />
          ) : (
            <DashboardLoginPage />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          loginData !== null ? (
            <Navigate to={`/${selectedApp?.appName}`} />
          ) : (
            <DashboardLoginPage />
          )
        }
      />
      <Route
        path="/*"
        element={
          loginData !== null ? <RoutePage /> : <Navigate to="/dashboard" />
        }
      />
      <Route path="/postLogin" element={<PostLoginPage />} />
      <Route path="/maps" element={<MapsPage />} />
    </Routes>
  );
}

export default App;
