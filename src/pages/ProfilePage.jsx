import React, { useState } from "react";
import styles from "./ProfilePage.module.css";
import { useUser } from "../contexts/UserContext";
import { getMoviebyId } from "../services/loadAPI";
import Card from "../components/Card";

export default function () {
  const { user } = useUser();
  const [movies, setMovies] = useState([]);

  async function operando(likedMovie) {
    const movie = await getMoviebyId(likedMovie);
    console.log(movie);
    movies.push(movie);
  }

  if (user) {
    user.likedMovies.map((likedMovie) => operando(likedMovie));
    console.log(movies);
  }

  return (
    <div className={styles.TitleContainer}>
      <h1>PELICULAS FAVORITAS</h1>
      <div className={styles.Movies}>
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
