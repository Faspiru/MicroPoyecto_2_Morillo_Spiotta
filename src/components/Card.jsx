import styles from "./Card.module.css"
import Button from "./Button"
import { getMoviebyId } from "../services/loadAPI"

export default function Card({ movie }) {

    return (
        <div className={styles.Card}>
            <h2 className={styles.Title}>{movie.title}</h2>
            
            <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt={movie.title} />
            <span className={styles.Info}>gbuhrvbrbbevbriug</span>
            <Button size="small" onClick={() => getMoviebyId(movie.id)}>More Info</Button>
            
        </div>
    )
}