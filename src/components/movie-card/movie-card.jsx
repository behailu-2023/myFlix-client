import React from "react";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, user, token, setUser }) => {
  const [favorite, setFavorite] = useState(user.FavoriteMovies.includes(movie.title));
  //const [favorite, setFavorite] = useState(user && user.FavoriteMovies && user.FavoriteMovies.includes(movie.title));


  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  //const [user, setUser] = useState(storedUser ? storedUser : null);
  //const [token, setToken] = useState(storedToken ? storedToken : null);

  const [addTitle, setAddTitle] = useState("");
  const [delTitle, setDelTitle] = useState("");

  const [favoriteMovies, setfavoriteMovies] = useState(false);


  //useEffect(() => {
    //setfavoriteMovies(user.favoritemovie && user.favoritemovie.includes(movie.title));

  //}, [user, movie.title]);
  
  const addToFavorites = () => {
    fetch(
      `https://movie-api-7p14.onrender.com/users/${user.Username}/movies/${movie.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to add favorite movie. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(updatedUser => {
        
          alert("A new movie is added to your collection!");
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          setFavorite(true);
      })
      .catch(error =>  alert(error)); 
  };

  const removeFromFavorites = () => {
    fetch(
      `https://movie-api-7p14.onrender.com/users/${user.Username}/movies/${movie.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to remove favorite movie.");
        } 
        return response.json();
       
      })
      .then(updatedUser => {
          alert("You deleted a movie from your collection!");
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          setFavorite(false);
        
      })
      .catch(error => alert(error));
      
  };
  //if (addTitle)addToFavorites();}if (delTitle) {handleRemoveFromFavorites();}}, [addTitle, delTitle, token]);


//const handleAddToFavorites = () => {setAddTitle(movie.title);};
//const handleRemoveFromFavorites = () => {setDelTitle(movie.title);}; 


return (
  <Card className="h-100">
  <Card.Img variant="top" src={movie.image} />
  <Card.Body>
    <Card.Title>{movie.title}</Card.Title>
    <Card.Text>{movie.genre.name}</Card.Text>
    <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
      <Button variant="link">Open</Button>
    </Link>
    {favorite ? (
      <Button variant="danger" onClick={removeFromFavorites}>Remove from Favorites</Button>
    ) : (
      <Button variant="success" onClick={addToFavorites}>Add to Favorites</Button>
    )}
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
      description: PropTypes.string.isRequired,
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired
    }).isRequired,
    image: PropTypes.string.isRequired,
    featured: PropTypes.bool,
  }).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
};
