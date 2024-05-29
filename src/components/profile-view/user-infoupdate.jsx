import React from "react";
import Form from"react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

export const UpdateUser = ({ formData, handleUpdate, handleSubmit }) => {

  return (
    <Row>
      <Form onSubmit={handleSubmit}>
        
        <h2> Update profile </h2>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            minLength={5}
            value={formData.UserName}
            onChange={(e) => handleUpdate(e)}
            required
          />
          </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label> Email: </Form.Label>
          <Form.Control
            type="email"
            value={formData.Email}
            onChange={(e) => handleUpdate(e)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:
          </Form.Label>
          <Form.Control
            type="password"
            minLength={8}
            value={formData.Password}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label> Birthday: </Form.Label>
          <Form.Control
            type="date"
            value={formData.Birthdate}
            onChange={(e) => handleUpdate(e)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Confirm changes</Button> 
        </Form>  
     </Row>   
  );
};
UpdateUser.propTypes = {
  formData: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  
};