import { useState, useEffect } from "react";
import {
  addCurrency,
  editCurrency,
  getCurrency,
} from "/src/services/CurrencyService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Edit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", code: "" });
  const navigate = useNavigate();
  const navigateUrl = "/currencies";
  const operation = id ? "Edit" : "Add";

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
      <h3>{operation} Currency</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="5">
            Currency Name
          </Form.Label>
          <Col sm="7">
            <Form.Control
              required
              value={form.name}
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="5">
            Currency Code
          </Form.Label>
          <Col sm="7">
            <Form.Control
              required
              value={form.code}
              name="code"
              type="text"
              placeholder="Code"
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Edit;
