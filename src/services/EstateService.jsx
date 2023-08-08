import { getAPI, postAPI, putAPI, deleteAPI } from "./BaseService";

export const getEstates = async () => {
  const url = "/Estate/list";
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const getEstate = async (id) => {
  const url = "/Estate?id=" + id;
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const addEstate = async (data) => {
  const url = "/Estate";
  return await postAPI(url, data)
    .then((res) => res)
    .catch((error) => error);
};

export const editEstate = async (data) => {
  const url = "/Estate";
  return await putAPI(url, data)
    .then((res) => res)
    .catch((error) => error);
};

export const deleteEstate = async (id) => {
  const url = "/Estate?id=" + id;
  return await deleteAPI(url)
    .then((res) => res)
    .catch((error) => error);
};
