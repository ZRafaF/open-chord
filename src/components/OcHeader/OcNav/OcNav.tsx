"use client";
import { FunctionComponent } from "react";

interface OcNavProps {
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
}

const OcNav: FunctionComponent<OcNavProps> = ({
  openRegisterModal,
  closeRegisterModal,
}) => {
  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="navbar-brand d-flex align-items-center mb-3 mb-md-0 me-md-4 link-body-emphasis text-decoration-none "
          >
            <span className="fs-4 ">Open Chord</span>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" className="nav-link px-2 text-secondary">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                About
              </a>
            </li>
          </ul>

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control form-control-dark text-bg-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2">
              Login
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={openRegisterModal}
            >
              Sign-up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OcNav;
