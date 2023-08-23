import { deleteEstate, getPagingEstates } from "/src/services/EstateService";
import { Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "/src/components/Pagination";
import Filter from "/src/components/Filter";

const List = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [{ estates, loading, error }, setState] = useState({
    estates: [],
    loading: true,
    error: null,
  });
  const [paging, setPaging] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [filter, setFilter] = useState({
    typeId: 0,
    statusId: 0,
    startDate: null,
    endDate: null,
  });

  const { currentPage, totalPages } = paging;
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
            error: t("noDataWithFilter"),
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
  }, [currentPage]);

  return (
    <>
      <h3>{t("estates")}</h3>

      <Filter setFilter={setFilter} fetchEstates={fetchEstates} />

      <Table size="sm" striped bordered hover responsive>
        <thead className="align-middle">
          <tr>
            <th>#</th>
            <th>{t("photo")}</th>
            <th>{t("name")}</th>
            <th>{t("type")}</th>
            <th>{t("status")}</th>
            <th>{t("startDate")}</th>
            <th>{t("endDate")}</th>
            <th>{t("price")}</th>
            <th style={{ width: "120px" }}>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => navigate("/estate/edit/")}
              >
                {t("add")}
              </Button>
            </th>
          </tr>
        </thead>

        <tbody className="align-middle">
          {!loading ? (
            error ? (
              <tr>
                <td colSpan={9}>
                  {t("errorOccurred")} {error}.
                </td>
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
                          {t("edit")}
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
                          {t("delete")}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <tr>
                <td colSpan={9}>{t("thereIsNo")}</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={9}>{t("loading")}</td>
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
