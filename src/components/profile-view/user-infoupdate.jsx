import React from "react";
import Form from"react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

export const UpdateUser = ({ formData, handleUpdate, handleSubmit }) => {

  return (
    <Container>
      {user && (
        <Row>
          <Col xs={12} sm={4}>
            <Card>
              <Card.Body>
                <UserInfo
                  Username={user.Username}
                  Email={user.Email}
                  Birthday={user.Birthday}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={8}>
            <Card>
              <Card.Body>
                <form className="profile-form h-100" onSubmit={handleSubmit}>
                  <h4>Want to change some info?</h4>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      value={formData.Username}
                      onChange={(e) => handleUpdate(e)}
                      required
                      minLength="5"
                      placeholder="username must be at least 5 characters"
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      onChange={(e) => handleUpdate(e)}
                      required
                      minLength="5"
                      placeholder="password must be at least 5 characters"
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      value={formData.Email}
                      onChange={(e) => handleUpdate(e)}
                      required
                      placeholder="please enter your email address"
                    />
                  </Form.Group>
                  <button
                    className="back-button"
                    style={{ cursor: 'pointer' }}
                    variant="primary"
                    type="submit"
                  >
                    Update
                  </button>
                </form>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12}>
            <FavoriteMovies
              favoriteMovieList={favMovies}
              updateFavMovies={updateFavMovies}
            />
          </Col>
        </Row>
      )}
      <button
        className="back-button"
        style={{ cursor: 'pointer' }}
        onClick={handleDeregister}
      >
        Deregister
      </button>
    </Container>
  );
};
