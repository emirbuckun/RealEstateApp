import { useContext, useState, useEffect } from "react";
import { TypeContext } from "/src/contexts/TypeContext";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { fetchType, handleAddType, handleEditType } = useContext(TypeContext);
  const [name, setName] = useState("");
  const { t } = useTranslation();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    id ? handleEditType({ id, name }) : handleAddType({ name });
  };

  useEffect(() => {
    id && fetchType({ id, setName });
  }, []);

  return (
    <>
      <h3>
        {id ? t("edit") : t("add")} {t("type")}
      </h3>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={9} xs={12}>
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
