import React, { useState } from "react";
import styles from "./RegisterPage.module.css";
import Input from "../components/Input";
import Button from "../components/Button";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import { addDoc, collection, doc, getDocs, setDoc } from "@firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function ReservePage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [boletosVendidos, setBoletosVendidos] = useState(0);

  function extractIdFromRoute() {
    const route = window.location.href;
    const routeParts = route.split("/");
    const idMovie = routeParts[routeParts.length - 1];
    return idMovie;
  }

  const idMovie = extractIdFromRoute();

  async function gettingDocs(movieId) {
    const docRef = doc(db, "reserves", movieId);
    const subCollectionRef = collection(docRef, "costumers");
    const docsSnap = await getDocs(subCollectionRef);
    docsSnap.forEach((doc) => {
      const numBoleto = parseInt(doc.data().boletos);
      console.log(numBoleto);
      /* setBoletosVendidos(numBoleto); */
    });
  }

  gettingDocs(idMovie);

  console.log(boletosVendidos);

  async function creatingSubCollection(movieId, userId, data) {
    const docRef = doc(db, "reserves", movieId, "costumers", userId);
    setDoc(docRef, data);
  }

  const onSumbit = async (event) => {
    event.preventDefault();
    creatingSubCollection(idMovie, user.id, formData);
    navigate("/");
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cedula: "",
    boletos: 0,
    UserId: user.id,
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);

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
          <Button>ENVIAR</Button>
        </form>
      </div>
    </div>
  );
}
