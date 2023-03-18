import { IMovie } from './api/MovieDBApi';
import { IAppState } from './AppContext';

export interface IAppAction {
    type: string;
    payload: IFetchMoviesPayload | ICreateGuestSessionPayload | ISearchPayload | IRateMoviePayload;
}

export interface IFetchMoviesPayload {
    movies: IMovie[];
}

export interface ICreateGuestSessionPayload {
    sessionId: string;
}

export interface ISearchPayload {
    query: string;
}

export interface IRateMoviePayload {
    idMovie: number;
    rating: number;
}

export const AppReducer = (state: IAppState, action: IAppAction) : IAppState => {
    switch(action.type) {
        case ACTIONS.FETCHPOPULARMOVIES:
            return {...state, popularMovies: (action.payload as IFetchMoviesPayload).movies};
        case ACTIONS.FETCHRATEDMOVIES:
            return {...state, ratedMovies: (action.payload as IFetchMoviesPayload).movies};
        case ACTIONS.CREATEGUESTSESSION:
            return {...state, guestSessionId: (action.payload as ICreateGuestSessionPayload).sessionId};
        case ACTIONS.SEARCHMOVIE:
            return {...state, searchQuery: (action.payload as ISearchPayload).query};
        case ACTIONS.FETCHSEARCHMOVIES:
            return {...state, searchMoviesResult: (action.payload as IFetchMoviesPayload).movies};
        case ACTIONS.RATEMOVIE:
            const payload = action.payload as IRateMoviePayload;
            const ratings = [
                ...state.myRatings.filter(x => x.idMovie !== payload.idMovie),
                {idMovie: payload.idMovie, rating: payload.rating}
            ];
            return {...state, myRatings: ratings};
        default:
            return state;            
    }
}

export const ACTIONS = {
    FETCHPOPULARMOVIES: 'FETCHPOPULARMOVIES',
    FETCHRATEDMOVIES: 'FETCHRATEDMOVIES',
    CREATEGUESTSESSION: 'CREATEGUESTSESSION',
    SEARCHMOVIE: 'SEARCHMOVIE',
    FETCHSEARCHMOVIES: 'FETCHSEARCHMOVIES',
    RATEMOVIE: 'RATEMOVIE'
}