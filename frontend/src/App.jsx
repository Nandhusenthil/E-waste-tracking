import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import LandingPage from "./pages/LandingPage";
import MunicipalityDashboard from "./pages/MunicipalityDashboard.jsx";
import RecyclerDashboard from "./pages/RecyclerDashboard.jsx";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landingpage" />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/landingpage" element={<LandingPage />} />
      <Route path="/municipalitydashboard" element={<MunicipalityDashboard />} />
      <Route path="/recyclerdashboard" element={<RecyclerDashboard />} />
    </Routes>
  );
};

export default App;
