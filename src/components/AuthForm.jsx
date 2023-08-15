import { Col, Form, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const AuthForm = ({ isLogin, handleInputChange, handleSubmit }) => {
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
