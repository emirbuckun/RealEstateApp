import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPrices,
  getPrice,
  addPrice,
  editPrice,
  deletePrice,
} from "/src/services/PriceService";

export const PriceContext = createContext();

export const PriceProvider = (props) => {
  const [prices, setPrices] = useState([]);
  const navigate = useNavigate();

  // FETCH FUNCTIONS
  const fetchPrices = () => {
    getPrices()
      .then((response) => {
        if (response.status == 200) setPrices(response.data);
        else alert("Error occurred.");
      })
      .catch((error) => alert("Error occurred: " + error));
  };

  const fetchPrice = ({ id, setForm }) => {
    id &&
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

  // HANDLE EVENT FUNCTIONS
  const handleAddPrice = ({ estateId, currencyId, amount }) => {
    addPrice({ estateId, currencyId, amount })
      .then((response) => {
        if (response.status == 200) {
          alert("Operation successful!");
          fetchPrices();
          navigate("/prices");
        } else alert("Operation failed!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  const handleEditPrice = ({ id, estateId, currencyId, amount }) => {
    editPrice({ id, estateId, currencyId, amount })
      .then((response) => {
        if (response.status == 200) {
          alert("Operation successful!");
          fetchPrices();
          navigate("/prices");
        } else alert("Operation failed!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  const handleDeletePrice = ({ id }) => {
    deletePrice(id)
      .then((response) => {
        if (response.status == 204) {
          alert("Operation successful!");
          fetchPrices();
        } else alert("Operation failed!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  return (
    <PriceContext.Provider
      value={{
        prices,
        fetchPrice,
        fetchPrices,
        handleAddPrice,
        handleEditPrice,
        handleDeletePrice,
      }}
    >
      {props.children}
    </PriceContext.Provider>
  );
};
