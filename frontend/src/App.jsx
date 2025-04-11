import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landingpage" />} /> {/* 👈 Redirect */}
      <Route path="/landingpage" element={<LandingPage />} />
    </Routes>
  );
};

export default App;
