import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,
} from "/src/services/UserService";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // FETCH FUNCTIONS
  const fetchUsers = () => {
    getUsers()
      .then((response) => {
        if (response.status == 200) setUsers(response.data);
        else alert("Error occurred.");
      })
      .catch((error) => alert("Error occurred: " + error));
  };

  const fetchUser = ({ id, setForm }) => {
    id &&
      getUser(id)
        .then((response) => {
          if (response.status == 200) {
            const { userName, email } = response.data;
            setForm({ username: userName, email, password: "" });
          } else console.log("Error occurred!");
        })
        .catch((error) =>
          console.log("Error occurred while fetching user: " + error)
        );
  };

  // HANDLE EVENT FUNCTIONS
  const handleAddUser = (form) => {
    addUser(form)
      .then((response) => {
        if (response.status == 200) {
          alert("Operation successfull");
          fetchUsers();
          navigate("/users");
        } else alert(response.data.data.message);
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  const handleEditUser = (form) => {
    editUser(form)
      .then((response) => {
        if (response.status == 200) {
          alert("Operation successfull");
          fetchUsers();
          navigate("/users");
        } else alert(response.data.data.message);
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  const handleDeleteUser = ({ id }) => {
    deleteUser(id)
      .then((response) => {
        if (response.status == 200) {
          alert("Operation successfull");
          fetchUsers();
        } else alert(response.data.data.message);
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred:\n" + error);
      });
  };

  return (
    <UserContext.Provider
      value={{
        users,
        fetchUser,
        fetchUsers,
        handleAddUser,
        handleEditUser,
        handleDeleteUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
