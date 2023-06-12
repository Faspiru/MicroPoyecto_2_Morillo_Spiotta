import React from "react";
import styles from "./HomePage.module.css";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { loadAPIMovies, loadAPIUpcoming } from "../services/loadAPI";
import Card from "../components/Card";
import Slider from "../components/Slider";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadAPIMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);

  useEffect(() => {
    loadAPIUpcoming().then((upcoming) => {
      setUpcoming(upcoming);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Slider />
      <div className={styles.SearchContainer}>
        <div className={[styles.formGroup, styles.field].join(" ")}>
          <input
            type="text"
            className={styles.formField}
            placeholder="Busca una pelicula por su titulo"
            value={searchQuery}
            onChange={handleSearch}
          />
          <label className={styles.formLabel}>Buscar</label>
        </div>
      </div>
      <div className={styles.TitleContainer}>
        <h1>PELICULAS EN CARTELERA</h1>
      </div>
      <div className={styles.Movies}>
        {movies
          .filter((movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
      </div>
      <div className={styles.TitleContainer}>
        <h1>PROXIMOS ESTRENOS</h1>
      </div>
      <div className={styles.Movies}>
        {upcoming
          .filter((up) =>
            up.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((up) => (
            <Card key={up.id} movie={up} />
          ))}
      </div>
    </>
  );
}
