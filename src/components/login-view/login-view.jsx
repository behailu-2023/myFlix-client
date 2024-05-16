import React from "react";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";



export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
   
 
    const handleSubmit = (event) => {

        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };
        fetch("https://movie-api-7p14.onrender.com/login?Username", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response)=> response.json())
        .then((data) => {
            console.log("Login response: ", data);
            if(data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setIteam("token", data.token);
                onLoggedIn(data.user, data.token);
            } else {
                alert("No such user");
            }
        })
        .catch((e) => {
            alert("Something went wrong");
        });
            
    };
    return (
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>
          Username:
        </Form.Label>
        <Form.Control 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        minLength="8" required />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>
          Password:
        </Form.Label>
        <Form.Control 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>

      <Button type="submit" variant="primary">Submit</Button>
    </Form>
    );
  };