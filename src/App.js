import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardLoginPage from "./pages/DashboardLoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardLoginPage />} />
    </Routes>
  );
}

export default App;
