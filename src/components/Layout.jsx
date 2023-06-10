import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <main className={styles.container}>
      <Navbar />
      <section className="body">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
}
