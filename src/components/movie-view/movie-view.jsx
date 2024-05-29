import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const navigate =useNavigate();
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }
  return (
    <div>
      <div>
        <img className="w-100" src={movie.image} />
      </div>
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
        <span>{movie.genreName}</span>
      </div>
      <div>
        <span>Genre Description: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Director Name: </span>
        <span>{movie.director.Name}</span>
      </div>
      <div>
        <span>Director Bio: </span>
        <span>{movie.director.Bio}</span>
      </div>
      <button className="back-button">Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
      }).isRequired,
      image: PropTypes.string.isRequired,
      featured: PropTypes.bool,
    })
  ).isRequired,
};