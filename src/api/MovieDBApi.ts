const baseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.REACT_APP_API_KEY;

export const MovieDBApi = {
    getPopularMovies : async ({ pageParam = 1 }) : Promise<IMoviesResult> => {
        const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${pageParam}`);
        return await response.json() as Promise<IMoviesResult>;        
    },
    searchMovies : async (query:string, page: number) : Promise<IMoviesResult> => {
        if(query){
            const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&page=${page}`);
            return await response.json() as Promise<IMoviesResult>;
        }
        return Promise.resolve({page: 0, results: [], total_pages: 0, total_results: 0});
    },
    createGuestSession : async () : Promise<string> => {
        const response = await fetch(`${baseUrl}/authentication/guest_session/new?api_key=${apiKey}`);
        const result = await response.json() as {success: boolean, guest_session_id: string};
        return result.success ? result.guest_session_id : "";
    },
    rateMovie : async (movieId:number, sessionId:string, rate: number) : Promise<string> => {
        const response = await fetch(`${baseUrl}/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`, 
        {
            method: "POST",
            headers: new Headers({"Content-Type": "application/json;charset=utf-8"}),
            body: JSON.stringify({
                value: rate
            }),
        });
        const result = await response.json() as {status_code : string, status_message: string};
        return result.status_message;
    },
    getRatedMovies :async (sessionId:string) : Promise<IMoviesResult> => {
        const response = await fetch(`${baseUrl}/guest_session/${sessionId}/rated/movies?api_key=${apiKey}`);
        return await response.json() as Promise<IMoviesResult>;        
    },
    getGenres : async () : Promise<IGenre[]> => {
        const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
        const result = await response.json() as {genres: IGenre[]};
        return result.genres
    }

};

export interface IMoviesResult {
    page: number;
    results: IMovie[];
    total_results: number;
    total_pages: number;
}

export interface IMovie {
    poster_path?: string;
    adult?: boolean;
    overview?: string;
    release_date?: string;
    genre_ids?: number[];
    id?: number;
    original_title?: string;
    original_language?: string;
    title?: string;
    backdrop_path?: string | null;
    popularity?: number;
    vote_count?: number;
    video?: boolean;
    vote_average?: number;
    rating?: number;
}

export interface IGenre {
    id: number;
    name: string;
}
