import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';
import PropTypes  from 'prop-types';
import { Link } from 'react-router-dom';


export const FavoriteMovies = ({ user, favoriteMovies }) => {
    return (
        <Col className="mb-5">
            <h3 className="title">My Movie Collections</h3>
            <Row>
                {favoriteMovies.map(movie => (
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
