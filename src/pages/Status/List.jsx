import { deleteStatus, getStatuses } from "/src/services/StatusService";
import { Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const List = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [{ statuses, loading, error }, setState] = useState({
    statuses: [],
    loading: true,
    error: null,
  });

  const handleDelete = ({ id, name }) => {
    if (window.confirm("Delete the status named " + name + "?")) {
      deleteStatus(id)
        .then((response) => {
          if (response.status == 204) {
            alert("Delete operation successful!");
            fetchStatuses();
          } else alert("Delete operation failed!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error occurred:\n" + error);
        });
    }
  };

  const fetchStatuses = () => {
    setState({ error: null, loading: true });
    getStatuses()
      .then((response) => {
        if (response.status == 200) {
          setState({ statuses: response.data, loading: false });
        } else
          setState({
            loading: false,
            error: response.status + ": " + response.data.statusText,
          });
      })
      .catch((error) => setState({ error, loading: false }));
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  return (
    <>
      <h3>{t("statuses")}</h3>

      <Table striped bordered hover>
        <thead className="align-middle">
          <tr>
            <th>#</th>
            <th>{t("name")}</th>
            <th>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => navigate("/status/edit/")}
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
            ) : statuses.length > 0 ? (
              <>
                {statuses.map((status, index) => {
                  const { name, id } = status;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => navigate("/status/edit/" + id)}
                        >
                          {t("edit")}
                        </Button>{" "}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete({ id, name })}
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
                <td colSpan={3}>{t("thereIsNo")}</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={3}>{t("loading")}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default List;
