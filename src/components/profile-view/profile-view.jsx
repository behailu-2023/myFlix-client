import React from "react";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import { UpdateUser } from "./update-user";
import { Card, Button, Image } from "react-bootstrap";
import { FavoriteMovies } from "./user-favoritemovie";
import { UpdateUser } from "./user-infoupdate";
import { UserInfo } from "./user-info";

export const ProfileView = ({ token, user, movies, onSubmit }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const [username, setUsername] = useState(user.UserName);
    const [email, setEmail] = useState(user.Email);
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState(user.Birthdate);
    const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.title));

    const formData = {
        UserName: username,
        Email: email,
        Password: password,
        Birthdate: birthdate
    };

    formData.Birthdate = birthdate ? new Date(birthdate).toISO8601 : null;

    const handleSubmit = (event) => {
        event.preventDefault(event);

        fetch(`https://movie-api-7p14.onrender.com/users/${user.UserName}`, {

            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        )
            .then((response) => {
                if (response.ok) {
                    alert("Update successful");
                    window.location.reload();
                    return response.json()
                }
                alert("Update failed");
            })
            .then((user) => {
                localStorage.setItem("user", JSON.stringify(user));
                onSubmit(user);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleUpdate = (e) => {
        switch (e.target.type) {
            case "text":
                setUsername(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "date":
                setBirthdate(e.target.value);
            default:
        }
    }

    const handleDeleteAccount = (id) => {
        fetch(`https://movie-api-7p14.onrender.com/users/${id}`, {
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

    return (
        <> 
        <Row>
            <Card className="mb-5">
                <Card.Body>
                    <Card.Title>My Account </Card.Title>
                        <Card.Text>
                            {
                                user && (<UserInfo name ={user.username} email={user.email} />)
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
        <Button onClick={() => handleDeleteAccount(storedUser._id)} 
            className="button-delete mb-5" 
            type="submit" variant="outline-secondary"
            >
            Delete account
            </Button>
        <Row>
            <Col className="mb-5" xs={12} md={12}>
                {
                    favoriteMovies && (<favouriteMovies user={user} favoriteMovies={favoriteMovies} />)
                }
            </Col>
          </Row>
          </>
      )
    }
    