import React, { useEffect, useState } from "react";
import { deleteCurrency, getCurrencies } from "/src/services/CurrencyService";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const List = () => {
  const navigate = useNavigate();
  const [{ currencies, loading, error }, setState] = useState({
    currencies: [],
    loading: true,
    error: null,
  });

  const handleDelete = ({ id, name }) => {
    if (window.confirm("Delete the currency named " + name + "?")) {
      deleteCurrency(id)
        .then((response) => {
          if (response.status == 204) {
            alert("Delete operation successful!");
            fetchCurrencies();
          } else alert("Delete operation failed!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error occurred:\n" + error);
        });
    }
  };

  const fetchCurrencies = () => {
    setState({ error: null, loading: true });
    getCurrencies()
      .then((response) => {
        if (response.status == 200) {
          setState({ currencies: response.data, loading: false });
        } else
          setState({
            loading: false,
            error: response.status + ": " + response.data.statusText,
          });
      })
      .catch((error) => setState({ error, loading: false }));
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <>
      <h3>Currencies</h3>

      <Table striped bordered hover>
        <thead className="align-middle">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Code</th>
            <th>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => navigate("/currency/edit/")}
              >
                Add
              </Button>
            </th>
          </tr>
        </thead>

        <tbody className="align-middle">
          {!loading ? (
            error ? (
              "An error occurred: " + error
            ) : currencies.length > 0 ? (
              <>
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
                          Edit
                        </Button>{" "}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete({ id, name })}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <tr>
                <td colSpan={4}>There is no any currency.</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={4}>Loading..</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default List;
