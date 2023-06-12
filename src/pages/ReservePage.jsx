import React, { useEffect, useState } from "react";
import styles from "./ReservePage.module.css";
import Input from "../components/Input";
import Button from "../components/Button";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function ReservePage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [boletosVendidos, setBoletosVendidos] = useState(0);
  const [soldOut, setSoldOut] = useState(false);
  const [precioBoleto, setPrecioBoleto] = useState(0);

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const nuevoPrecioBoleto = randomNumber(1000, 5000);
        setPrecioBoleto(nuevoPrecioBoleto);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  console.log(precioBoleto);

  function extractIdFromRoute() {
    const route = window.location.href;
    const routeParts = route.split("/");
    const idMovie = routeParts[routeParts.length - 1];
    return idMovie;
  }

  const idMovie = extractIdFromRoute();

  async function creatingSubCollection(movieId, userId, data) {
    const docRef = doc(db, "reserves", movieId, "costumers", userId);
    setDoc(docRef, data);
  }

  const onSumbit = async (event) => {
    event.preventDefault();
    const precioF = formData.boletos * precioBoleto;
    console.log(precioF);

    console.log(formData);
    creatingSubCollection(idMovie, user.id, formData);
    const docRef = doc(db, "reserves", idMovie, "costumers", user.id);
    await updateDoc(docRef, {
      precioTotal: precioF,
    });
    navigate("/");
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cedula: "",
    boletos: 0,
    UserId: user.id,
    precioTotal: 0,
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form className={styles.form} onSubmit={onSumbit}>
          <div className={styles.title}>REALIZAR RESERVACION</div>
          <div className={styles.inputBottom}>
            <Input
              type="text"
              name="name"
              labelText="Nombre y Apellido"
              placeholder="Nombre y Apellido"
              onChange={handleOnChange}
            ></Input>
          </div>
          <div className={styles.inputBottom}>
            <Input
              type="text"
              name="cedula"
              labelText="Cedula"
              placeholder="Cedula"
              onChange={handleOnChange}
            ></Input>
          </div>
          <div className={styles.inputBottom}>
            <Input
              type="email"
              name="email"
              labelText="Email"
              placeholder="Email"
              onChange={handleOnChange}
            ></Input>
          </div>
          <div className={styles.inputBottom}>
            <Input
              type="number"
              name="boletos"
              min="1"
              max="5"
              labelText="Cantidad Boletos"
              placeholder="Cantidad Boletos"
              onChange={handleOnChange}
            ></Input>
          </div>
          <div className={styles.precioContainer}>
            <div>Precio de cada boleto: {precioBoleto}$</div>
          </div>
          <Button>ENVIAR</Button>
        </form>
      </div>
    </div>
  );
}
