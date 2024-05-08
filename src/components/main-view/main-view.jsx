import { useState, useEffect } from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view"
import { title } from "process";


export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
        fetch("https://movie-api-7p14.onrender.com/movies")
        .then((response) => response.json())
        .then((data) => {
          const movieFromApi = data.map((movie) => { 
          return {
            id: movie._id,
            title: movie.title,
            description: movie.description,
            genre: movie.genre,
            director: movie.director,
            image: movie.imageurl,
            featured: movie.featured,
          };
          });
        setMovies(movieFromApi);
        });
       },[]);
    
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
    