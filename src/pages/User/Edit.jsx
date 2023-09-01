import { useContext, useState, useEffect } from "react";
import { UserContext } from "/src/contexts/UserContext";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { fetchUser, handleAddUser, handleEditUser } = useContext(UserContext);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { username, email, password } = form;
  const { t } = useTranslation();
  const { id } = useParams();
  const inputLgValue = !id ? 4 : 5;
  const buttonLgValue = !id ? 12 : 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    id
      ? handleEditUser({ username, email })
      : handleAddUser({ username, email, password });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    id && fetchUser({ id, setForm });
  }, []);

  return (
    <>
      <h3>
        {id ? t("edit") : t("add")} {t("user")}
      </h3>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={inputLgValue} sm={12} xs={12}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                {t("username")}
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  required
                  disabled={id}
                  value={username}
                  name="username"
                  type="text"
                  placeholder={t("username")}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
          </Col>

          <Col lg={inputLgValue} sm={12} xs={12}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                {t("email")}
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  required
                  value={email}
                  name="email"
                  type="email"
                  placeholder={t("email")}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
          </Col>

          {!id && (
            <Col lg={inputLgValue} sm={12} xs={12}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  {t("password")}
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    required
                    value={password}
                    name="password"
                    type="password"
                    placeholder={t("password")}
                    onChange={handleInputChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          )}

          <Col lg={buttonLgValue} sm={12} xs={12}>
            <Button variant="outline-primary" type="submit">
              {t("submit")}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Edit;
