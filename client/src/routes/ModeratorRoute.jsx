import PropTypes from "prop-types";
import useUser from "../hooks/useUser";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [userInfo, isLoading] = useUser();
  const location = useLocation();

  if (loading || isLoading) {
    return (
      <div className="text-center my-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (user && userInfo.role === "moderator") {
    return children;
  }
  return (
    <Navigate to="/dashboard/profile" state={{ from: location }}></Navigate>
  );
};

ModeratorRoute.propTypes = {
  children: PropTypes.element,
};

export default ModeratorRoute;
