import React from "react";
import styles from "./Navbar.module.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { logout } from "../firebase/auth-service";

export default function Navbar() {
  const { user } = useUser();
  console.log(user);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>MetroMovie Logo</div>
      {user ? (
        <div className={styles.logged}>
          <Link to="/profile" className={styles.loggedUser}>
            {user.name}
          </Link>
          <button className={styles.button} onClick={handleLogout}>
            Cerrar sesion
          </button>
        </div>
      ) : (
        <Button href="login" size="medium">
          Iniciar Sesion
        </Button>
      )}
    </div>
  );
}
