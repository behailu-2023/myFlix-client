import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import  signupview  from "../signup-view/signup-view";
import { title } from "process";



export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);

    
    useEffect(() => {
        if (!token) {
            return;
        }
        fetch("https://movie-api-7p14.onrender.com/movies", {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then((response) => response.json())
            .then((movies) => { 
                setMovies(movies);
                const movieFromApi = data.map((movies) => {
                    return {
                        id: movies._id,
                        title: movies.Title,
                        description: movies.Description,
                        genre: movies.genre,
                        director: movies.Director,
                        image: movies.imageurl,
                        featured: movies.featured,
                    };
                });
                setMovies(movieFromApi);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });

    }, [token]);
    if (!user) {
        return ( 
          
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
            
          
        );
      }

    

    if (selectedMovie) {
        return (
            <>
                <button
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                >
                    Logout
                </button>

                <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
            </>
        );
    }


    if (movies.length === 0) {
        return ( 
            <> 
            <button
            onClick={() => { 
            setUser(null);
            setToken(null);
            localStorage.clear();
        }}
        > 
        Logout
        </button>
            <div>The list is empty</div>;
            </>
    );
    }

    return (
        <div>
            <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
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
