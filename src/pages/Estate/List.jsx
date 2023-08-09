import React, { useEffect, useState } from "react";
import { deleteEstate, getEstates } from "/src/services/EstateService";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const List = () => {
  const navigate = useNavigate();
  const [{ estates, loading, error }, setState] = useState({
    estates: [],
    loading: true,
    error: null,
  });

  const handleDelete = ({ id, name }) => {
    if (window.confirm(`Delete the estate named ${name}?`)) {
      deleteEstate(id)
        .then((response) => {
          if (response.status == 204) {
            alert("Delete operation successful!");
            fetchEstates();
          } else alert("Delete operation failed!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error occurred:\n" + error);
        });
    }
  };

  const fetchEstates = () => {
    setState({ error: null, loading: true });
    getEstates()
      .then((response) => {
        if (response.status == 200) {
          setState({ estates: response.data, loading: false });
        } else
          setState({
            loading: false,
            error: response.status + ": " + response.data.statusText,
          });
      })
      .catch((error) => setState({ error, loading: false }));
  };

  useEffect(() => {
    fetchEstates();
  }, []);

  return (
    <>
      <h3>Estates</h3>

      <Table striped bordered hover>
        <thead className="align-middle">
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Price</th>
            <th>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => navigate("/estate/edit/")}
              >
                Add
              </Button>
            </th>
          </tr>
        </thead>

        <tbody className="align-middle">
          {!loading ? (
            error ? (
              "An error occurred: " + error
            ) : estates.length > 0 ? (
              <>
                {estates.map((estate, index) => {
                  const {
                    id,
                    name,
                    estateType,
                    estateStatus,
                    startDate,
                    endDate,
                    photo,
                    price,
                  } = estate;
                  if (photo) {
                    var { fileExtension, bytes } = photo;
                    var extension = fileExtension?.replace(".", "");
                    var imgSrc = `data:image/${extension};base64,${bytes}`;
                  }
                  if (price) {
                    var { amount, currencyCode } = price;
                    var displayPrice = amount + " " + currencyCode;
                  }
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          style={{ width: "5rem" }}
                          src={imgSrc ?? null}
                        ></img>
                      </td>
                      <td>{name}</td>
                      <td>{estateType}</td>
                      <td>{estateStatus}</td>
                      <td>{new Date(startDate).toLocaleDateString()}</td>
                      <td>{new Date(endDate).toLocaleDateString()}</td>
                      <td>{displayPrice}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => navigate("/estate/edit/" + id)}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() =>
                            handleDelete({
                              id,
                              name,
                            })
                          }
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
                <td colSpan={9}>There is no any estate.</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={9}>Loading..</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default List;
