import React, {useContext} from 'react';
import { AppContext } from '../AppContext';
import { MoviesList } from '../components/MoviesList';

export const MyList = () => {

  const {ratedMovies, fetchRatedMovies } = useContext(AppContext);

  React.useEffect(() => {
    fetchRatedMovies();
  }, []);

  return (
      <div className='App'>
          {
              ratedMovies.length > 0 ?
                  <MoviesList movies={ratedMovies} /> :
                  <h2>No movies have been rated yet</h2>
          }
          
      </div>
    );
}