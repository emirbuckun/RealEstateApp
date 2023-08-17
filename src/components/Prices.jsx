import { addPrice, deletePrice } from "/src/services/PriceService";
import { CurrencyContext } from "/src/contexts/CurrencyContext";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";

const Prices = ({ id, prices, fetchEstate }) => {
  const { currencies } = useContext(CurrencyContext);
  const { t } = useTranslation();
  const [form, setForm] = useState({
    estateId: id ?? 0,
    currencyId: 0,
    amount: 0,
  });
  const { estateId, currencyId, amount } = form;

  const handleDelete = ({ priceId, estateName, currencyCode, amount }) => {
    window.confirm(
      `Delete the price of ${amount} ${currencyCode} of the estate named ${estateName}?`
    ) &&
      deletePrice(priceId)
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
    if (estateId > 0 && currencyId > 0 && amount > 0) {
      addPrice({ estateId, currencyId, amount })
        .then((response) => {
          if (response.status == 200) {
            alert("Operation successful!");
            fetchEstate(estateId);
          } else alert("Operation failed!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error occurred:\n" + error);
        });
    } else alert("Please fill the price form!");
  };

  return (
    <>
      <Form.Group className="mt-2 mb-2">
        <Form.Label className="mb-3 fs-5">{t("prices")}</Form.Label>
        {prices.length > 0 ? (
          prices.map((price, index) => {
            const { id: priceId, estateName, currencyCode, amount } = price;
            const priceDisplay = amount + " " + currencyCode;
            return (
              <Row className="mb-2" key={index}>
                <Col sm={8}>
                  <Form.Control
                    disabled
                    readOnly
                    value={priceDisplay}
                    name="price"
                    type="text"
                  />
                </Col>
                <Col>
                  <Button
                    variant="outline-danger"
                    onClick={() =>
                      handleDelete({
                        priceId,
                        estateName,
                        currencyCode,
                        amount,
                      })
                    }
                  >
                    {t("delete")}
                  </Button>
                </Col>
              </Row>
            );
          })
        ) : (
          <p className="justify-content-center">{t("noPriceExistMeesage")}</p>
        )}
      </Form.Group>

      <Form.Group className="mb-2">
        <Row>
          <Col sm={4}>
            <Form.Control
              required
              value={amount}
              name="amount"
              type="number"
              placeholder={t("amount")}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  amount: parseFloat(e.target.value),
                }))
              }
            />
          </Col>
          <Col sm={4}>
            <Form.Select
              required
              value={currencyId}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  currencyId: parseInt(e.target.value),
                }))
              }
            >
              <option value={0}>{t("selectCurrency")}</option>
              {currencies.map((item, index) => {
                const { id, name, code } = item;
                return (
                  <option key={index} value={id}>
                    {name + " (" + code + ")"}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
          <Col>
            <Button onClick={handleAdd} variant="outline-success">
              {t("add")}
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </>
  );
};

export default Prices;
