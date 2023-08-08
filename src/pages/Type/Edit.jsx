import { useState, useEffect } from "react";
import { addType, editType, getType } from "/src/services/TypeService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Edit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const navigateUrl = "/types";
  const operation = id ? "Edit" : "Add";

  const handleSubmit = (e) => {
    e.preventDefault();
    var response;

    id
      ? (response = editType({ id: id, name: name }))
      : (response = addType({ name: name }));

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
      <h3>{operation} Type</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="5">
            Type Name
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
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Edit;
