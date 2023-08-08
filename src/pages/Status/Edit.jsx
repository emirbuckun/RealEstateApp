import { useState, useEffect } from "react";
import { addStatus, editStatus, getStatus } from "/src/services/StatusService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const navigateUrl = "/statuses";
  const operation = id ? "Edit" : "Add";

  const handleSubmit = () => {
    if (id) {
      editStatus({ id: id, name: name })
        .then((response) => {
          if (response.status == 200) {
            alert("Edit operation successful!");
            navigate(navigateUrl);
          } else alert("Edit operation failed!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error occurred:\n" + error);
        });
    } else {
      addStatus({ name: name })
        .then((response) => {
          if (response.status == 200) {
            alert("Add operation successful!");
            navigate(navigateUrl);
          } else alert("Add operation failed!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error occurred:\n" + error);
        });
    }
  };

  const fetchStatus = () => {
    getStatus(id)
      .then((response) => {
        if (response.status == 200) {
          setName(response.data.name);
        } else console.log("Error occurred!");
      })
      .catch((error) =>
        console.log("Error occurred while fetching status: " + error)
      );
  };

  useEffect(() => {
    id && fetchStatus();
  }, []);

  return (
    <>
      <h1>{operation} Status</h1>
      <div>
        <label name="name">Status Name</label>&nbsp;
        <input
          value={name}
          status="text"
          name="name"
          id="txtName"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <button onClick={handleSubmit}>{operation}</button>
      </div>
    </>
  );
};

export default Edit;
