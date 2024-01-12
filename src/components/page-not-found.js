import { Link } from "react-router-dom";
import "./page-not-found.css";

const PageNotFound = () => {
  return (
    <div>
      <div class="page-404">
        <div class="outer bg">
          <div class="middle">
            <div class="inner">
              <div class="inner-circle">
                <i class="fa fa-home"></i>
                <span>404</span>
              </div>
              <span class="inner-status">Oops! You're lost</span>
              <span class="inner-detail">
                We can not find the page you're looking for.
              </span>
              <div className="w-100 d-flex justify-content-center">
                <Link to="/" class="btn btn-info mtl">
                  <i class="fa fa-home"></i>&nbsp; Return home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
