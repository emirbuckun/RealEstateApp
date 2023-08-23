import { useContext, useState, useEffect } from "react";
import { StatusContext } from "/src/contexts/StatusContext";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { fetchStatus, handleAddStatus, handleEditStatus } =
    useContext(StatusContext);
  const [name, setName] = useState("");
  const { t } = useTranslation();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    id ? handleEditStatus({ id, name }) : handleAddStatus({ name });
  };

  useEffect(() => {
    id && fetchStatus({ id, setName });
  }, []);

  return (
    <>
      <h3>
        {id ? t("edit") : t("add")} {t("status")}
      </h3>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={9} xs={12}>
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
          </Col>

          <Col sm={3} xs={12}>
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
