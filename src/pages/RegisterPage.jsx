import React, { useState } from "react";
import styles from "./RegisterPage.module.css";
import Input from "../components/Input";
import Button from "../components/Button";
import { registerWithEmailAndPassword } from "../firebase/auth-service";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const navigate = useNavigate();
  const onSumbit = async (event) => {
    event.preventDefault();
    const { email, password, ...extraData } = formData;
    await registerWithEmailAndPassword(email, password, extraData);
    navigate("/");
  };

  const [formData, setFormData] = useState({
    name: "",
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
              name="name"
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
            Inicia sesion Aqui!
          </Button>
        </div>
      </div>
    </div>
  );
}
