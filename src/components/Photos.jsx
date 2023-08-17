import { addPhoto, deletePhoto } from "/src/services/PhotoService";
import { Image, Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Photos = ({ id, photos, fetchEstate }) => {
  const [form, setForm] = useState({ estateId: id ?? 0, photo: null });
  const { estateId, photo } = form;
  const { t } = useTranslation();

  const handleDelete = ({ photoId, name, estate }) => {
    window.confirm(
      `Delete the photo of ${name} of the estate named ${estate}?`
    ) &&
      deletePhoto(photoId)
        .then((response) => {
          if (response.status == 204) {
            alert("Operation successful!");
            fetchEstate(estateId);
          } else alert("Operation failed!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error occurred:\n" + error);
        });
  };

  const handleAdd = (e) => {
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

        addPhoto(formData)
          .then((response) => {
            if (response.status == 200) {
              alert("Operation successful!");
              fetchEstate(estateId);
            } else alert(response.data.data);
          })
          .catch((error) => {
            console.error(error);
            alert("Error occurred:\n" + error);
          });
      }
    } else alert("Please fill the form.");
  };

  return (
    <>
      <Form.Group className="mt-2 mb-2">
        <Form.Label className="mb-3 fs-5">{t("photos")}</Form.Label>

        {photos.length > 0 ? (
          photos.map((photo, index) => {
            const {
              id: photoId,
              description: name,
              estate,
              bytes,
              fileExtension,
            } = photo;
            const extension = fileExtension.replace(".", "");
            return (
              <Row className="align-items-center mb-2" key={index}>
                <Col sm={4}>
                  <Image
                    style={{ width: "10rem" }}
                    src={`data:image/${extension};base64,${bytes}`}
                    rounded
                  />
                </Col>
                <Col sm={4}>
                  <Form.Label>{name}</Form.Label>
                </Col>
                <Col>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete({ photoId, name, estate })}
                  >
                    {t("delete")}
                  </Button>
                </Col>
              </Row>
            );
          })
        ) : (
          <p className="justify-content-center">{t("noPhotoExistMessage")}</p>
        )}
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm="8">
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
        <Col>
          <Button onClick={handleAdd} variant="outline-success">
            {t("add")}
          </Button>
        </Col>
      </Form.Group>
    </>
  );
};

export default Photos;
