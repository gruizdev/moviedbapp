import styles from "./Movie.module.css";
import { IMovie } from "../api/MovieDBApi";

const imageSize = 300;

export const Movie = ({ movie }: { movie: IMovie }) => {
  return (
    <li key={movie.id} className={styles.movie}>
        <img            
            className={styles.movieImage}
            src={`https://image.tmdb.org/t/p/w${imageSize}${movie.poster_path}`}
            alt={movie.title}
            width={230}
            height={345}
        />
        <div>{movie.title}</div>
    </li>
  );
}