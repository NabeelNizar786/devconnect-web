import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router";
import { store } from "../utils/appStore";

const PublicRoute = () => {
  const { user, authChecked } = useSelector((state) => state.user);

  if (!authChecked) return null;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
