import { addStatus, editStatus, getStatus } from "/src/services/StatusService";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const Edit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateUrl = "/statuses";
  const [name, setName] = useState("");
  const operation = id ? t("edit") : t("add");

  const handleSubmit = (e) => {
    e.preventDefault();
    var response;

    id
      ? (response = editStatus({ id, name }))
      : (response = addStatus({ name }));

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

  const fetchStatus = () => {
    getStatus(id)
      .then((response) => {
        if (response.status == 200) {
          setName(response.data.name);
        } else console.log("Error occurred!");
      })
      .catch((error) =>
        console.log("Error occurred while fetching status: " + error)
      );
  };

  useEffect(() => {
    id && fetchStatus();
  }, []);

  return (
    <>
      <h3>
        {operation} {t("status")}
      </h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="5">
            {t("statusName")}
          </Form.Label>
          <Col sm="7">
            <Form.Control
              required
              value={name}
              name="name"
              type="text"
              placeholder="Name"
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
