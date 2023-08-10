import React, { useState } from "react";
import { login, register } from "/src/services/AuthService";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

export const Auth = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useTranslation();
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
      <h3>
        {t("login")} {t("or")} {t("register")}
      </h3>
      <Tabs
        fill
        className="mb-3"
        onSelect={(key) => setIsLogin(key == "login")}
      >
        <Tab eventKey="login" title={t("login")}></Tab>
        <Tab eventKey="register" title={t("register")}></Tab>
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
  const { t } = useTranslation();
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="4">
          {t("username")}
        </Form.Label>
        <Col sm="8">
          <Form.Control
            required
            name="username"
            type="text"
            placeholder={t("username")}
            onChange={handleInputChange}
          />
        </Col>
      </Form.Group>

      {!isLogin && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            {t("email")}
          </Form.Label>
          <Col sm="8">
            <Form.Control
              required
              name="email"
              type="email"
              placeholder={t("email")}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
      )}

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="4">
          {t("password")}
        </Form.Label>
        <Col sm="8">
          <Form.Control
            required
            name="password"
            type="password"
            placeholder={t("password")}
            onChange={handleInputChange}
          />
        </Col>
      </Form.Group>
      <Button variant="outline-primary" type="submit">
        {t("submit")}
      </Button>
    </Form>
  );
};

export default Auth;
