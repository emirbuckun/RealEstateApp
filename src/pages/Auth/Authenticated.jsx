import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { validateToken } from "/src/services/AuthService";

const Authenticated = () => {
  return validateToken() ? <Outlet /> : <Navigate to="/auth" />;
};

export default Authenticated;
