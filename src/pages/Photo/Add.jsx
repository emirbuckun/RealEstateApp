import { useState, useEffect } from "react";
import { addPhoto } from "/src/services/PhotoService";
import { getEstates } from "/src/services/EstateService";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Add = () => {
  const [form, setForm] = useState({ estateId: 0, photo: {} });
  const [estates, setEstates] = useState([]);
  const navigate = useNavigate();
  const navigateUrl = "/photos";

  const handleSubmit = (e) => {
    e.preventDefault();
    const { estateId, photo } = form;

    var formData = new FormData();
    formData.append("estateId", estateId);
    formData.append("file", photo);

    addPhoto(formData)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          alert("Add operation successful!");
          navigate(navigateUrl);
        } else alert(response.data.statusText);
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  const fetchEstates = () => {
    getEstates()
      .then((response) => {
        if (response.status == 200) {
          setEstates(response.data);
        } else console.log("Error occurred!");
      })
      .catch((error) =>
        console.log("Error occurred while fetching estates: " + error)
      );
  };

  useEffect(() => {
    fetchEstates();
  }, []);

  return (
    <>
      <h3>Add Photo</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Estate
          </Form.Label>
          <Col sm="9">
            <Form.Select
              required
              value={form.estateId}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  estateId: parseInt(e.target.value),
                }))
              }
            >
              <option value={0}>Select Estate</option>
              {estates.map((item, index) => {
                const { id, name } = item;
                return (
                  <option key={index} value={id}>
                    {name}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formFile" className="mb-3">
          <Form.Label column sm="3">
            Photo
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="file"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  photo: e.target.files[0],
                }))
              }
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

export default Add;
