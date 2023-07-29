import { useState, useEffect, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardLoginPage from "./pages/DashboardLoginPage";
import PostLoginPage from "./pages/PostLoginPage";
import RoutePage from "./pages/RoutePage/routepage";
import MapsPage from "./pages/MapsPage";
import { GlobalContex } from "./globalContext";
import FirstPage from "./pages/Registration/pages/FirstPage";
import RegistrationHomePage from "./pages/Registration/pages/HomePage";

function App() {
  const { loginData, selectedApp, setSelectedApp, globalMenu, MainMenu } =
    useContext(GlobalContex);

  useEffect(() => {
    if (localStorage.getItem("selectedApp") && selectedApp === null) {
      setSelectedApp(JSON.parse(localStorage.getItem("selectedApp")));
    } else if (localStorage.getItem("selectedApp")) {
      localStorage.setItem("selectedApp", JSON.stringify(selectedApp));
    } else {
      localStorage.setItem("selectedApp", JSON.stringify(MainMenu[0]));
      setSelectedApp(MainMenu[0]);
    }
  }, [selectedApp]);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/dashboard" element={<DashboardLoginPage />} /> */}
      <Route
        exact
        path="/register"
        element={
          window.innerWidth > 600 ? (
            <RegistrationHomePage />
          ) : (
            <DashboardLoginPage />
          )
        }
      />
      <Route
        exact
        path="/register/affiliate"
        element={
          window.innerWidth > 600 ? <FirstPage /> : <DashboardLoginPage />
        }
      />
      <Route
        exact
        path="/register/affiliate/:id"
        element={
          window.innerWidth > 600 ? <FirstPage /> : <DashboardLoginPage />
        }
      />
      <Route exact path="/register/pre-registered" element={<FirstPage />} />
      <Route
        exact
        path="/register/pre-registered/:id"
        element={<FirstPage />}
      />
      <Route exact path="/register/by-myself" element={<FirstPage />} />
      <Route exact path="/register/by-myself/:id" element={<FirstPage />} />
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
