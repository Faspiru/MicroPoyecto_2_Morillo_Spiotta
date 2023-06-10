import React from "react";
import styles from "./RegisterPage.module.css";
import Input from "../components/Input";
import Button from "../components/Button";

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.form}>
          <div className={styles.title}>CREAR CUENTA</div>
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
        <div className={styles.loginButton}>
          <Button href="login" variant="text">
            Ya tienes cuenta? Inicia sesion Aqui!
          </Button>
        </div>
      </div>
    </div>
  );
}
