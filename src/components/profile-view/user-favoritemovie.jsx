import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MovieCard } from '../movie-card/movie-card'
import { Link } from 'react-router-dom'


export const FavoriteMovies = ({ user, favoriteMovies }) => {
    return (
        <Col className="mb-5">
            <h3 className="title">My Movie Collections</h3>
            <Row>
                {favoriteMovies.map((movie) => (
                    <Col key={movie.title} md={6}>
                        <Link to={`/movies/${movie.title}`} />
                        <MovieCard
                            key={movie.title}
                            isFavorite={user.FavoriteMovies.includes(movie.title)}
                            movie={movie}
                        />
                    </Col>
                ))}
            </Row>
        </Col>
    );
}
FavoriteMovies.propTypes = {
    favoriteMovies: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
  };