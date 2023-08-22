import { addEstate, editEstate, getEstate } from "/src/services/EstateService";
import { TypeContext } from "/src/contexts/TypeContext";
import { StatusContext } from "/src/contexts/StatusContext";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Prices from "/src/components/Prices";
import Photos from "/src/components/Photos";

const Edit = () => {
  const { types } = useContext(TypeContext);
  const { statuses } = useContext(StatusContext);
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const operation = id ? t("edit") : t("add");
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
            navigate("/estate/edit/" + response.data.id);
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

  const fetchEstate = (id) => {
    getEstate(id)
      .then((response) => {
        if (response.status == 200) setForm(response.data);
        else console.log("Error occurred!");
      })
      .catch((error) =>
        console.log("Error occurred while fetching estate: " + error)
      );
  };

  useEffect(() => {
    id && fetchEstate(id);
  }, []);

  return (
    <>
      <h3>
        {operation} {t("estate")}
      </h3>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4} sm={6} xs={12}>
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
          </Col>

          <Col md={4} sm={6} xs={12}>
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
          </Col>

          <Col md={4} sm={6} xs={12}>
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
          </Col>

          <Col md={4} sm={6} xs={12}>
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
          </Col>

          <Col md={4} sm={6} xs={12}>
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
          </Col>

          <Col md={4} sm={6} xs={12}>
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
          </Col>
        </Row>

        <Button variant="outline-primary" type="submit">
          {t("submit")}
        </Button>

        <hr></hr>
        <Prices id={id} prices={form.prices} fetchEstate={fetchEstate} />
        <hr></hr>
        <Photos id={id} photos={form.photos} fetchEstate={fetchEstate} />
      </Form>
    </>
  );
};

export default Edit;
