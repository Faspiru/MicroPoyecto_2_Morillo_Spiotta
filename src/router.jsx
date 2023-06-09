import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import LoginAndRegisterPage from "./pages/LoginAndRegisterPage";
import HomePage from "./pages/HomePage";
import MovieSpecs from "./pages/MovieSpecs";
import ProfilePage from "./pages/ProfilePage";
import ReservePage from "./pages/ReservePage";
import AdminPage from "./pages/AdminPage";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginAndRegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reserve" element={<ReservePage />} />
        <Route path="/movieSpec" element={<MovieSpecs />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Route>
  )
);
