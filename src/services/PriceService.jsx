import { getAPI, postAPI, putAPI, deleteAPI } from "./BaseService";

export const getPrices = async () => {
  const url = "/Price/list";
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const getPrice = async (id) => {
  const url = "/Price?id=" + id;
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const addPrice = async (data) => {
  const url = "/Price";
  return await postAPI(url, data)
    .then((res) => res)
    .catch((error) => error);
};

export const editPrice = async (data) => {
  const url = "/Price";
  return await putAPI(url, data)
    .then((res) => res)
    .catch((error) => error);
};

export const deletePrice = async (id) => {
  const url = "/Price?id=" + id;
  return await deleteAPI(url)
    .then((res) => res)
    .catch((error) => error);
};
