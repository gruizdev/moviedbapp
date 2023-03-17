import { IMovie } from './api/MovieDBApi';
import { IAppState } from './AppContext';

export interface IAppAction {
    type: string;
    payload: IFetchMoviesPayload | ICreateGuestSessionPayload | ISearchPayload;
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

export const AppReducer = (state: IAppState, action: IAppAction) : IAppState => {
    switch(action.type) {
        case ACTIONS.FETCHPOPULARMOVIES:
            return {...state, popularMovies: (action.payload as IFetchMoviesPayload).movies};
        case ACTIONS.FETCHRATEDMOVIES:
            return {...state, ratedMovies: (action.payload as IFetchMoviesPayload).movies};
        case ACTIONS.CREATEGUESTSESSION:
            return {...state, guestSessionId: (action.payload as ICreateGuestSessionPayload).sessionId};
        case ACTIONS.SEARCHMOVIE:
            return {...state, searchQuery: (action.payload as ISearchPayload).query}

        default:
            return state;            
    }
}

export const ACTIONS = {
    FETCHPOPULARMOVIES: 'FETCHPOPULARMOVIES',
    FETCHRATEDMOVIES: 'FETCHRATEDMOVIES',
    CREATEGUESTSESSION: 'CREATEGUESTSESSION',
    SEARCHMOVIE: 'SEARCHMOVIE'
}