import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStatuses,
  getStatus,
  addStatus,
  editStatus,
  deleteStatus,
} from "/src/services/StatusService";

export const StatusContext = createContext();

export const StatusProvider = (props) => {
  const [statuses, setStatuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localStatuses = localStorage.getItem("statuses");
    if (!localStatuses) {
      fetchStatuses();
    } else setStatuses(JSON.parse(localStatuses));
  }, []);

  // FETCH FUNCTIONS
  const fetchStatuses = () => {
    console.log("fetch all");
    getStatuses()
      .then((response) => {
        if (response.status == 200) {
          setStatuses(response.data);
          localStorage.setItem("statuses", JSON.stringify(response.data));
        } else alert("Error occurred.");
      })
      .catch((error) => alert("Error occurred: " + error));
  };

  const fetchStatus = ({ id, setName }) => {
    id &&
      getStatus(id)
        .then((response) => {
          if (response.status == 200) setName(response.data.name);
          else console.log("Error occurred!");
        })
        .catch((error) =>
          console.log("Error occurred while fetching status: " + error)
        );
  };

  // HANDLE EVENT FUNCTIONS
  const handleAddStatus = ({ name }) => {
    addStatus({ name })
      .then((response) => {
        if (response.status == 200) {
          alert("Operation successful!");
          fetchStatuses();
          navigate("/statuses");
        } else alert("Operation failed!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  const handleEditStatus = ({ id, name }) => {
    editStatus({ id, name })
      .then((response) => {
        if (response.status == 200) {
          alert("Operation successful!");
          fetchStatuses();
          navigate("/statuses");
        } else alert("Operation failed!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  const handleDeleteStatus = ({ id, name }) => {
    if (window.confirm("Delete the status named " + name + "?")) {
      deleteStatus(id)
        .then((response) => {
          if (response.status == 204) {
            alert("Operation successful!");
            fetchStatuses();
          } else alert("Operation failed!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error occurred:\n" + error);
        });
    }
  };

  return (
    <StatusContext.Provider
      value={{
        statuses,
        fetchStatus,
        handleAddStatus,
        handleEditStatus,
        handleDeleteStatus,
      }}
    >
      {props.children}
    </StatusContext.Provider>
  );
};
