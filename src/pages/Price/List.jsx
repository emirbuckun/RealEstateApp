import { PriceContext } from "/src/contexts/PriceContext";
import { Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

const List = () => {
  const { prices, fetchPrices, handleDeletePrice } = useContext(PriceContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = ({ id, estateName, currencyCode, amount }) => {
    window.confirm(
      `Delete the price of ${amount} ${currencyCode} of the estate named ${estateName}?`
    ) && handleDeletePrice({ id });
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <>
      <h3>{t("prices")}</h3>

      <Table striped bordered hover responsive>
        <thead className="align-middle">
          <tr>
            <th>#</th>
            <th>{t("estate")}</th>
            <th>{t("price")}</th>
            <th>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => navigate("/price/edit/")}
              >
                {t("add")}
              </Button>
            </th>
          </tr>
        </thead>

        <tbody className="align-middle">
          {prices.map((price, index) => {
            const { id, estateName, currencyCode, amount } = price;
            const priceMix = amount + " " + currencyCode;
            return (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{estateName}</td>
                <td>{priceMix}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate("/price/edit/" + id)}
                  >
                    {t("edit")}
                  </Button>{" "}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() =>
                      handleDelete({
                        id,
                        estateName,
                        currencyCode,
                        amount,
                      })
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
