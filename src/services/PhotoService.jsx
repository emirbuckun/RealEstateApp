import { getAPI, postAPI, deleteAPI } from "./BaseService";

export const getPhotos = async () => {
  const url = "/Photo/list";
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const addPhoto = async (data) => {
  const url = "/Photo";
  const headers = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return await postAPI(url, data, headers)
    .then((res) => res)
    .catch((error) => error);
};

export const addMultiplePhoto = async (data) => {
  const url = "/Photo/multiple";
  const headers = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return await postAPI(url, data, headers)
    .then((res) => res)
    .catch((error) => error);
};

export const deletePhoto = async (id) => {
  const url = "/Photo?id=" + id;
  return await deleteAPI(url)
    .then((res) => res)
    .catch((error) => error);
};
