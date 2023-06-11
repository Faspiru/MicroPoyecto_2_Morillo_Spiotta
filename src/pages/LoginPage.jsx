import React, { useState } from "react";
import Input from "../components/Input";
import styles from "./LoginPage.module.css";
import Button from "../components/Button";
import {
  loginWithEmailAndPassword,
  singInWithGoogle,
} from "../firebase/auth-service";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const onSumbit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;
    await loginWithEmailAndPassword(email, password);
    navigate("/");
  };

  const handleSingInWithGoogle = async () => {
    await singInWithGoogle();
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form className={styles.form} onSubmit={onSumbit}>
          <div className={styles.title}>INICIAR SESIÓN</div>
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
        <div className={styles.formGoogle}>
          <Button size="small" onClick={handleSingInWithGoogle}>
            Registrar con Google
          </Button>
        </div>
        <div className={styles.registroButton}>
          <Button href="register" variant="text">
            Registrate Aqui!
          </Button>
        </div>
      </div>
    </div>
  );
}
