import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import { UserContextProvider } from "../contexts/UserContext";

export default function Layout() {
  return (
    <main className={styles.container}>
      <UserContextProvider>
        <Navbar />
        <section className="body">
          <Outlet />
        </section>
        <Footer />
      </UserContextProvider>
    </main>
  );
}
