import { addEstate, editEstate, getEstate } from "/src/services/EstateService";
import { getStatuses } from "/src/services/StatusService";
import { getTypes } from "/src/services/TypeService";
import { Image, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const Edit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
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
  const operation = id ? t("edit") : t("add");

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
      <h3>
        {operation} {t("estate")}
      </h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            {t("name")}
          </Form.Label>
          <Col sm="8">
            <Form.Control
              required
              value={name}
              name="name"
              type="text"
              placeholder={t("name")}
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
            {t("type")}
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
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            {t("status")}
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
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            {t("latitude")}
          </Form.Label>
          <Col sm="8">
            <Form.Control
              required
              value={latitude}
              name="latitude"
              type="number"
              placeholder={t("latitude")}
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
            {t("longitude")}
          </Form.Label>
          <Col sm="8">
            <Form.Control
              required
              value={longitude}
              name="longitude"
              type="number"
              placeholder={t("longitude")}
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
            {t("endDate")}
          </Form.Label>
          <Col sm="8">
            <Form.Control
              required
              value={new Date(endDate).toISOString().split("T")[0]}
              name="endDate"
              type="date"
              placeholder={t("endDate")}
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
          {t("submit")}
        </Button>

        <hr></hr>

        <Form.Group as={Row} className="mt-3 mb-3">
          <Form.Label column sm="12">
            {t("prices")}
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
            <p className="justify-content-center">{t("noPriceExistMeesage")}</p>
          )}
        </Form.Group>

        <Button href="/prices" variant="outline-success">
          {t("editPrices")}
        </Button>

        <hr></hr>

        <Form.Group as={Row} className="mt-3 mb-3">
          <Form.Label column sm="12">
            {t("photos")}
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
              : t("noPhotoExistMessage")}
          </div>
        </Form.Group>

        <Button href="/prices" variant="outline-info">
          {t("editPhotos")}
        </Button>
      </Form>
    </>
  );
};

export default Edit;
