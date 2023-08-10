import { useState, useEffect } from "react";
import {
  addCurrency,
  editCurrency,
  getCurrency,
} from "/src/services/CurrencyService";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Edit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", code: "" });
  const navigate = useNavigate();
  const navigateUrl = "/currencies";
  const operation = id ? t("edit") : t("add");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, code } = form;
    var response;

    id
      ? (response = editCurrency({ id, name, code }))
      : (response = addCurrency({ name, code }));

    response
      .then((response) => {
        if (response.status == 200) {
          alert(operation + " operation successful!");
          navigate(navigateUrl);
        } else alert(operation + " operation failed!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const fetchCurrency = () => {
    getCurrency(id)
      .then((response) => {
        if (response.status == 200) {
          const { name, code } = response.data;
          setForm({ name, code });
        } else console.log("Error occurred!");
      })
      .catch((error) =>
        console.log("Error occurred while fetching currency: " + error)
      );
  };

  useEffect(() => {
    id && fetchCurrency();
  }, []);

  return (
    <>
      <h3>
        {operation} {t("currency")}
      </h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="5">
            {t("currencyName")}
          </Form.Label>
          <Col sm="7">
            <Form.Control
              required
              value={form.name}
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
              value={form.code}
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
