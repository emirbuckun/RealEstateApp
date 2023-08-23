import { PhotoContext } from "/src/contexts/PhotoContext";
import { Button, Form, Row, Col } from "react-bootstrap";
import { getEstates } from "/src/services/EstateService";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Add = () => {
  const { handleAddPhoto } = useContext(PhotoContext);
  const [form, setForm] = useState({ estateId: 0, photo: null });
  const [estates, setEstates] = useState([]);
  const { estateId, photo } = form;
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (estateId > 0 && photo != null) {
      const isTypeValid = photo.type.split("/")[0] == "image";
      const isSizeValid = photo.size < 2097152;

      if (!isTypeValid) {
        alert("Please upload file with a type of image.");
      } else if (!isSizeValid) {
        alert("Please upload file smaller than 2MB.");
      } else {
        var formData = new FormData();
        formData.append("estateId", estateId);
        formData.append("file", photo);
        handleAddPhoto(formData);
      }
    } else alert("Please fill the form.");
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
      <h3>{t("addPhoto")}</h3>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={5} xs={12}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                {t("estate")}
              </Form.Label>
              <Col sm="9">
                <Form.Select
                  required
                  value={estateId}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      estateId: parseInt(e.target.value),
                    }))
                  }
                >
                  <option value={0}>{t("selectEstate")}</option>
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
          </Col>

          <Col md={5} xs={12}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                {t("photo")}
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
          </Col>

          <Col md={2} xs={12}>
            <Button variant="outline-primary" type="submit">
              {t("submit")}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Add;
