import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MovieSpecs from "./pages/MovieSpecs";
import ProfilePage from "./pages/ProfilePage";
import ReservePage from "./pages/ReservePage";
import AdminPage from "./pages/AdminPage";
import RegisterPage from "./pages/RegisterPage";
import { PrivateRoute } from "./components/privateRoute";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/reserve"
          element={
            <PrivateRoute>
              <ReservePage />
            </PrivateRoute>
          }
        />
        <Route path="/movieSpec/:movieId" element={<MovieSpecs />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
      </Route>
    </Route>
  )
);
