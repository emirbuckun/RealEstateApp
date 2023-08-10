import { addPrice, editPrice, getPrice } from "/src/services/PriceService";
import { getCurrencies } from "/src/services/CurrencyService";
import { getEstates } from "/src/services/EstateService";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const Edit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateUrl = "/prices";
  const operation = id ? t("edit") : t("add");

  const [form, setForm] = useState({ estateId: 0, currencyId: 0, amount: 0 });
  const [estates, setEstates] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { estateId, currencyId, amount } = form;
    var response;

    if (estateId > 0 && currencyId > 0 && amount > 0) {
      id
        ? (response = editPrice({ id, estateId, currencyId, amount }))
        : (response = addPrice({ estateId, currencyId, amount }));

      response
        .then((response) => {
          if (response.status == 200) {
            alert(operation + " operation successful!");
            navigate(navigateUrl);
          } else alert(operation + " operation failed!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error occurred:\n" + error);
        });
    } else alert("Please fill the form!");
  };

  const fetchPrice = () => {
    getPrice(id)
      .then((response) => {
        if (response.status == 200) {
          const { estateId, currencyId, amount } = response.data;
          setForm({ estateId, currencyId, amount });
        } else console.log("Error occurred!");
      })
      .catch((error) =>
        console.log("Error occurred while fetching price: " + error)
      );
  };

  const fetchEstates = () => {
    getEstates()
      .then((response) => {
        if (response.status == 200) {
          setEstates(response.data);
        } else console.log("Error occurred!");
      })
      .catch((error) =>
        console.log("Error occurred while fetching estates: " + error)
      );
  };

  const fetchCurrencies = () => {
    getCurrencies()
      .then((response) => {
        if (response.status == 200) {
          setCurrencies(response.data);
        } else console.log("Error occurred!");
      })
      .catch((error) =>
        console.log("Error occurred while fetching currencies: " + error)
      );
  };

  useEffect(() => {
    id && fetchPrice();
    fetchEstates();
    fetchCurrencies();
  }, []);

  return (
    <>
      <h3>
        {operation} {t("price")}
      </h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            {t("estate")}
          </Form.Label>
          <Col sm="9">
            <Form.Select
              required
              value={form.estateId}
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
              value={form.currencyId}
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
              value={form.amount}
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
