import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
//import "./movie-card.scss";
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      
        <Card className="h-100">
          <Card.Img variant= "top" src={movie.image}/>
          <Card.Body>
            <Card.Title>{movie.title} </Card.Title>
            <Card.Text>{movie.description} </Card.Text>
            <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
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
    onMovieClick: PropTypes.func.isRequired,
  };
  