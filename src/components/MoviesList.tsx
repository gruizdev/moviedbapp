import styles from "./MoviesList.module.css";

import { Movie } from './Movie';
import { IMovie } from '../api/MovieDBApi';


export const MoviesList = ({movies}:{movies:IMovie[]}) => {
    return (
        <ul className={styles.moviesList}>
          {
            movies?.map(item => <Movie key={item.id} movie={item} />)
          }
        </ul>          
    );
}
