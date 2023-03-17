const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "8f781d70654b5a6f2fa69770d1d115a3";

export const MovieDBApi = {
    getPopularMovies : async ({ pageParam = 1 }) : Promise<IMoviesResult> => {
        const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${pageParam}`);
        return await response.json() as Promise<IMoviesResult>;        
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
            headers: new Headers({"Content-Type": "string"}),
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
}
