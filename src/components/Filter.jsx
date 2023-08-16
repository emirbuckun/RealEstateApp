import { TypeContext } from "/src/contexts/TypeContext";
import { StatusContext } from "/src/contexts/StatusContext";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useContext } from "react";

const Filter = ({ setFilter, fetchEstates }) => {
  const { types } = useContext(TypeContext);
  const { statuses } = useContext(StatusContext);
  const { t } = useTranslation();

  return (
    <Form>
      <Row className="mb-3">
        <Col>
          <Row>
            <Col sm={5}>
              <Form.Label>{t("estateType")}</Form.Label>
            </Col>
            <Col>
              <Form.Select
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    typeId: parseInt(e.target.value),
                  }))
                }
              >
                <option value={0}>{t("selectType")}</option>
                {types.map((item, index) => {
                  const { id, name } = item;
                  return (
                    <option key={index} value={id}>
                      {name}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col sm={5}>
              <Form.Label>{t("estateStatus")}</Form.Label>
            </Col>
            <Col>
              <Form.Select
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    statusId: parseInt(e.target.value),
                  }))
                }
              >
                <option value={0}>{t("selectStatus")}</option>
                {statuses.map((item, index) => {
                  const { id, name } = item;
                  return (
                    <option key={index} value={id}>
                      {name}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Row>
            <Col sm={5}>
              <Form.Label>{t("startDate")}</Form.Label>
            </Col>
            <Col>
              <Form.Control
                name="startDate"
                type="date"
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    startDate: new Date(e.target.value).toISOString(),
                  }));
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col sm={5}>
              <Form.Label>{t("endDate")}</Form.Label>
            </Col>
            <Col>
              <Form.Control
                name="endDate"
                type="date"
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }));
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Button onClick={fetchEstates} variant="outline-info" className="mb-3">
        Filter
      </Button>
    </Form>
  );
};

export default Filter;
