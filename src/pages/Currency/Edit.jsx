import { CurrencyContext } from "/src/contexts/CurrencyContext";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", code: "" });
  const { fetchCurrency, handleAddCurrency, handleEditCurrency } =
    useContext(CurrencyContext);
  const { name, code } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    id
      ? handleEditCurrency({ id, name, code })
      : handleAddCurrency({ name, code });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    id && fetchCurrency({ id, setForm });
  }, []);

  return (
    <>
      <h3>
        {id ? t("edit") : t("add")} {t("currency")}
      </h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="5">
            {t("currencyName")}
          </Form.Label>
          <Col sm="7">
            <Form.Control
              required
              value={name}
              name="name"
              type="text"
              placeholder={t("name")}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="5">
            {t("currencyCode")}
          </Form.Label>
          <Col sm="7">
            <Form.Control
              required
              value={code}
              name="code"
              type="text"
              placeholder={t("code")}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          {t("submit")}
        </Button>
      </Form>
    </>
  );
};

export default Edit;
