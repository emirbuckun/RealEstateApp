import { Navigate, Outlet } from "react-router-dom";
import { validateAdmin } from "/src/services/AuthService";

const Admin = () => {
  return validateAdmin() ? <Outlet /> : <Navigate to="/" />;
};

export default Admin;
