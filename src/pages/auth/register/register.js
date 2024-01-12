import { Link } from "react-router-dom";
import { Images } from "../../../assets/assets";
import { FormGroup } from "react-bootstrap";
import { useState } from "react";
import { register } from "../../../actions/auth";
import Loading from "../../../components/loading-screen";
import "../auth.css";

const Register = () => {
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [conPassErr, setConPassErr] = useState("");
  const [termsErr, setTermsErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    success: "",
    message: "",
  });
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    conPassword: "",
    terms: false,
  });

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const checkName = (value) => {
    if (value.length <= 3) {
      setNameErr("* please enter full name");
    } else if (!/^[A-Za-z][A-Za-z\s]*[A-Za-z]$/g.test(value)) {
      setNameErr("* please enter a valid name");
    } else {
      setNameErr("");
    }
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
      setPassErr("* length must be 8 or more characters");
    } else if (!/^[^ ]*$/g.test(value)) {
      setPassErr("* no empty spaces");
    } else {
      setPassErr("");
    }
  };

  const checkConPass = (value) => {
    if (value === "") {
      setConPassErr("* please confirm your password");
    } else if (value.length < 8) {
      setConPassErr("* length must be 8 or more characters");
    } else if (!/^[^ ]*$/g.test(value)) {
      setPassErr("* empty spaces are not allowed");
    } else if (user.password !== value) {
      setConPassErr("* passwords does not match");
    } else {
      setConPassErr("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, conPassword, terms } = user;
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      conPassword === "" ||
      terms === false ||
      nameErr !== "" ||
      emailErr !== "" ||
      passErr !== "" ||
      conPassErr !== "" ||
      termsErr !== ""
    ) {
      if (name === "") {
        checkName(name);
      }
      if (email === "") {
        checkEmail(email);
      }
      if (password === "") {
        checkPassword(password);
      }
      if (conPassword === "") {
        checkConPass(conPassword);
      }
      if (terms === false) {
        setTermsErr("* please accept terms and conditions");
      }
    } else {
      setNameErr("");
      setEmailErr("");
      setPassErr("");
      setConPassErr("");
      setTermsErr("");
      setLoading(true);
      await register(user, setResult);
      setLoading(false);
      setUser({
        name: "",
        email: "",
        password: "",
        conPassword: "",
        terms: false,
      });
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {result.message === "" ? null : (
            <div
              className={`${
                result.success === true ? "bg-success" : "bg-danger"
              } text-center text-white fw-bold msg-h`}
            >
              <div>
                {result.message}
                {result.success === true ? " go to login" : ""}
              </div>
              {result.success === true ? (
                <Link className="text-white bg-danger fs-6 mx-2 px-2" to="/">
                  Login
                </Link>
              ) : null}
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
              <h2>Register</h2>
              <form className="auth-form login-form" action="/">
                <FormGroup className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    name="name"
                    vale={user.value}
                    onChange={(e) => {
                      checkName(e.target.value);
                      handleUser(e);
                    }}
                  />
                  {nameErr ? (
                    <div className="error-text text-start">{nameErr}</div>
                  ) : (
                    ""
                  )}
                </FormGroup>
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
                    <div className="error-text text-start">{emailErr}</div>
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
                    <div className="error-text text-start">{passErr}</div>
                  ) : (
                    ""
                  )}
                </FormGroup>
                <FormGroup className="mb-3">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Confirm Password"
                    name="conPassword"
                    value={user.conPassword}
                    onChange={(e) => {
                      checkConPass(e.target.value);
                      handleUser(e);
                    }}
                  />
                  {conPassErr ? (
                    <div className="error-text text-start">{conPassErr}</div>
                  ) : (
                    ""
                  )}
                </FormGroup>
                <FormGroup className="mb-3">
                  <label class="right-label-checkbox">
                    I Agree with Terms &amp; Conditions
                    <input
                      type="checkbox"
                      name="terms"
                      value={user.terms}
                      onChange={(e) => {
                        if (e.target.checked === true) {
                          setTermsErr("");
                          setUser({
                            ...user,
                            terms: !user.terms,
                          });
                        } else {
                          setTermsErr("* please accept terms and conditions");
                        }
                      }}
                    />
                    <span class="checkmark"></span>
                  </label>
                  {termsErr ? (
                    <div className="error-text text-start">{termsErr}</div>
                  ) : (
                    ""
                  )}
                </FormGroup>
                <FormGroup className="mb-3">
                  <button
                    type="button"
                    className="btn btn-solid transition"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Register
                  </button>
                </FormGroup>
                <div className="d-flex justify-content-center">
                  <p>
                    Already have account?{" "}
                    <Link className="theme-link" to="/">
                      Login
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

export default Register;
