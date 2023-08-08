import React, { useState } from "react";
import { login, register } from "/src/services/AuthService";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export const Auth = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    var response;

    if (isLogin) {
      response = login({ username, password }).then((response) => {
        if (response == 200) {
          alert("Login successful!");
          navigate("/");
        } else alert("Login failed!");
      });
    } else {
      response = register(form).then((response) => {
        if (response.status == 200) {
          alert(response.data.message);
          setIsLogin(true);
        } else alert("Register failed!");
      });
    }

    response.catch((error) => {
      console.error(error);
      alert("Error occurred:\n" + error);
    });
  };

  return (
    <>
      <h1>Login or Register</h1>
      <Tabs
        fill
        className="mb-3"
        onSelect={(key) => setIsLogin(key == "login")}
      >
        <Tab eventKey="login" title="Login"></Tab>
        <Tab eventKey="register" title="Register"></Tab>
      </Tabs>
      <LoginRegister
        isLogin={isLogin}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export const LoginRegister = ({ isLogin, handleInputChange, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          Username
        </Form.Label>
        <Col sm="9">
          <Form.Control
            required
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleInputChange}
          />
        </Col>
      </Form.Group>

      {!isLogin && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Email
          </Form.Label>
          <Col sm="9">
            <Form.Control
              required
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
      )}

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          Password
        </Form.Label>
        <Col sm="9">
          <Form.Control
            required
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
        </Col>
      </Form.Group>
      <Button variant="outline-primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Auth;
