import React, { useEffect, useState } from "react";
import { getMoviebyId, getCastbyMovie } from "../services/loadAPI";
import styles from "./MovieSpecs.module.css";
import Button from "../components/Button";
import { useUser } from "../contexts/UserContext";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function MovieSpecs() {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    async function fetchData() {
      try {
        const id = extractIdFromRoute();
        const [movieData, movieCast] = await Promise.all([
          getMoviebyId(id),
          getCastbyMovie(id),
        ]);
        setMovie(movieData);
        setCast(movieCast.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  function extractIdFromRoute() {
    const route = window.location.href;
    const routeParts = route.split("/");
    const id = routeParts[routeParts.length - 1];
    return id;
  }

  if (!movie || !cast) {
    return <div>Loading...</div>;
  }

  const genres = movie.genres.map((genre) => genre.name).join(", ");
  const languages = movie.spoken_languages
    .map((language) => language.name)
    .join(", ");
  const actors = cast.map((actor) => actor.name).join(", ");

  const currentDate = new Date();
  const movieDate = new Date(movie.release_date);
  const isReleased = currentDate >= movieDate;

  async function addingFavorites() {
    if (user) {
      const exist = user.likedMovies.includes(movie.id);
      if (exist) {
        alert("Ya la pelicula forma parte de sus favoritos");
      } else {
        const userRef = doc(db, "users", user.id);
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

  async function removeFavorites() {
    if (user) {
      const exist = user.likedMovies.includes(movie.id);
      if (exist) {
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
          likedMovies: arrayRemove(movie.id),
        });
        alert("Pelicula eliminada de sus favoritos");
      } else {
        alert("La pelicula no forma parte de sus favoritos");
      }
      console.log(user);
    } else {
      alert("Debe registrarse para usar esta funcion");
    }
  }

  return (
    <div className={styles.PrincipalContainer}>
      <div className={styles.titlecontainer}>
        <h1>{movie.title}</h1>
        <h3>{movie.tagline}</h3>
      </div>
      <div className={styles.Container}>
        <div className={styles.moviePosterContainer}>
          <img
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            alt={movie.title}
          />
        </div>
        <div className={styles.movieInfoContainer}>
          <h4 className={styles.runtime}>{movie.runtime} minutes</h4>
          <p className={styles.overview}>{movie.overview}</p>
          <p className={styles.genres}>{genres}</p>
          <p className={styles.languages}>{languages}</p>
          <p className={styles.actors}>Actores: {actors} y más.</p>
          <div className={styles.buttonContainer}>
            <Button size="medium" onClick={addingFavorites}>
              Añadir película a favoritos
            </Button>
            <Button size="medium" onClick={removeFavorites}>
              Eliminar película de favoritos
            </Button>
            {isReleased ? (
              <Button size="medium">Ver película</Button>
            ) : (
              <p>Próximamente / {movie.release_date}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function changes() {
  return changes;
}
