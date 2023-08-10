import { useState, useEffect } from "react";
import { addType, editType, getType } from "/src/services/TypeService";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Form, Row, Col } from "react-bootstrap";

const Edit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const navigateUrl = "/types";
  const operation = id ? t("edit") : t("add");

  const handleSubmit = (e) => {
    e.preventDefault();
    var response;

    id ? (response = editType({ id, name })) : (response = addType({ name }));

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

  const fetchType = () => {
    getType(id)
      .then((response) => {
        if (response.status == 200) {
          setName(response.data.name);
        } else console.log("Error occurred!");
      })
      .catch((error) =>
        console.log("Error occurred while fetching type: " + error)
      );
  };

  useEffect(() => {
    id && fetchType();
  }, []);

  return (
    <>
      <h3>
        {operation} {t("type")}
      </h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="5">
            {t("typeName")}
          </Form.Label>
          <Col sm="7">
            <Form.Control
              required
              value={name}
              name="name"
              type="text"
              placeholder={t("name")}
              onChange={(e) => setName(e.target.value)}
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
