import { Link, useNavigate } from "react-router-dom";
import { Images } from "../../../assets/assets";
import { FormGroup } from "react-bootstrap";
import { AuthContext } from "../../../contexts/auth-context";
import Loading from "../../../components/loading-screen";
import { useContext, useEffect, useState } from "react";
import { login } from "../../../actions/auth";
import "../auth.css";

const Login = () => {
  const { authState, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const bodyElement = document.querySelector("body");

  useEffect(() => {
    dispatch({ type: "RESET" });
    const currentTheme = localStorage.getItem("theme");
    if (!currentTheme) {
    } else if (currentTheme === "light") {
      bodyElement.classList.remove("dark-mode");
    } else {
      bodyElement.classList.add("dark-mode");
    }
    // eslint-disable-next-line
  }, []);

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const checkEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
    if (value === "") {
      setEmailErr("* please enter your email");
    } else if (!emailRegex.test(value)) {
      setEmailErr("* please enter a valid email");
    } else {
      setEmailErr("");
    }
  };

  const checkPassword = (value) => {
    if (value === "") {
      setPassErr("* please create a password");
    } else if (value.length < 8) {
      setPassErr("* password length must be 8 characters");
    } else if (!/^[^ ]*$/g.test(value)) {
      setPassErr("* empty spaces are not allowed");
    } else {
      setPassErr("");
    }
  };

  const handleSubmit = async () => {
    const { email, password } = user;
    if (email === "" || password === "" || emailErr !== "" || passErr !== "") {
      checkEmail(email);
      checkPassword(password);
    } else {
      setEmailErr("");
      setPassErr("");
      setLoading(true);
      await login(user, dispatch);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/user/dashboard");
    }
     // eslint-disable-next-line
  }, [authState.isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {!authState.message ? null : (
            <div
              className={`${
                authState.isAuthenticated && authState.message
                  ? "bg-success"
                  : "bg-danger"
              } text-center text-white fw-bold msg-h`}
            >
              <div>{authState.message}</div>
            </div>
          )}
          <div className="auth-outer d-flex justify-content-center align-items-center flex-column">
            <div className="logo-holder d-flex justify-content-center mb-3 mb-md-5">
              <strong className="d-inline-block align-top">
                <img
                  className="img-fluid logo-light"
                  src={Images.siteLogoLight}
                  alt="Site Logo"
                />
                <img
                  className="img-fluid logo-dark"
                  src={Images.siteLogoDark}
                  alt="Site Logo"
                />
              </strong>
            </div>
            <div className="auth-block text-center">
              <h2>Login</h2>
              <form className="auth-form login-form" action="/">
                <FormGroup className="mb-3">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={user.email}
                    onChange={(e) => {
                      checkEmail(e.target.value);
                      handleUser(e);
                    }}
                  />
                  {emailErr ? (
                    <div className="error-text text-start mt-2">{emailErr}</div>
                  ) : (
                    ""
                  )}
                </FormGroup>
                <FormGroup className="mb-3">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={user.password}
                    onChange={(e) => {
                      checkPassword(e.target.value);
                      handleUser(e);
                    }}
                  />
                  {passErr ? (
                    <div className="error-text text-start mt-2">{passErr}</div>
                  ) : (
                    ""
                  )}
                </FormGroup>
                <FormGroup className="mb-3">
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-solid transition"
                  >
                    Log in
                  </button>
                </FormGroup>
                <div className="d-flex justify-content-center">
                  <p>
                    Don't have account?{" "}
                    <Link className="theme-link" to="/register">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
