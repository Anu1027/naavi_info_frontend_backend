import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardLoginPage from "./pages/DashboardLoginPage";
import PostLoginPage from "./pages/PostLoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardLoginPage />} />
      <Route path="/postLogin" element={<PostLoginPage />} />
    </Routes>
  );
}

export default App;
