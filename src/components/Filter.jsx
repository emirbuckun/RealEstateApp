import { getStatuses } from "/src/services/StatusService";
import { getTypes } from "/src/services/TypeService";
import { Form, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const Filter = ({ setFilter }) => {
  const { t } = useTranslation();
  const [types, setTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const fetchTypes = () => {
    getTypes()
      .then((response) => {
        if (response.status == 200) {
          setTypes(response.data);
        } else console.log("Error occurred!");
      })
      .catch((error) =>
        console.log("Error occurred while fetching types: " + error)
      );
  };

  const fetchStatuses = () => {
    getStatuses()
      .then((response) => {
        if (response.status == 200) {
          setStatuses(response.data);
        } else console.log("Error occurred!");
      })
      .catch((error) =>
        console.log("Error occurred while fetching statuses: " + error)
      );
  };

  useEffect(() => {
    fetchTypes();
    fetchStatuses();
  }, []);

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
    </Form>
  );
};

export default Filter;
