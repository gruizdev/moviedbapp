import React, {useContext} from 'react';
import { AppContext } from '../AppContext';
import { MoviesList } from '../components/MoviesList';
import { SearchBox } from '@fluentui/react/lib/SearchBox';


export const SearchMovies = () => {

  const {searchMoviesResult, searchMovies, morePagesSearch, isFetchingSearch, updateSearchQuery } = useContext(AppContext);

  return (
    <div className='App'>
        <SearchBox
            placeholder='Search'
            onSearch={query => { updateSearchQuery(query) }}
            styles={{root: {width: "60%", marginLeft:"auto", marginRight:"auto"}}}             
        />
        <MoviesList movies={searchMoviesResult} />
        {
            morePagesSearch && 
                <button onClick={() => searchMovies()} disabled={isFetchingSearch}>
                {isFetchingSearch ? "Loading more..." : "Load More"}
                </button>
        }
    </div>
  );

}