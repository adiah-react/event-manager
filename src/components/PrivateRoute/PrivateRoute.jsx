import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../../hooks/useAuthStatus";
import Spinner from "../ui/Spinner/Spinner";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  if (!loggedIn) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
