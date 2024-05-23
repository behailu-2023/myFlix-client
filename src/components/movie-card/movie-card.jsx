import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token, setUser}) => {


  const [favoriteMovies, setfavoriteMovies] = useState(false);
  

  useEffect(() => {
    setfavoriteMovies(
      user.favoritemovie && user.favoritemovie.includes(movie.id)
    );
    
  }, [user, movie.id]);

  const addFavMovie = () => {
    fetch(
      `https://movie-api-7p14.onrender.com/users/${user.userName}/movies/${movie.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to add favorite movie. Status: ${response.status}`
          );
        }
        return response.json();
      })
      .then((user) => {
        if (user) {
          alert("A new movie is added to your collection!");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setfavoriteMovies(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const delFavMovie = () => {
    fetch(
      `https://movie-api-7p14.onrender.com/users/${user.userName}/movies/${movie.id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("We couldn't remove it");
        }
      })
      .then((user) => {
        if (user) {
          alert("You deleted a movie from your collection!");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setfavoriteMovies(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

    return (
      
        <Card className="h-100">
          <Card.Img variant= "top" src={movie.image}/>
          <Card.Body>
            <Card.Title>{movie.title} </Card.Title>
            <Card.Text>{movie.description} </Card.Text>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="link">Open</Button>
            </Link>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            {!favoriteMovies ? (
              <Button onClick={addFavMovie}>Add Favorite</Button>
            ) : (
              <Button onClick={delFavMovie}>Remove</Button>
            )}
          </Link>
          </Card.Body>
        </Card>  
    );
  };

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description:PropTypes.string.isRequired,
      }),
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired
      }),
      image: PropTypes.string.isRequired,
      featured: PropTypes.bool,
    }).isRequired,
    user: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      favoriteMovies: PropTypes.array.isRequired,
    }).isRequired,
    token: PropTypes.string.isRequired,
    setUser: PropTypes.func.isRequired,
  };
  