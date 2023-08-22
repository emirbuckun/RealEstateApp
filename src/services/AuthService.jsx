import { postAPI } from "./BaseService";

export const login = async (form) => {
  const url = "/Auth/login";
  return await postAPI(url, form)
    .then((res) => {
      const token = res.data.token;
      const expiration = res.data.expiration;

      // Set token and expiration date
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiration", expiration);

      // Decode token
      const tokenData = token.split(".")[1];
      const decodedTokenJsonData = window.atob(tokenData);
      const decodedTokenData = JSON.parse(decodedTokenJsonData);

      // Set username
      const username = decodedTokenData.username;
      localStorage.setItem("username", username);

      // Set is admin value
      const roles = decodedTokenData.roles;
      const roleValues = Object.values(roles);
      const isAdmin = roleValues.includes("Admin");
      localStorage.setItem("isAdmin", isAdmin);

      return res.status;
    })
    .catch((error) => error);
};

export const register = async (form) => {
  const url = "/Auth/register";
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

export const validateAdmin = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  return (
    validateToken() &&
    isAdmin != null &&
    isAdmin != "" &&
    JSON.parse(isAdmin) == true
  );
};

export const getUsername = () => {
  return validateToken() ? localStorage.getItem("username") : "";
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiration");
  localStorage.removeItem("username");
  localStorage.removeItem("isAdmin");
  return;
};
