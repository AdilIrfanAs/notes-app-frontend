import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth-context";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("dashboard");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return <div>{authState.isAuthenticated ? <Outlet /> : null}</div>;
};

export default PrivateRoute;
