import React, {useContext} from 'react';
import { AppContext } from '../AppContext';
import { MoviesList } from '../components/MoviesList';


export const PopularMovies = () => {

  const {popularMovies, fetchPopularMovies, morePagesPopular, isFetchingPopular } = useContext(AppContext);

  return (
    <div className='App'>
        <MoviesList movies={popularMovies} />
        {
            morePagesPopular && 
                <button onClick={() => fetchPopularMovies()} disabled={isFetchingPopular}>
                {isFetchingPopular ? "Loading more..." : "Load More"}
                </button>
        }
    </div>
  );

}