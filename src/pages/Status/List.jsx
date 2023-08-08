import React, { useEffect, useState } from "react";
import { deleteStatus, getStatuses } from "/src/services/StatusService";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const [{ statuss, loading, error }, setState] = useState({
    statuss: [],
    loading: true,
    error: null,
  });

  const handleDelete = (status) => {
    const { id, name } = status;
    if (window.confirm("Delete the status named " + name + "?")) {
      deleteStatus(id)
        .then((response) => {
          if (response.status == 204) {
            alert("Delete operation successful!");
            fetchStatuses();
          } else alert("Delete operation failed!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error occurred:\n" + error);
        });
    }
  };

  const fetchStatuses = () => {
    setState({ error: null, loading: true });
    getStatuses()
      .then((response) => {
        if (response.status == 200) {
          setState({ statuss: response.data, loading: false });
        } else
          setState({
            loading: false,
            error: response.status + ": " + response.data.statusText,
          });
      })
      .catch((error) => setState({ error, loading: false }));
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  return (
    <>
      <h1>Statuses</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <button onClick={fetchStatuses}>Reload</button>
        <button onClick={() => navigate("/status/edit")}>Add Status</button>
      </div>
      <br />

      <div>
        {!loading ? (
          error ? (
            "An error occurred: " + error
          ) : statuss.length > 0 ? (
            statuss.map((status) => {
              const { name, id } = status;
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
                      <button onClick={() => navigate("/status/edit/" + id)}>
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
            <p>There is no any status.</p>
          )
        ) : (
          <p>Loading..</p>
        )}
      </div>
    </>
  );
};

export default List;
