import React, { useEffect, useState } from "react";
import { deleteEstate, getPagingEstates } from "/src/services/EstateService";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Filter from "./Filter";

const List = () => {
  const navigate = useNavigate();
  const [{ estates, loading, error }, setState] = useState({
    estates: [],
    loading: true,
    error: null,
  });
  const [paging, setPaging] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const { currentPage, totalPages } = paging;
  const [filter, setFilter] = useState({
    typeId: 0,
    statusId: 0,
    startDate: null,
    endDate: null,
  });
  const { typeId, statusId, startDate, endDate } = filter;

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
    var query = { pageNumber: currentPage, typeId, statusId };
    if (startDate != null) query.startDate = startDate;
    if (endDate != null) query.endDate = endDate;

    getPagingEstates({ query })
      .then((response) => {
        if (response.status == 200) {
          const pagingHeader = JSON.parse(response.headers["x-pagination"]);
          setPaging(pagingHeader);
          setState({ estates: response.data, loading: false });
        } else if (response.status == 404) {
          setState({
            loading: false,
            error: "There is no any data with the given filter.",
          });
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
  }, [currentPage, filter]);

  return (
    <>
      <h3>Estates</h3>

      <Filter setFilter={setFilter} />

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
              <tr>
                <td colSpan={9}>An error occured: {error}.</td>
              </tr>
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
      <Pagination
        currentPage={currentPage}
        pagesCount={totalPages}
        setCurrentPage={(number) =>
          setPaging({ ...paging, currentPage: number })
        }
        alwaysShown={true}
      />
    </>
  );
};

export default List;
