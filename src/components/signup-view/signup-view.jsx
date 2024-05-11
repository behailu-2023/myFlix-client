import React from "react";

import { useState } from "react";

export const SingupView = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [birthday, setBirthday] = useState();

  const handleSubmit = (event) => {
    event.preventDefault(event)

    const data = {
      UserName: username,
      Email: email,
      Birthdate: birthday,
      Password: password
    };

  fetch("https://movie-api-7p14.onrender.com/users", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  }
}).then((response) => {
  if (response.ok) {
    alert("Signup successful");
    window.location.reload();
  }else{
    alert("Signup failed");
  }
});
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input
        type="text"
        minLength={5}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br />
      <label> Email: </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <label>Password:</label>
      <input
        type="password"
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <label> Birthday: </label>
      <input
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
      />
      <br />
      <button type="submit"> Sign Up </button>
    </form>
  );
}
