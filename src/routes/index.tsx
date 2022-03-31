import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoute from "../components/AdminRoute";
import AuthRoute from "../components/AuthRoute";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminAgenda from "./Admin/Agenda";
import FormAgenda from "./Admin/Agenda/form";
import AdminMedia from "./Admin/Media";
import FormMedia from "./Admin/Media/form";
import AdminNews from "./Admin/News";
import FormNews from "./Admin/News/form";
import AdminTipsAndTrick from "./Admin/TipsAndTrick";
import FormTipsAndTrik from "./Admin/TipsAndTrick/form";
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
      <Route
        path="/tips-dan-trik/selengkapnya"
        element={<TipsAndTrickList />}
      />
      <Route element={<AuthRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/deteksi-penyakit" element={<DiseaseDetection />} />
        <Route path="/komunitas" element={<PostThread />} />
        <Route path="/konsultasi" element={<PostThread />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route
          path="/admin"
          element={<Navigate to="/admin/tips-dan-trik" />}
        />
        <Route path="/admin/tips-dan-trik" element={<AdminTipsAndTrick />} />
        <Route
          path="/admin/tips-dan-trik/tambah"
          element={<FormTipsAndTrik />}
        />
        <Route
          path="/admin/tips-dan-trik/:id/edit"
          element={<FormTipsAndTrik />}
        />
        <Route path="/admin/berita" element={<AdminNews />} />
        <Route path="/admin/berita/tambah" element={<FormNews />} />
        <Route path="/admin/berita/:id/edit" element={<FormNews />} />
        <Route path="/admin/agenda" element={<AdminAgenda />} />
        <Route path="/admin/agenda/tambah" element={<FormAgenda />} />
        <Route path="/admin/agenda/:id/edit" element={<FormAgenda />} />
        <Route path="/admin/media" element={<AdminMedia />} />
        <Route path="/admin/media/tambah" element={<FormMedia />} />
        <Route path="/admin/media/:id/edit" element={<FormMedia />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteList;
