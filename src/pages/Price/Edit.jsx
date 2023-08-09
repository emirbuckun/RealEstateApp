import { useState, useEffect } from "react";
import { addPrice, editPrice, getPrice } from "/src/services/PriceService";
import { getEstates } from "/src/services/EstateService";
import { getCurrencies } from "/src/services/CurrencyService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Edit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ estateId: 0, currencyId: 0, amount: 0 });
  const [estates, setEstates] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const navigate = useNavigate();
  const navigateUrl = "/prices";
  const operation = id ? "Edit" : "Add";

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
      <h3>{operation} Price</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Estate
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
              <option value={0}>Select Estate</option>
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
            Currency
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
              <option value={0}>Select Currency</option>
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
            Amount
          </Form.Label>
          <Col sm="9">
            <Form.Control
              required
              value={form.amount}
              name="amount"
              type="number"
              placeholder="Amount"
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
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Edit;
