import React from 'react';
import styles from "./MoviesList.module.css";

import { useInfiniteQuery } from "react-query";
import { MovieDBApi } from '../api/MovieDBApi';
import { Movie } from './Movie';



export const MoviesList = () => {
    const {
        data,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        error,
      } = useInfiniteQuery(["movies"], MovieDBApi.getPopularMovies , {
        getNextPageParam: (lastPage) => {        
          if (lastPage.page == lastPage.total_pages) return undefined;
          return (lastPage.page + 1);
        },
        refetchOnWindowFocus: false
        
      });


    return (
        <div className="App">          
          {data?.pages.map((page) => (
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
            )}
        </div>
      );
}
