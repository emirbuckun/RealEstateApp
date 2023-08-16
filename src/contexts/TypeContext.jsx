import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTypes,
  getType,
  addType,
  editType,
  deleteType,
} from "/src/services/TypeService";

export const TypeContext = createContext();

export const TypeProvider = (props) => {
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localTypes = localStorage.getItem("types");
    if (!localTypes) {
      fetchTypes();
    } else setTypes(JSON.parse(localTypes));
  }, []);

  // FETCH FUNCTIONS
  const fetchTypes = () => {
    console.log("fetch all");
    getTypes()
      .then((response) => {
        if (response.status == 200) {
          setTypes(response.data);
          localStorage.setItem("types", JSON.stringify(response.data));
        } else alert("Error occurred.");
      })
      .catch((error) => alert("Error occurred: " + error));
  };

  const fetchType = ({ id, setName }) => {
    id &&
      getType(id)
        .then((response) => {
          if (response.status == 200) setName(response.data.name);
          else console.log("Error occurred!");
        })
        .catch((error) =>
          console.log("Error occurred while fetching type: " + error)
        );
  };

  // HANDLE EVENT FUNCTIONS
  const handleAddType = ({ name }) => {
    addType({ name })
      .then((response) => {
        if (response.status == 200) {
          alert("Operation successful!");
          fetchTypes();
          navigate("/types");
        } else alert("Operation failed!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  const handleEditType = ({ id, name }) => {
    editType({ id, name })
      .then((response) => {
        if (response.status == 200) {
          alert("Operation successful!");
          fetchTypes();
          navigate("/types");
        } else alert("Operation failed!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  const handleDeleteType = ({ id, name }) => {
    if (window.confirm("Delete the type named " + name + "?")) {
      deleteType(id)
        .then((response) => {
          if (response.status == 204) {
            alert("Operation successful!");
            fetchTypes();
          } else alert("Operation failed!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error occurred:\n" + error);
        });
    }
  };

  return (
    <TypeContext.Provider
      value={{
        types,
        fetchType,
        handleAddType,
        handleEditType,
        handleDeleteType,
      }}
    >
      {props.children}
    </TypeContext.Provider>
  );
};
