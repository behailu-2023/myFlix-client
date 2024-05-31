
import { useState, useEffect } from "react";
import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
import Form from "react-bootstrap/Form";
import "./main-view.scss" 
//import { title } from "process";



export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.bio.toLowerCase().includes(searchTerm.toLowerCase())
    );
    useEffect(() => {
        if (!token) {
            return;
        }
        fetch("https://movie-api-7p14.onrender.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(movies => {
                //setMovies(movies);
                const movieFromApi = movies.map(movies => ({
                    
                        id: movies._id,
                        title: movies.Title,
                        description: movies.Description,
                        genre: { name: movies.Genre.Name,
                            description: movies. Genre.Description
                        },
                        director: { name: movies.Director.Name,
                            bio: movies. Director.Bio,
                            birthdate: movies. Director.Birthdate 
                        },
                        image: movies.imageurl,
                        featured: movies.featured,
            
                }));
                localStorage.setItem("movies", JSON.stringify(movieFromApi));
                setMovies(movieFromApi);
            })
            .catch(error => console.error("Error fetching movies:", error));
            

    }, [token]);


    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                //movies={movies}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/users"
                        element={
                            
                                user ?  <Navigate to="/" /> : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            user ? ( 
                            <Row className="justify-content-center">
                                <Col sm={12} md={9} lg={7} >
                                    
                                        <ProfileView
                                            token={token}
                                            user={user}
                                            movies={movies}
                                            onSubmit={ setUser}
                                        />
                                     
                                </Col>
                            </Row>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                                user ? <Navigate to="/" /> : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                        }} />
                                    </Col>
                                )
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            
                                !user ? <Navigate to="/login" replace /> :
                                movies.length === 0 ? 
                                    <Col>The list is empty!</Col> :
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col> 
                        }
                    />
                    
                    <Route
                        path="/"
                        element={
                            !user ? <Navigate to="/login" replace /> :
                                movies.length === 0 ? <Col>The list is empty!</Col> : (
                                    <>
                                        <Form className="mb-4">
                                            <Form.Control
                                                type="text"
                                                placeholder="Search movies"
                                                value={searchTerm}
                                                onChange={handleSearch}
                                            />
                                        </Form>
                                        {filteredMovies.map(movie => (
                                            <Col className="mb-4" key={movie.id} md={3}>
                                                <MovieCard
                                                    movie={movie}
                                                    user={user}
                                                    token={token}
                                                    setUser={setUser}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )
                        }
                    />
                    
                </Routes>
            </Row>
        </BrowserRouter>
    );
};




