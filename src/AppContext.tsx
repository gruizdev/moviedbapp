import React, { createContext, useReducer, useContext, ReactElement } from "react";
import { IMovie, IMoviesResult, MovieDBApi } from './api/MovieDBApi';

import { AppReducer, ACTIONS } from "./AppReducer";
import { FetchNextPageOptions, InfiniteQueryObserverResult, useInfiniteQuery, useQuery } from "react-query";
import Cookies from 'js-cookie';

export interface IAppState {
    popularMovies: IMovie[];
    searchQuery: string; 
    searchMoviesResult: IMovie[];
    guestSessionId: string;
    myRatings: {idMovie: number, rating: number}[];
    ratedMovies: IMovie[];
}

export const initialState : IAppState = {
    popularMovies: [],
    searchQuery: "",
    searchMoviesResult: [],
    guestSessionId: "",
    myRatings: [],
    ratedMovies: []    
};

export interface IAppContext extends IAppState {
    fetchPopularMovies: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<IMoviesResult, unknown>>; 
    isFetchingPopular: boolean;
    morePagesPopular: boolean | undefined;
    searchMovies: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<IMoviesResult, unknown>>; 
    isFetchingSearch: boolean;
    morePagesSearch: boolean | undefined;
    updateSearchQuery: (query: string) => void;
    rateMovie: (idMovie: number, rating: number) => void;
    fetchRatedMovies: () => void
}

export const AppContext = createContext<IAppContext>(initialState as IAppContext);

export const AppProvider = ({children} : {children : React.ReactNode}) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    const {
        isFetchingNextPage : isFetchingPopular,
        fetchNextPage : fetchPopularMovies,
        hasNextPage : morePagesPopular,
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

    const {
        isFetchingNextPage : isFetchingSearch,
        fetchNextPage : searchMovies,
        hasNextPage : morePagesSearch,
        } = useInfiniteQuery(
        ["searchMovies", state.searchQuery], 
        async ({ pageParam = 1 }) => {
            const result = await MovieDBApi.searchMovies(state.searchQuery, pageParam);
            dispatch({
                type: ACTIONS.FETCHSEARCHMOVIES,
                payload: {movies: pageParam === 1 ? result.results : state.searchMoviesResult.concat(result.results)}
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

    const updateSearchQuery = (query: string) => {
        dispatch({
            type: ACTIONS.SEARCHMOVIE,
            payload: {query: query}
        });
    }
    

    const rateMovie = async (idMovie: number, rating: number) => {

        const sessionId = await createGuestSession();

        await MovieDBApi.rateMovie(idMovie, sessionId, rating);

        dispatch({
            type: ACTIONS.RATEMOVIE,
            payload: {idMovie: idMovie, rating: rating}
        });               
    }

    const createGuestSession = async () : Promise<string> => {
        const cookieSessionId = Cookies.get("MovieDB_sessionId");
        if(cookieSessionId)
            return Promise.resolve(cookieSessionId);
        else {
            const sessionId = await MovieDBApi.createGuestSession();

            dispatch({
                type: ACTIONS.CREATEGUESTSESSION,
                payload: {sessionId: sessionId}
            });

            Cookies.set("MovieDB_sessionId", sessionId);

            return sessionId;
        }            
    }

    const getRatedMovies = async () => {
        const sessionId = await createGuestSession();

        const result = await MovieDBApi.getRatedMovies(sessionId);
        dispatch({
            type: ACTIONS.FETCHRATEDMOVIES,
            payload: {movies: result.results}
        });
    }

    const value : IAppContext = {
        popularMovies: state.popularMovies,
        searchQuery: state.searchQuery,
        searchMoviesResult: state.searchMoviesResult,
        guestSessionId: state.guestSessionId,
        myRatings: state.myRatings,
        ratedMovies: state.ratedMovies,
        fetchPopularMovies: fetchPopularMovies,
        isFetchingPopular: isFetchingPopular,
        morePagesPopular: morePagesPopular,
        isFetchingSearch: isFetchingSearch,
        searchMovies: searchMovies,
        morePagesSearch: morePagesSearch,
        updateSearchQuery: updateSearchQuery,
        rateMovie: rateMovie,
        fetchRatedMovies: getRatedMovies
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;

}
