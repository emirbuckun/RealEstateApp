import { getAPI, postAPI, putAPI, deleteAPI } from "./BaseService";

export const getCurrencies = async () => {
  const url = "/Currency/list";
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const getCurrency = async (id) => {
  const url = "/Currency?id=" + id;
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const addCurrency = async (data) => {
  const url = "/Currency";
  return await postAPI(url, data)
    .then((res) => res)
    .catch((error) => error);
};

export const editCurrency = async (data) => {
  const url = "/Currency";
  return await putAPI(url, data)
    .then((res) => res)
    .catch((error) => error);
};

export const deleteCurrency = async (id) => {
  const url = "/Currency?id=" + id;
  return await deleteAPI(url)
    .then((res) => res)
    .catch((error) => error);
};
