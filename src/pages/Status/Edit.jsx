import { useState, useEffect } from "react";
import { addType, editType, getType } from "/src/services/TypeService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const navigateUrl = "/types";
  const operation = id ? "Edit" : "Add";

  const handleSubmit = () => {
    if (id) {
      editType({ id: id, name: name })
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
      addType({ name: name })
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

  const fetchType = () => {
    getType(id)
      .then((response) => {
        if (response.status == 200) {
          setName(response.data.name);
        } else console.log("Error occurred!");
      })
      .catch((error) =>
        console.log("Error occurred while fetching type: " + error)
      );
  };

  useEffect(() => {
    id && fetchType();
  }, []);

  return (
    <>
      <h1>{operation} Type</h1>
      <div>
        <label name="name">Type Name</label>&nbsp;
        <input
          value={name}
          type="text"
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
