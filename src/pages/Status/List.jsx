import { StatusContext } from "/src/contexts/StatusContext";
import { Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const List = () => {
  const { statuses, handleDeleteStatus } = useContext(StatusContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = ({ id, name }) => {
    window.confirm("Delete the status named " + name + "?") &&
      handleDeleteStatus({ id });
  };

  return (
    <>
      <h3>{t("statuses")}</h3>

      <Table size="sm" striped bordered hover responsive>
        <thead className="align-middle">
          <tr>
            <th>#</th>
            <th>{t("name")}</th>
            <th style={{ width: "120px" }}>
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
        </tbody>
      </Table>
    </>
  );
};

export default List;
