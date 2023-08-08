import { getAPI, postAPI, putAPI, deleteAPI } from "./BaseService";

export const getStatuss = async () => {
  const url = "/EstateStatus/list";
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const getStatus = async (id) => {
  const url = "/EstateStatus?id=" + id;
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const addStatus = async (data) => {
  const url = "/EstateStatus";
  return await postAPI(url, data)
    .then((res) => res)
    .catch((error) => error);
};

export const editStatus = async (data) => {
  const url = "/EstateStatus";
  return await putAPI(url, data)
    .then((res) => res)
    .catch((error) => error);
};

export const deleteStatus = async (id) => {
  const url = "/EstateStatus?id=" + id;
  return await deleteAPI(url)
    .then((res) => res)
    .catch((error) => error);
};
