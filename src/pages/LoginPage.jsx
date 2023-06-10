import React from "react";
import Input from "../components/Input";
import styles from "./LoginPage.module.css";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import googleIcon from "../assets/GoogleIcon.svg";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.form}>
          <div className={styles.title}>INICIAR SESIÓN</div>
          <div className={styles.input}>
            <Input labelText="Nombre" placeholder="Nombre"></Input>
          </div>
          <div className={styles.input}>
            <Input labelText="Email" placeholder="Email"></Input>
          </div>
          <div className={styles.inputBottom}>
            <Input labelText="Password" placeholder="Password"></Input>
          </div>
          <Button>ENVIAR</Button>
        </div>
        <div className={styles.formGoogle}>
          <div>O inicie sesion con</div>
          <Link to="#">
            <img src={googleIcon}></img>
          </Link>
        </div>
        <div className={styles.registroButton}>
          <Button href="register" variant="text">
            No tienes cuenta? Registrate Aqui!
          </Button>
        </div>
      </div>
    </div>
  );
}
