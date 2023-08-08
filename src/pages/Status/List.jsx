import React, { useEffect, useState } from "react";
import { deleteStatus, getStatuses } from "/src/services/StatusService";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const List = () => {
  const navigate = useNavigate();
  const [{ statuses, loading, error }, setState] = useState({
    statuses: [],
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
          setState({ statuses: response.data, loading: false });
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
      <h3>Statuses</h3>

      {!loading ? (
        error ? (
          "An error occurred: " + error
        ) : statuses.length > 0 ? (
          <>
            <Table striped bordered hover>
              <thead className="align-middle">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => navigate("/status/edit/")}
                    >
                      Add
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {statuses.map((status, index) => {
                  const { name, id } = status;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => navigate("/status/edit/" + id)}
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
              </tbody>
            </Table>
          </>
        ) : (
          <p>There is no any status.</p>
        )
      ) : (
        <p>Loading..</p>
      )}
    </>
  );
};

export default List;
