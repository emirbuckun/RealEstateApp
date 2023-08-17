import { CurrencyContext } from "/src/contexts/CurrencyContext";
import { PriceContext } from "/src/contexts/PriceContext";
import { getEstates } from "/src/services/EstateService";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [form, setForm] = useState({ estateId: 0, currencyId: 0, amount: 0 });
  const { estateId, currencyId, amount } = form;
  const [estates, setEstates] = useState([]);
  const { currencies } = useContext(CurrencyContext);
  const { fetchPrice, handleAddPrice, handleEditPrice } =
    useContext(PriceContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (estateId > 0 && currencyId > 0 && amount > 0) {
      id
        ? handleEditPrice({ id, estateId, currencyId, amount })
        : handleAddPrice({ estateId, currencyId, amount });
    } else alert("Please fill the form!");
  };

  const fetchEstates = () => {
    getEstates()
      .then((response) => {
        if (response.status == 200) setEstates(response.data);
        else console.log("Error occurred!");
      })
      .catch((error) =>
        console.log("Error occurred while fetching estates: " + error)
      );
  };

  useEffect(() => {
    id && fetchPrice({ id, setForm });
    fetchEstates();
  }, []);

  return (
    <>
      <h3>
        {id ? t("edit") : t("add")} {t("price")}
      </h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            {t("estate")}
          </Form.Label>
          <Col sm="9">
            <Form.Select
              required
              value={estateId}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  estateId: parseInt(e.target.value),
                }))
              }
            >
              <option value={0}>{t("selectEstate")}</option>
              {estates.map((item, index) => {
                const { id, name } = item;
                return (
                  <option key={index} value={id}>
                    {name}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            {t("currency")}
          </Form.Label>
          <Col sm="9">
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
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            {t("amount")}
          </Form.Label>
          <Col sm="9">
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
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          {t("submit")}
        </Button>
      </Form>
    </>
  );
};

export default Edit;
