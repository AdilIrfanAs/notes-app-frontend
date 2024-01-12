import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Images } from "../../assets/assets";
import { Container } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faPowerOff, faSun } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/auth-context";
import { logout } from "../../actions/auth";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(false);
  const { authState, dispatch } = useContext(AuthContext);
  const bodyElement = document.querySelector("body");

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (!currentTheme) {
      setTheme(false);
    } else if (currentTheme === "light") {
      bodyElement.classList.remove("dark-mode");
      setTheme(false);
    } else {
      bodyElement.classList.add("dark-mode");
      setTheme(true);
    }
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    logout(dispatch);
    navigate("/");
  };

  const toggleClass = () => {
    setTheme(!theme);
    if (theme) {
      bodyElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    } else {
      bodyElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <header id="header" className="d-flex justify-content-between">
      <Container fluid>
        <div className="d-flex justify-content-between">
          <strong className="logo d-inline-block align-top">
            <Link to="/dashboard" className="inline-block align-top">
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
            </Link>
          </strong>
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center me-2">
              <span
                className="loggeduser-name"
                data-tooltip-id="my-tooltip"
                data-tooltip-content={authState.user.name}
              >
                {authState.user.name}
              </span>
              <Link
                className="btn-logout d-flex justify-content-center align-items-center transition ms-2"
                to="/"
                onClick={() => handleLogout()}
              >
                <FontAwesomeIcon icon={faPowerOff} />
              </Link>
            </div>
            <span
              className={`mode-switcher cursor-pointer transition d-flex justify-content-center align-items-center`}
              onClick={toggleClass}
            >
              <FontAwesomeIcon className="light-icon" icon={faSun} />
              <FontAwesomeIcon className="dark-icon" icon={faMoon} />
            </span>
          </div>
          <Tooltip id="my-tooltip" />
        </div>
      </Container>
    </header>
  );
};
export default Header;
