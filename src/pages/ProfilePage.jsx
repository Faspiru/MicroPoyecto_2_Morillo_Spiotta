import React, { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";
import { useUser } from "../contexts/UserContext";
import { getMoviebyId } from "../services/loadAPI";
import Card from "../components/Card";
import { loadAPIMovies, loadAPIUpcoming } from "../services/loadAPI";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import ReserveCard from "../components/ReserveCard";

export default function Profile() {
  const { user } = useUser();
  const [movies, setMovies] = useState([]);
  const [movieList, setmovieList] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [reservations, setReservations] = useState([]);

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

  async function getUserProfile(userId) {
    const userQuery = query(
      collection(db, "reserves"),
      where("userId", "==", userId)
    );
    console.log(user.id);
    const results = await getDocs(userQuery);
    //console.log(results.docs);
    const users = results.docs.map((item) => ({
      ...item.data(),
    }));
    setReservations(users);
    console.log(reservations);
  }

  useEffect(() => {
    getUserProfile(user.id);
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
      <div className={styles.TitleContainer}>
        <h1>RESERVACIONES ACTIVAS</h1>
      </div>
      <div>
        {reservations.length > 0 ? (
          <div className={styles.reservations}>
            {reservations.map((reservation) => (
              <ReserveCard
                key={reservation.reserveId}
                reservation={reservation}
              />
            ))}
          </div>
        ) : (
          <p>No hay reservaciones por el momento.</p>
        )}
      </div>
    </>
  );
}
