import {useState, useEffect} from "react";
import PropTypes from "prop-types";
export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.image} />
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
          <span>{genre.name}</span>
        </div>
        <div>
          <span>Genre Description: </span>
          <span>{genre.description}</span>
        </div>
        <div>
          <span>Director Name: </span>
          <span>{director.name}</span>
        </div>
        <div>
          <span>Director Bio: </span>
          <span>{director.bio}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };
  MovieView.propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      featured: PropTypes.bool,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
  };