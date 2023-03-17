import React, { createContext, useReducer, useContext, ReactElement } from "react";
import { IMovie, IMoviesResult, MovieDBApi } from './api/MovieDBApi';

import { AppReducer, ACTIONS } from "./AppReducer";
import { FetchNextPageOptions, InfiniteQueryObserverResult, useInfiniteQuery } from "react-query";

export interface IAppState {
    popularMovies: IMovie[];
    searchQuery: string; 
    guestSessionId: string;
    ratedMovies: IMovie[];
    fetchPopularMovies?: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<IMoviesResult, unknown>>
}

export const initialState : IAppState = {
    popularMovies: [],
    searchQuery: "",
    guestSessionId: "",
    ratedMovies: []    
};

export interface IAppContext extends IAppState {
    fetchPopularMovies: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<IMoviesResult, unknown>>; 
    isFetchingPopular: boolean;
    morePagesPopular: boolean | undefined;
}

export const AppContext = createContext<IAppContext>(initialState as IAppContext);

export const AppProvider = ({children} : {children : ReactElement}) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    const {
        data,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        error,
      } = useInfiniteQuery(
        ["popularMovies"], 
        async ({ pageParam = 1 }) => {
            const result = await MovieDBApi.getPopularMovies({pageParam: pageParam});
            dispatch({
                type: ACTIONS.FETCHPOPULARMOVIES,
                payload: {movies: state.popularMovies.concat(result.results)}
            });
            return result;
        }, 
        {
            getNextPageParam: (lastPage) => {        
            if (lastPage.page === lastPage.total_pages) return undefined;
            return (lastPage.page + 1);
            },
            refetchOnWindowFocus: false        
        });

    const value : IAppContext = {
        popularMovies: state.popularMovies,
        searchQuery: state.searchQuery,
        guestSessionId: state.guestSessionId,
        ratedMovies: state.ratedMovies,
        fetchPopularMovies: fetchNextPage,
        isFetchingPopular: isFetchingNextPage,
        morePagesPopular: hasNextPage

    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;

}
