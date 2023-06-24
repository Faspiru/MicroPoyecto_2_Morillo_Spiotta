import React, { useEffect, useState } from "react";
import { getMoviebyId, getCastbyMovie } from "../services/loadAPI";
import styles from "./MovieSpecs.module.css";
import Button from "../components/Button";
import { useUser } from "../contexts/UserContext";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";

export default function MovieSpecs() {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);
  const { user } = useUser();
  const [boletosVendidos, setBoletosVendidos] = useState(0);
  const [soldOut, setSoldOut] = useState(false);

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

  const id = extractIdFromRoute();

  async function gettingDocs(movieId) {
    const docRef = doc(db, "reserves", movieId);
    const subCollectionRef = collection(docRef, "costumers");
    const docsSnap = await getDocs(subCollectionRef);

    let sumBoletos = 0;

    docsSnap.forEach((doc) => {
      const numBoleto = parseInt(doc.data().boletos);
      sumBoletos += numBoleto;
    });

    setBoletosVendidos(sumBoletos);
  }

  useEffect(() => {
    async function fetchData() {
      await gettingDocs(id);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (boletosVendidos > 20) {
      setSoldOut(true);
    } else {
      setSoldOut(false);
      console.log(soldOut);
    }
  }, [boletosVendidos]);

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
  const isReleased = currentDate > movieDate;

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
        user.likedMovies.push(movie.id);
        //updateLikedMovies([...movie]);
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
          <h4 className={styles.runtime}>
            <strong>Duración: </strong>
            {movie.runtime} minutos
          </h4>
          <p className={styles.overview}>
            <strong>
              Sinopsis: <br />
            </strong>{" "}
            {movie.overview}
          </p>
          <p className={styles.genres}>
            <strong>
              Géneros Relacionados: <br />
            </strong>
            {genres}
          </p>
          <p className={styles.languages}>
            <strong>
              Lenguajes Disponibles: <br />
            </strong>
            {languages}
          </p>
          <p className={styles.actors}>
            <strong>
              Actores Principales <br />
            </strong>{" "}
            {actors} .
          </p>
          <div className={styles.buttonContainer}>
            <Button size="medium" onClick={addingFavorites}>
              Añadir película a favoritos
            </Button>
            <Button size="medium" onClick={removeFavorites}>
              Eliminar película de favoritos
            </Button>
            {isReleased ? (
              soldOut ? (
                <Button size="medium">SOLD OUT</Button>
              ) : (
                <Link to={`/reserve/${movie.id}`}>
                  <Button size="medium">Reservar película</Button>
                </Link>
              )
            ) : (
              <p>Próximamnete / {movie.release_date}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
