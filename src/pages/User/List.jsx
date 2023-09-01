import { UserContext } from "/src/contexts/UserContext";
import { Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

const List = () => {
  const { users, fetchUsers, handleDeleteUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = ({ id, userName }) => {
    window.confirm("Delete the user named " + userName + "?") &&
      handleDeleteUser({ id });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h3>{t("users")}</h3>

      <Table size="sm" striped bordered hover responsive>
        <thead className="align-middle">
          <tr>
            <th>#</th>
            <th>{t("username")}</th>
            <th>{t("email")}</th>
            <th style={{ width: "120px" }}>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => navigate("/user/edit/")}
              >
                {t("add")}
              </Button>
            </th>
          </tr>
        </thead>

        <tbody className="align-middle">
          {users &&
            users.map((user, index) => {
              const { id, userName, email } = user;
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{userName}</td>
                  <td>{email}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate("/user/edit/" + id)}
                    >
                      {t("edit")}
                    </Button>{" "}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete({ id, userName })}
                    >
                      {t("delete")}
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default List;
