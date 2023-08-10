import React, { useState, useEffect } from "react";
import { getTypes } from "/src/services/TypeService";
import { getStatuses } from "/src/services/StatusService";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FormGroup } from "react-bootstrap";

const Filter = ({ setFilter }) => {
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
              <Form.Label>Estate Type</Form.Label>
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
                <option value={0}>Select Type</option>
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
              <Form.Label>Estate Status</Form.Label>
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
                <option value={0}>Select Status</option>
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
              <Form.Label>Start Date</Form.Label>
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
              <Form.Label>End Date</Form.Label>
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
