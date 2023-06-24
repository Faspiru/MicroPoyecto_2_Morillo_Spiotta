import React, { useEffect, useState } from "react";
import styles from "./ReserveCard.module.css";
import { getMoviebyId } from "../services/loadAPI";
import Button from "./Button";

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
        className={styles.img}
        src={"https://image.tmdb.org/t/p/w500" + moviedetails.poster_path}
        alt={moviedetails.title}
      />
      <span className={styles.Info}>
        Cantidad de boletos: {reservation.boletos}
      </span>
      <span className={styles.Info}>Nombre: {reservation.name}</span>
      <span className={styles.Info}>Email: {reservation.email}</span>
      <span className={styles.Info}>Cedula: {reservation.cedula}</span>
      <span className={styles.Info}>
        Precio Total: {reservation.precioTotal}
      </span>
    </div>
  );
}
