import { getAPI, postAPI, putAPI, deleteAPI } from "./BaseService";

export const getUsers = async () => {
  const url = "/User/list";
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const getUser = async (id) => {
  const url = "/User?id=" + id;
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const addUser = async (data) => {
  const url = "/User";
  return await postAPI(url, data)
    .then((res) => res)
    .catch((error) => error);
};

export const editUser = async (data) => {
  const url = "/User";
  return await putAPI(url, data)
    .then((res) => res)
    .catch((error) => error);
};

export const deleteUser = async (id) => {
  const url = "/User?id=" + id;
  return await deleteAPI(url)
    .then((res) => res)
    .catch((error) => error);
};
