import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MunicipalityDashboard from "./pages/MunicipalityDashboard.jsx";
import RecyclerDashboard from "./pages/RecyclerDashboard.jsx";
import GovernmentDashboard from "./pages/GovernmentDashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landingpage" />} />
      <Route path="/landingpage" element={<LandingPage />} />
      <Route path="/municipalitydashboard" element={<MunicipalityDashboard />} />
      <Route path="/recyclerdashboard" element={<RecyclerDashboard />} />
      <Route path="/governmentdashboard/*" element={<GovernmentDashboard />} />
    </Routes>
  );
};

export default App;
