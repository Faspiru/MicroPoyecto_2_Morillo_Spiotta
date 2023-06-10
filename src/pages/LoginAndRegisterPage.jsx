import React from "react";
import Input from "../components/Input";
import styles from "./LoginAndRegisterPage.module.css";
import Button from "../components/Button";

export default function LoginAndRegisterPage() {
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
      </div>
    </div>
  );
}
