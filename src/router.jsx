import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BlankPage from "./pages/BlankPage";
import ErrorPage from "./pages/ErrorPage";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<BlankPage />} />
      <Route path="/hola" element={<ErrorPage />} />
    </Route>
  )
);
