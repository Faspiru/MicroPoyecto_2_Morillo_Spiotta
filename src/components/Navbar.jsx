import React from "react";
import styles from "./Navbar.module.css";
import Button from "./Button";
import userImage from "../assets/photoUserProfile.svg";
import { Link } from "react-router-dom";

export default function Navbar({ isLogged = false }) {
  const nameUser = "Jhon Doe";

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>MetroMovie Logo</div>
      {isLogged ? (
        <div className={styles.logged}>
          <Link to="/profile" className={styles.loggedUser}>
            {nameUser}
          </Link>
          <Link to="/profile">
            <img src={userImage} className={styles.userImage}></img>
          </Link>
        </div>
      ) : (
        <Button href="login" size="medium">
          Iniciar Sesion
        </Button>
      )}
    </div>
  );
}
