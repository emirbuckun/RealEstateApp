import { useState, useEffect } from "react";
import { addEstate, editEstate, getEstate } from "/src/services/EstateService";
import { getTypes } from "/src/services/TypeService";
import { getStatuses } from "/src/services/StatusService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Edit = () => {
  const { id } = useParams();
  const [types, setTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    latitude: 0,
    longitude: 0,
    endDate: "0001-01-01",
    estateTypeId: 0,
    estateStatusId: 0,
    photos: [],
    prices: [],
  });

  const navigate = useNavigate();
  const navigateUrl = "/estates";
  const operation = id ? "Edit" : "Add";

  const { name, estateTypeId, estateStatusId, latitude, longitude, endDate } =
    form;
  const newEndDate = new Date(endDate).toISOString();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      var response;
      id
        ? (response = editEstate({
            id,
            name,
            estateTypeId,
            estateStatusId,
            latitude,
            longitude,
            endDate: newEndDate,
          }))
        : (response = addEstate({
            name,
            estateTypeId,
            estateStatusId,
            latitude,
            longitude,
            endDate: newEndDate,
          }));

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
    } else alert("Please fill the form properly.");
  };

  const validateForm = () => {
    return (
      estateTypeId > 0 &&
      estateStatusId > 0 &&
      latitude > 0 &&
      longitude > 0 &&
      Date.parse(newEndDate) > Date.now()
    );
  };

  const fetchEstate = () => {
    getEstate(id)
      .then((response) => {
        if (response.status == 200) {
          setForm(response.data);
        } else console.log("Error occurred!");
      })
      .catch((error) =>
        console.log("Error occurred while fetching estate: " + error)
      );
  };

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
    id && fetchEstate();
    fetchTypes();
    fetchStatuses();
  }, []);

  return (
    <>
      <h3>{operation} Estate</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Name
          </Form.Label>
          <Col sm="8">
            <Form.Control
              required
              value={name}
              name="name"
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Type
          </Form.Label>
          <Col sm="8">
            <Form.Select
              required
              value={estateTypeId}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  estateTypeId: parseInt(e.target.value),
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
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Status
          </Form.Label>
          <Col sm="8">
            <Form.Select
              required
              value={estateStatusId}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  estateStatusId: parseInt(e.target.value),
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
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Latitude
          </Form.Label>
          <Col sm="8">
            <Form.Control
              required
              value={latitude}
              name="latitude"
              type="number"
              placeholder="Latitude"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  latitude: parseFloat(e.target.value),
                }))
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            Longitude
          </Form.Label>
          <Col sm="8">
            <Form.Control
              required
              value={longitude}
              name="longitude"
              type="number"
              placeholder="Longitude"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  longitude: parseFloat(e.target.value),
                }))
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            End Date
          </Form.Label>
          <Col sm="8">
            <Form.Control
              required
              value={new Date(endDate).toISOString().split("T")[0]}
              name="endDate"
              type="date"
              placeholder="End Date"
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }));
              }}
            />
          </Col>
        </Form.Group>

        <Button variant="outline-primary" type="submit">
          Submit
        </Button>

        <hr></hr>

        <Form.Group as={Row} className="mt-3 mb-3">
          <Form.Label column sm="12">
            Prices
          </Form.Label>
          {form.prices.length > 0 ? (
            form.prices.map((price, index) => {
              const { amount, currencyCode } = price;
              const priceDisplay = amount + " " + currencyCode;
              return (
                <Col className="justify-content-center" key={index} sm="12">
                  <Form.Control
                    disabled
                    readOnly
                    value={priceDisplay}
                    name="price"
                    type="text"
                  />
                </Col>
              );
            })
          ) : (
            <p className="justify-content-center">
              There is no any price. Click the button below to add new price.
            </p>
          )}
        </Form.Group>

        <Button href="/prices" variant="outline-success">
          Edit Prices
        </Button>

        <hr></hr>

        <Form.Group as={Row} className="mt-3 mb-3">
          <Form.Label column sm="12">
            Photos
          </Form.Label>

          <div className="justify-content-center">
            {form.photos.length > 0
              ? form.photos.map((photo, index) => {
                  const { bytes, fileExtension } = photo;
                  const extension = fileExtension.replace(".", "");
                  return (
                    <Col key={index}>
                      <Image
                        style={{ width: "10rem" }}
                        src={`data:image/${extension};base64,${bytes}`}
                        rounded
                      />
                    </Col>
                  );
                })
              : "There is no any photo. Click the button below to add new photo."}
          </div>
        </Form.Group>

        <Button href="/prices" variant="outline-info">
          Edit Photos
        </Button>
      </Form>
    </>
  );
};

export default Edit;
