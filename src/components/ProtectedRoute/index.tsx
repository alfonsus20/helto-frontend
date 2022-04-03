import { Navigate, Outlet } from "react-router-dom";

import { useUserContext } from "../../context/UserContext";
import usePrevious from "../../hooks/usePrevious";
import useSnackbar from "../../hooks/useSnackbar";

const ProtectedRoute = () => {
  const { isAuthenticated } = useUserContext();
  const prevAuthenticated = usePrevious(isAuthenticated);
  const snackbar = useSnackbar();

  if (isAuthenticated) {
    return <Outlet />;
  }

  if (!prevAuthenticated) {
    snackbar.error("Login terlebih dahulu");
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
