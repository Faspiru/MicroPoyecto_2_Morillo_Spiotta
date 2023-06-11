import styles from "./Card.module.css";
import Button from "./Button";
import { getMoviebyId } from "../services/loadAPI";
import { useEffect, useState } from "react";

export default function Card({ movie }) {
  const [moviedetails, setMoviedetails] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const movieData = await getMoviebyId(movie.id);
        setMoviedetails(movieData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovie();
  }, []);

  if (!moviedetails) {
    return <div>Loading...</div>;
  }

  const genres = moviedetails.genres.map((genre) => genre.name).join(", ");
  const languages = moviedetails.spoken_languages
    .map((language) => language.name)
    .join(", ");

  return (
    <div className={styles.Card}>
      <h2 className={styles.Title}>{movie.title}</h2>

      <img
        src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
        alt={movie.title}
      />
      <span className={styles.Info}>Géneros: {genres}</span>
      <span className={styles.Info}>Lenguajes: {languages}</span>
      <Button
        href={`movieSpec/${movie.id}`}
        size="small"
        onClick={() => getMoviebyId(movie.id)}
      >
        More Info
      </Button>
    </div>
  );
}
