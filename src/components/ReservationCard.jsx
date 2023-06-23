import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import Button from "./Button";
import { getMoviebyId } from "../services/loadAPI";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "@firebase/firestore";

export default function ReserveCard({ reservation }) {
  const [moviedetails, setMoviedetails] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const movieData = await getMoviebyId(reservation.movieId);
        setMoviedetails(movieData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovie();
  }, [reservation.movieId]);

  if (!moviedetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.Card}>
      <h2 className={styles.Title}>{moviedetails.title}</h2>

      <img
        src={"https://image.tmdb.org/t/p/w500" + moviedetails.poster_path}
        alt={moviedetails.title}
      />
      <span className={styles.Info}>Cantidad de boletos: {reservation.boletos}</span>
      <span className={styles.Info}>Nombre: {reservation.name}</span>
      <span className={styles.Info}>Email: {reservation.email}</span>
    </div>
  );
}