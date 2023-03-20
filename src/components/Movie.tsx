import React from 'react';
import styles from "./Movie.module.css";
import { IMovie } from "../api/MovieDBApi";
import { MovieDetails } from './MovieDetails';
import { AppContext } from '../AppContext';
import dayjs from 'dayjs';

const imageSize = 300;

export const Movie = ({ movie }: { movie: IMovie }) => {

  const { myRatings } = React.useContext(AppContext);
  const myRating = myRatings.find(x => x.idMovie === movie.id)?.rating;

  const [detailsOpen, setDetailsOpen] = React.useState(false);
  return (
    <li key={movie.id} className={styles.movie} onClick={()=>setDetailsOpen(true)}>
        <img            
            className={styles.movieImage}
            src={movie.poster_path ? 
              `https://image.tmdb.org/t/p/w${imageSize}${movie.poster_path}` :
              'https://placeholder.pics/svg/230x345/DEDEDE/555555/No%20image'
            }
            alt={movie.title}
            width={230}
            height={345}
        />
        <div>{movie.title}</div>
        <div className={styles.subTitle}>{dayjs(movie.release_date).format('DD/MM/YYYY')}</div>
        {
          detailsOpen ? <MovieDetails movie={movie} closeModal={()=>setDetailsOpen(false)} /> : null
        }
        {/* { myRating || movie.rating ? <div className={styles.rating}><h1>{myRating || movie.rating}</h1></div> : null } */}
    </li>
    
  );
}