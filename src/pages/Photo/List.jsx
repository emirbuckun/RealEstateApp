import { PhotoContext } from "/src/contexts/PhotoContext";
import { Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

const List = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { photos, fetchPhotos, handleDeletePhoto } = useContext(PhotoContext);

  const handleDelete = ({ id, name, estate }) => {
    window.confirm(
      `Delete the photo of ${name} of the estate named ${estate}?`
    ) && handleDeletePhoto({ id });
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
      <h3>{t("photos")}</h3>

      <Table striped bordered hover responsive>
        <thead className="align-middle">
          <tr>
            <th>#</th>
            <th>{t("estate")}</th>
            <th>{t("pictureName")}</th>
            <th>{t("pictureView")}</th>
            <th>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => navigate("/photo/add")}
              >
                {t("add")}
              </Button>
            </th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {photos.map((photo, index) => {
            const { id, estate, description, bytes, fileExtension } = photo;
            const extension = fileExtension.replace(".", "");
            return (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{estate}</td>
                <td>{description}</td>
                <td>
                  <img
                    style={{ width: "5rem" }}
                    src={`data:image/${extension};base64,${bytes}`}
                  ></img>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() =>
                      handleDelete({ id, name: description, estate })
                    }
                  >
                    {t("delete")}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default List;
