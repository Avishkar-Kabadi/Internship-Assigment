import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ListPage from "./pages/ListPage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import ChartPage from "./pages/ChartPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import PhotoResultPage from "./pages/PhotoResultPage.jsx";



export default function App() {
  const data = useSelector((store) => store.app);
  const isLoggedIn = data.length == 0 ? false : true

  return (
    <Routes>
      <Route
        path="/login"
        element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" replace />}
      />

      <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
        <Route index element={<ListPage />} />
        <Route path="details/:id" element={<DetailsPage />} />
        <Route path="/charts" element={<ChartPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/result" element={<PhotoResultPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}