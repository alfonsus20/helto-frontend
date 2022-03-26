import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoute from "../components/AuthRoute";
import ProtectedRoute from "../components/ProtectedRoute";
import DiseaseDetection from "./DiseaseDetection";
import Home from "./Home";
import Login from "./Login";

const RouteList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/deteksi-penyakit" element={<DiseaseDetection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteList;
