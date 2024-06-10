import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";
import { Card, Image } from "react-bootstrap";
import { FavoriteMovies } from "./user-favoritemovie";
import { UpdateUser } from "./user-infoupdate";
import { UserInfo } from "./user-info";

export const ProfileView = ({ token, user, movies, onSubmit }) => {
    //const storedUser = JSON.parse(localStorage.getItem("user"));

    const [username, setUsername] = useState(user.Username);
    const [email, setEmail] = useState(user.Email);
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState(user.Birthdate);
    //const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.title));

    const [formData, setFormData] = useState({
        Username: user.Username,
        Email: user.Email,
        Password: "",
        Birthdate: user.Birthdate
    });

    useEffect(() => {
        setFormData({
            Username: user.Username,
            Email: user.Email,
            Password: "",
            Birthdate: user.Birthdate
        });
    }, [user]);

    //formData.Birthdate = birthdate ? new Date(birthdate).toISO8601 : null;

    const handleSubmit = (event) => {
        event.preventDefault(event);

        fetch(`https://movie-api-7p14.onrender.com/users/${user.Username}`, {

            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update profile.");
                    // alert("Update successful");
                    // window.location.reload();
                    // return response.json()
                }
                return response.json();
                //alert("Update failed");
            })
            .then((updatedUser) => {
                localStorage.setItem("user", JSON.stringify(updatedUser));
                onSubmit(updatedUser);
                alert("Update successful");
            })
            .catch((error) => {
                console.error(error);
                alert("Update failed");
            });
    };

    const handleUpdate = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDeleteAccount = (id) => {
        fetch(`https://movie-api-7p14.onrender.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("The account has been successfully deleted.");
                localStorage.clear();
                window.location.reload();
            } else {
                alert("Something went wrong.");
            }
        });
    };
    const favoriteMovies = movies.filter(movie =>
        user.FavoriteMovies.includes(movie.id)
    );
    return (
        <>
            <Row>
                <Card className="mb-5">
                    <Card.Body>
                        <Card.Title>My Account </Card.Title>
                        <Card.Text>
                            {
                                user && (<UserInfo name={user.Username} email={user.Email} />)
                            }
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="mb-5">
                    <Card.Body>
                        <UpdateUser
                            formData={formData}
                            handleUpdate={handleUpdate}
                            handleSubmit={handleSubmit}
                        />
                    </Card.Body>
                </Card>
            </Row>
            <Button onClick={ handleDeleteAccount}
                className="button-delete mb-5"
                type="submit" variant="outline-secondary"
            >
                Delete account
            </Button>
            <Row>
                <Col className="mb-5" xs={12} md={12}>
                    {
                        favoriteMovies && (<FavoriteMovies user={user} favoriteMovies={favoriteMovies} />)
                    }
                </Col>

            </Row>
            <Col>
                <h4>Favorite Movies</h4>
                <Row>
                    {favoriteMovies.map(movie => (
                        <Col key={movie.id} md={6}>
                            <MovieCard
                                movie={movie}
                                user={user}
                                token={token}
                                setUser={onSubmit}
                            />
                        </Col>
                    ))}
                </Row>
            </Col>
        </>
    )
};

