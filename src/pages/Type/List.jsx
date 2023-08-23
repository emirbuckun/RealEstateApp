import { TypeContext } from "/src/contexts/TypeContext";
import { Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const List = () => {
  const { types, handleDeleteType } = useContext(TypeContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = ({ id, name }) => {
    window.confirm("Delete the type named " + name + "?") &&
      handleDeleteType({ id });
  };

  return (
    <>
      <h3>{t("types")}</h3>

      <Table size="sm" striped bordered hover responsive>
        <thead className="align-middle">
          <tr>
            <th>#</th>
            <th>{t("name")}</th>
            <th style={{ width: "120px" }}>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => navigate("/type/edit/")}
              >
                {t("add")}
              </Button>
            </th>
          </tr>
        </thead>

        <tbody className="align-middle">
          {types.map((type, index) => {
            const { name, id } = type;
            return (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate("/type/edit/" + id)}
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
