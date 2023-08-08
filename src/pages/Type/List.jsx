import React, { useEffect, useState } from "react";
import { deleteType, getTypes } from "/src/services/TypeService";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const [{ types, loading, error }, setState] = useState({
    types: [],
    loading: true,
    error: null,
  });

  const handleDelete = (type) => {
    const { id, name } = type;
    if (window.confirm("Delete the type named " + name + "?")) {
      deleteType(id)
        .then((response) => {
          if (response.status == 204) {
            alert("Delete operation successful!");
            fetchTypes();
          } else alert("Delete operation failed!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error occurred:\n" + error);
        });
    }
  };

  const fetchTypes = () => {
    setState({ error: null, loading: true });
    getTypes()
      .then((response) => {
        if (response.status == 200) {
          setState({ types: response.data, loading: false });
        } else
          setState({
            loading: false,
            error: response.status + ": " + response.data.statusText,
          });
      })
      .catch((error) => setState({ error, loading: false }));
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <>
      <h1>Types</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <button onClick={fetchTypes}>Reload</button>
        <button onClick={() => navigate("/type/edit")}>Add Type</button>
      </div>
      <br />

      <div>
        {!loading ? (
          error ? (
            "An error occurred: " + error
          ) : types.length > 0 ? (
            types.map((type) => {
              const { name, id } = type;
              return (
                <div key={id}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>{name}</p>
                    <div>
                      <button onClick={() => navigate("/type/edit/" + id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete({ id, name })}>
                        Delete
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })
          ) : (
            <p>There is no any type.</p>
          )
        ) : (
          <p>Loading..</p>
        )}
      </div>
    </>
  );
};

export default List;
