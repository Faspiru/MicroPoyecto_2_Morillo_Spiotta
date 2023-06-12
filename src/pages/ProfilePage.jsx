import React, { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";
import { useUser } from "../contexts/UserContext";
import { getMoviebyId } from "../services/loadAPI";
import Card from "../components/Card";
import { loadAPIMovies,loadAPIUpcoming } from "../services/loadAPI";

export default function Profile() {
  const { user } = useUser();
  const [movies, setMovies] = useState([]);
  const [movieList, setmovieList] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadAPIMovies().then((movieList) => {
      setmovieList(movieList);
    });
  }, []);

  useEffect(() => {
    loadAPIUpcoming().then((upcoming) => {
      setUpcoming(upcoming);
    });
  }, []);


  useEffect(() => {
    async function fetchMovies() {
      if (user) {
        const moviePromises = user.likedMovies.map((likedMovie) =>
          getMoviebyId(likedMovie)
        );

        const movieData = await Promise.all(moviePromises);
        setMovies(movieData);
      }
    }
    console.log(user.likedMovies);

    fetchMovies();
  }, []);

  return (
    <>
      <div className={styles.TitleContainer}>
        <h1>PELICULAS FAVORITAS</h1>
      </div>
      <div className={styles.Movies}>
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
