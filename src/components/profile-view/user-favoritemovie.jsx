import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';
import PropTypes  from 'prop-types';
import { Link } from 'react-router-dom';


export const FavoriteMovies = ({ user, FavoriteMovies }) => {
    return (
        <Col className="mb-5">
            <h3 className="title">My Movie Collections</h3>
            <Row>
                {FavoriteMovies.map(movie => (
                    <Col key={movie.id} md={6}>
                        <MovieCard
                           // key={movie.title}
                            isFavorite={user.FavoriteMovies.includes(movie.title)}
                            movie={movie}
                            user={user}
                            token={user.token}
                            setUser={user.setUser}
                        />
                    </Col>
                ))}
            </Row>
        </Col>
    );
};
FavoriteMovies.propTypes = {
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.shape({
          name: PropTypes.string.isRequired,
          bio: PropTypes.string.isRequired,
        }).isRequired,
        image: PropTypes.string.isRequired,
        featured: PropTypes.bool,
      })
    ).isRequired,
    user: PropTypes.shape({
      UserName: PropTypes.string.isRequired,
      FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  };