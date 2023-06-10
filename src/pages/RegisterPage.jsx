import React, { useState } from "react";
import styles from "./RegisterPage.module.css";
import Input from "../components/Input";
import Button from "../components/Button";
import { registerWithEmailAndPassword } from "../firebase/auth-service";

export default function RegisterPage() {
  const onSumbit = async (event) => {
    event.preventDefault();
    console.log({ formData });
    await registerWithEmailAndPassword(formData.email, formData.password);
  };

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form className={styles.form} onSubmit={onSumbit}>
          <div className={styles.title}>CREAR CUENTA</div>
          <div className={styles.input}>
            <Input
              name="nombre"
              labelText="Nombre"
              placeholder="Nombre"
              onChange={handleOnChange}
            ></Input>
          </div>
          <div className={styles.input}>
            <Input
              name="email"
              labelText="Email"
              placeholder="Email"
              onChange={handleOnChange}
            ></Input>
          </div>
          <div className={styles.inputBottom}>
            <Input
              name="password"
              labelText="Password"
              placeholder="Password"
              onChange={handleOnChange}
            ></Input>
          </div>
          <Button>ENVIAR</Button>
        </form>
        <div className={styles.loginButton}>
          <Button href="login" variant="text">
            Ya tienes cuenta? Inicia sesion Aqui!
          </Button>
        </div>
      </div>
    </div>
  );
}
