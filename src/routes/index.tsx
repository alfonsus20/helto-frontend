import { Route, Routes } from "react-router-dom";
import AuthRoute from "../components/AuthRoute";
import ProtectedRoute from "../components/ProtectedRoute";
import AgendaList from "./AgendaList";
import DiseaseDetection from "./DiseaseDetection";
import Home from "./Home";
import Login from "./Login";
import News from "./News";
import NewsList from "./NewsList";
import NotFound from "./NotFound";
import PostThread from "./PostThread";
import Register from "./Register";
import TipsAndTrick from "./TipsAndTrick";
import VideoList from "./VideoList";

const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/berita" element={<News />} />
      <Route path="/berita/daftar-berita" element={<NewsList />} />
      <Route path="/berita/agenda" element={<AgendaList />} />
      <Route path="/berita/video" element={<VideoList />} />
      <Route path="/tips-dan-trik" element={<TipsAndTrick />} />
      <Route element={<AuthRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/deteksi-penyakit" element={<DiseaseDetection />} />
        <Route path="/post-thread" element={<PostThread />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteList;
