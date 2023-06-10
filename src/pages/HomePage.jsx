import React from "react";
import styles from "./HomePage.module.css";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import {loadAPIMovies, loadAPIUpcoming} from "../services/loadAPI";
import Card from "../components/Card";
import Slider from "../components/Slider";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadAPIMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    loadAPIUpcoming().then(upcoming => {setUpcoming(upcoming);
    });
  }, []);
  
  return (
    <>
    <Slider/>
  <div className= {styles.TitleContainer}>
  <h1>PELICULAS EN CARTELERA</h1>
  </div>
  <div className={styles.Movies}>
      {movies.map(movie => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
    <div className= {styles.TitleContainer}>
  <h1>PROXIMOS ESTRENOS</h1>
  </div>
  <div className={styles.Movies}>
      {upcoming.map(up => (
        <Card key={up.id} movie={up} />
      ))}
    </div>
  </>
  )
}
