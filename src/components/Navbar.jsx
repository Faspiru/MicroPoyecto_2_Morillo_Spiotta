import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Button from "./Button";
import logoImage from "../assets/MetroMovieLogo.svg";
import profileLogo from "../assets/profileLogo.svg";
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
      <div className={styles.logo}>
        <Link className={styles.loggedUser} to="/">
          <img className={styles.image} src={logoImage}></img>Home
        </Link>
      </div>
      {user ? (
        <div className={styles.logged}>
          <Link to="/profile" className={styles.loggedUser}>
            {user.name}
            <img className={styles.imageLogo} src={profileLogo}></img>
          </Link>
          <button className={styles.button} onClick={handleLogout}>
            Cerrar sesion
          </button>
        </div>
      ) : (
        <Link to="/login">
          <Button size="medium">Iniciar Sesion</Button>
        </Link>
      )}
    </div>
  );
}
