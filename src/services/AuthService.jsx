import { postAPI } from "./BaseService";

export const login = async (form) => {
  const url = "/api/Authenticate/login";
  return await postAPI(url, form)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("tokenExpiration", res.data.expiration);
      return res.status;
    })
    .catch((error) => error);
};

export const register = async (form) => {
  const url = "/api/Authenticate/register";
  return await postAPI(url, form)
    .then((res) => res)
    .catch((error) => error);
};

export const validateToken = () => {
  const token = localStorage.getItem("token");
  const tokenExp = localStorage.getItem("tokenExpiration");
  const current = Date.now();
  const parseTokenExp = tokenExp && Date.parse(tokenExp);
  return token && parseTokenExp && parseTokenExp > current;
};
