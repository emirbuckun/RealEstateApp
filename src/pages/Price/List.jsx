import { useEffect, useState } from "react";
import { deletePrice, getPrices } from "/src/services/PriceService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const List = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [{ prices, loading, error }, setState] = useState({
    prices: [],
    loading: true,
    error: null,
  });

  const handleDelete = ({ id, estateName, currencyCode, amount }) => {
    if (
      window.confirm(
        `Delete the price of ${amount} ${currencyCode} of the estate named ${estateName}?`
      )
    ) {
      deletePrice(id)
        .then((response) => {
          if (response.status == 204) {
            alert("Delete operation successful!");
            fetchPrices();
          } else alert("Delete operation failed!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error occurred:\n" + error);
        });
    }
  };

  const fetchPrices = () => {
    setState({ error: null, loading: true });
    getPrices()
      .then((response) => {
        if (response.status == 200) {
          setState({ prices: response.data, loading: false });
        } else
          setState({
            loading: false,
            error: response.status + ": " + response.data.statusText,
          });
      })
      .catch((error) => setState({ error, loading: false }));
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <>
      <h3>{t("prices")}</h3>

      <Table striped bordered hover>
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
          {!loading ? (
            error ? (
              <tr>
                <td colSpan={9}>
                  {t("errorOccurred")} {error}.
                </td>
              </tr>
            ) : prices.length > 0 ? (
              <>
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
              </>
            ) : (
              <tr>
                <td colSpan={4}>{t("thereIsNo")}</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={4}>{t("loading")}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default List;
