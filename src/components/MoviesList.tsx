import React, {useContext} from 'react';
import styles from "./MoviesList.module.css";

import { useInfiniteQuery } from "react-query";
import { MovieDBApi } from '../api/MovieDBApi';
import { Movie } from './Movie';
import { AppContext } from '../AppContext';



export const MoviesList = () => {

  const {popularMovies, fetchPopularMovies, morePagesPopular, isFetchingPopular } = useContext(AppContext);
  
    // const {
    //     data,
    //     isLoading,
    //     isFetchingNextPage,
    //     fetchNextPage,
    //     hasNextPage,
    //     error,
    //   } = useInfiniteQuery(["movies"], MovieDBApi.getPopularMovies , {
    //     getNextPageParam: (lastPage) => {        
    //       if (lastPage.page === lastPage.total_pages) return undefined;
    //       return (lastPage.page + 1);
    //     },
    //     refetchOnWindowFocus: false
        
    //   });


    return (
        <div className="App">
          <ul className={styles.moviesList}>
          {
            popularMovies?.map(item => <Movie key={item.id} movie={item} />)
          }
          </ul>
          {
            morePagesPopular && 
              <button onClick={() => fetchPopularMovies()} disabled={isFetchingPopular}>
              {isFetchingPopular ? "Loading more..." : "Load More"}
              </button>
          }
          {/* {data?.pages.map((page) => (
              <ul className={styles.moviesList}>
                <React.Fragment key={page.page}>
                  {page.results.map((item) => <Movie movie={item} />)}
                </React.Fragment>
              </ul>
            ))}
            {hasNextPage && (
                <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage ? "Loading more..." : "Load More"}
                </button>
            )} */}
        </div>
      );
}
