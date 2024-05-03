import { useState } from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view"
import { title } from "process";


export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Focus",
            image: "focus.png",

            director: "Glenn Ficarra & John Requa"
        },

        {
            id: 2,
            title: "Zodiac",
            image: "zodiac.png",
            director: "David Fincher"
        },
        {
            id: 3,
            title: "Now You See Me",
            image: "nowyouseeme.png",
            director: "Louis Leterrier"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);
    
    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty</div>;
    }

    return (
        <div>
        {movies.map((movie) => ( 
            <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
            }}
            />
        ))}
        </div>
    );
    
    
};
    