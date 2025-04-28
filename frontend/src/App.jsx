import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import LandingPage from "./pages/LandingPage";
import MunicipalityDashboard from "./pages/MunicipalityDashboard.jsx";
import RecyclerDashboard from "./pages/RecyclerDashboard.jsx";
import GovernmentDashboard from "./pages/GovernmentDashboard";

const App = () => {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Navigate to="/landingpage" />} />
=======
      <Route path="/" element={<Navigate to="/landingpage" />} /> 
      <Route path="/login" element={<Login />} />
>>>>>>> a6e293b9f932b7efb2692c61ab903b813c3e54ed
      <Route path="/landingpage" element={<LandingPage />} />
      <Route path="/municipalitydashboard" element={<MunicipalityDashboard />} />
      <Route path="/recyclerdashboard" element={<RecyclerDashboard />} />
      <Route path="/governmentdashboard/*" element={<GovernmentDashboard />} />
    </Routes>
  );
};

export default App;
