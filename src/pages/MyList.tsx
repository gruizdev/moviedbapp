import React, {useContext} from 'react';
import { AppContext } from '../AppContext';
import { MoviesList } from '../components/MoviesList';

export const MyList = () => {

  const {ratedMovies } = useContext(AppContext);


    return (
        <div className='App'>
            {
                ratedMovies.length > 0 ?
                    <MoviesList movies={[]} /> :
                    <h2>No movies have been rated yet</h2>
            }
            
        </div>
      );
}