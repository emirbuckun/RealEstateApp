import { getAPI, postAPI, deleteAPI } from "./BaseService";

export const getPhotos = async () => {
  const url = "/Photo/list";
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const getPhoto = async (id) => {
  const url = "/Photo?id=" + id;
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const getPhotoByEstate = async (id) => {
  const url = "/Photo/byEstate?id=" + id;
  return await getAPI(url)
    .then((res) => res)
    .catch((error) => error);
};

export const addPhoto = async (data) => {
  const url = "/Photo";
  return await postAPI(url, data)
    .then((res) => res)
    .catch((error) => error);
};

export const deletePhoto = async (id) => {
  const url = "/Photo?id=" + id;
  return await deleteAPI(url)
    .then((res) => res)
    .catch((error) => error);
};
