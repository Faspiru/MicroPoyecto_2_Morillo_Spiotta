import React, { useEffect, useState } from "react";
import { getMoviebyId } from "../services/loadAPI";
import styles from "./MovieSpecs.module.css";
import Button from "../components/Button";
import { useUser } from "../contexts/UserContext";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function MovieSpecs() {
  const [movie, setMovie] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const id = extractIdFromRoute();
        const movieData = await getMoviebyId(id);
        setMovie(movieData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovie();
  }, []);

  function extractIdFromRoute() {
    const route = window.location.href;
    const routeParts = route.split("/");
    const id = routeParts[routeParts.length - 1];
    return id;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  const genres = movie.genres.map((genre) => genre.name).join(", ");
  const languages = movie.spoken_languages
    .map((language) => language.name)
    .join(", ");

  async function addingFavorites() {
    if (user) {
      const exist = user.likedMovies.includes(movie.id);
      if (exist) {
        alert("Ya la pelicula forma parte de sus favoritos");
      } else {
        const userRef = doc(db, "users");
        await updateDoc(userRef, {
          likedMovies: arrayUnion(movie.id),
        });
        alert("Pelicula agregada a sus favoritos");
      }
      console.log(user);
    } else {
      alert("Debe registrarse para usar esta funcion");
    }
  }

  return (
    <div className={styles.PrincipalContainer}>
      <h1>{movie.title}</h1>
      <h3>{movie.tagline}</h3>
      <div className={styles.Container}>
        <img
          src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          alt={movie.title}
        />
        <div className={styles.buttonContainer}>
          <Button size="small" onClick={addingFavorites}>
            Add movie to favorites
          </Button>
        </div>
        <div>
          <h4 className={styles.runtime}>{movie.runtime} minutes</h4>
          <p className={styles.overview}>{movie.overview}</p>
          <p className={styles.genres}>{genres}</p>
          <p className={styles.languages}>{languages}</p>
        </div>
      </div>
    </div>
  );
}
