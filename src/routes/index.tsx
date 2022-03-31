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
import TipsAndTrickList from "./TipsAndTrickList";
import VideoList from "./VideoList";

const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/berita" element={<News />} />
      <Route path="/berita/terkini" element={<NewsList />} />
      <Route path="/berita/agenda" element={<AgendaList />} />
      <Route path="/berita/media" element={<VideoList />} />
      <Route path="/tips-dan-trik" element={<TipsAndTrick />} />
      <Route path="/tips-dan-trik/lengkap" element={<TipsAndTrickList />} />
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
