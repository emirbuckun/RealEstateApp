import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrencies,
  getCurrency,
  addCurrency,
  editCurrency,
  deleteCurrency,
} from "/src/services/CurrencyService";

export const CurrencyContext = createContext();

export const CurrencyProvider = (props) => {
  const [currencies, setCurrencies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localCurrencies = localStorage.getItem("currencies");
    if (!localCurrencies) fetchCurrencies();
    else setCurrencies(JSON.parse(localCurrencies));
  }, []);

  // FETCH FUNCTIONS
  const fetchCurrencies = () => {
    getCurrencies()
      .then((response) => {
        if (response.status == 200) {
          setCurrencies(response.data);
          localStorage.setItem("currencies", JSON.stringify(response.data));
        } else alert("Error occurred.");
      })
      .catch((error) => alert("Error occurred: " + error));
  };

  const fetchCurrency = ({ id, setForm }) => {
    id &&
      getCurrency(id)
        .then((response) => {
          if (response.status == 200) {
            const { name, code } = response.data;
            setForm({ name, code });
          } else console.log("Error occurred!");
        })
        .catch((error) =>
          console.log("Error occurred while fetching currency: " + error)
        );
  };

  // HANDLE EVENT FUNCTIONS
  const handleAddCurrency = ({ name, code }) => {
    addCurrency({ name, code })
      .then((response) => {
        if (response.status == 200) {
          alert("Operation successful!");
          fetchCurrencies();
          navigate("/currencies");
        } else alert("Operation failed!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  const handleEditCurrency = ({ id, name, code }) => {
    editCurrency({ id, name, code })
      .then((response) => {
        if (response.status == 200) {
          alert("Operation successful!");
          fetchCurrencies();
          navigate("/currencies");
        } else alert("Operation failed!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  const handleDeleteCurrency = ({ id }) => {
    deleteCurrency(id)
      .then((response) => {
        if (response.status == 204) {
          alert("Operation successful!");
          fetchCurrencies();
        } else alert("Operation failed!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  return (
    <CurrencyContext.Provider
      value={{
        currencies,
        fetchCurrency,
        handleAddCurrency,
        handleEditCurrency,
        handleDeleteCurrency,
      }}
    >
      {props.children}
    </CurrencyContext.Provider>
  );
};
