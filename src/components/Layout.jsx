import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <main>
      <Navbar />
      <section className="body">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
}
