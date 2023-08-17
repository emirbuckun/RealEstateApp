import { CurrencyContext } from "/src/contexts/CurrencyContext";
import { Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const List = () => {
  const { currencies, handleDeleteCurrency } = useContext(CurrencyContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = ({ id, name }) => {
    window.confirm("Delete the currency named " + name + "?") &&
      handleDeleteCurrency({ id });
  };

  return (
    <>
      <h3>{t("currencies")}</h3>

      <Table striped bordered hover>
        <thead className="align-middle">
          <tr>
            <th>#</th>
            <th>{t("name")}</th>
            <th>{t("code")}</th>
            <th>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => navigate("/currency/edit/")}
              >
                {t("add")}
              </Button>
            </th>
          </tr>
        </thead>

        <tbody className="align-middle">
          {currencies.map((currency, index) => {
            const { name, code, id } = currency;
            return (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{code}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate("/currency/edit/" + id)}
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
