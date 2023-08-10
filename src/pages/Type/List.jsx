import React, { useEffect, useState } from "react";
import { deleteType, getTypes } from "/src/services/TypeService";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const List = () => {
  const navigate = useNavigate();
  const [{ types, loading, error }, setState] = useState({
    types: [],
    loading: true,
    error: null,
  });

  const handleDelete = ({ id, name }) => {
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
      <h3>Types</h3>

      <Table striped bordered hover>
        <thead className="align-middle">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => navigate("/type/edit/")}
              >
                Add
              </Button>
            </th>
          </tr>
        </thead>

        <tbody className="align-middle">
          {!loading ? (
            error ? (
              <tr>
                <td colSpan={9}>An error occured: {error}.</td>
              </tr>
            ) : types.length > 0 ? (
              <>
                {types.map((type, index) => {
                  const { name, id } = type;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => navigate("/type/edit/" + id)}
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
                <td colSpan={3}>There is no any type.</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={3}>Loading..</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default List;
