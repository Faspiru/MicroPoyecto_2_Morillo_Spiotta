import React, { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";
import { useUser } from "../contexts/UserContext";
import { getMoviebyId } from "../services/loadAPI";
import Card from "../components/Card";
import { loadAPIMovies, loadAPIUpcoming } from "../services/loadAPI";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function Profile() {
  const { user } = useUser();
  const [movies, setMovies] = useState([]);
  const [movieList, setmovieList] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  //Este codigo de abajo fue un intento de guardar todas las reservas de un usuario en un array para mostrarlas en su perfil, pero no nos funciono y nos quedamos sin tiempo para seguir intentandolo :(.

  /* async function getDocs(id, user) {
    const collectionRef = collection(db, "reserves", `${id}`, "costumers");
    const costumberQuery = query(collectionRef, where("UserId", "==", user.id));
    const querySnapshot = await getDocs(costumberQuery);

    querySnapshot.forEach((doc) => {
      return doc.data();
    });
  }

  async function getAllDocuments(movieList, user) {
    const documentsArray = [];

    movieList.map((movie) => {
      const dataJson = getDocs(movie.id, user);
      documentsArray.push(dataJson);
    });

    console.log(documentsArray);
  }

  getAllDocuments(movieList, user); */

  useEffect(() => {}, []); //En este useEffect traerias el array las pelis reservadas por el usuario


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
        <h1>Reservaciones Activas</h1>
      </div>
      <div className={styles.reservations}>
      {reservations.length > 0 ? (
          <div>
            {reservations.map((reservation) => (
              <ReserveCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        ) : (
          <p>No hay reservaciones por el momento.</p>
        )}

      </div>
    </>
  );
}
