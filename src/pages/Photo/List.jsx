import { deletePhoto, getPhotos } from "/src/services/PhotoService";
import { Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const List = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [{ photos, loading, error }, setState] = useState({
    photos: [],
    loading: true,
    error: null,
  });

  const handleDelete = ({ id, name, estate }) => {
    if (
      window.confirm(
        `Delete the photo of ${name} of the estate named ${estate}?`
      )
    ) {
      deletePhoto(id)
        .then((response) => {
          if (response.status == 204) {
            alert("Delete operation successful!");
            fetchPhotos();
          } else alert("Delete operation failed!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error occurred:\n" + error);
        });
    }
  };

  const fetchPhotos = () => {
    setState({ error: null, loading: true });
    getPhotos()
      .then((response) => {
        if (response.status == 200) {
          setState({ photos: response.data, loading: false });
        } else
          setState({
            loading: false,
            error: response.status + ": " + response.data.statusText,
          });
      })
      .catch((error) => setState({ error, loading: false }));
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
      <h3>{t("photos")}</h3>

      <Table striped bordered hover>
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
          {!loading ? (
            error ? (
              <tr>
                <td colSpan={9}>
                  {t("errorOccurred")} {error}.
                </td>
              </tr>
            ) : photos.length > 0 ? (
              <>
                {photos.map((photo, index) => {
                  const { id, estate, description, bytes, fileExtension } =
                    photo;
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
              </>
            ) : (
              <tr>
                <td colSpan={5}>{t("thereIsNo")}</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={5}>{t("loading")}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default List;
