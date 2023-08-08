import { getAPI, postAPI, putAPI, deleteAPI } from "./BaseService";

export const getTypes = async () => {
  const url = "/EstateType/list";
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const getType = async (id) => {
  const url = "/EstateType?id=" + id;
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const addType = async (data) => {
  const url = "/EstateType";
  return await postAPI(url, data)
    .then((res) => res)
    .catch((error) => error);
};

export const editType = async (data) => {
  const url = "/EstateType";
  return await putAPI(url, data)
    .then((res) => res)
    .catch((error) => error);
};

export const deleteType = async (id) => {
  const url = "/EstateType?id=" + id;
  return await deleteAPI(url)
    .then((res) => res)
    .catch((error) => error);
};
