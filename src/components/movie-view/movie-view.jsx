import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";



export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const navigate =useNavigate();
  const handleClick = () => {
    navigate(-1); 
  };
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }
  return (
    
      <div className="movie-view">
        <img className="w-100" src={movie.image} alt={movie.title} />
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      
      <div>
        <span>Genre Name: </span>
        <span>{movie.genre.name}</span>
      </div>
      
      <div>
        <span>Genre Description: </span>
        <span>{movie.genre.description}</span>
      </div>
      <div>
        <span>Director Name: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Director Bio: </span>
        <span>{movie.director.bio}</span>
      </div>
      <button variant="primary" onClick={handleClick}>Back</button>
    </div>
  );
};
