import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { FaFacebookF } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import { IoLogoYoutube } from "react-icons/io5";

function Footer() {
  return (
    <section className="footer-container mt-5">
      <div
        className="container d-md-flex pt-5 gap-5 pb-3
      "
      >
        <div className="social-link col mb-4 mb-md-0 ">
          <Link to="/landing">
            <img
              className="footer-logo"
              src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-white.png"
              alt="logo"
            />
          </Link>
          <ul className="links d-flex list-unstyled gap-3 ">
            <Link to="https://www.facebook.com/evangaditech">
              <li className="text-white border rounded-circle p-2 ">
                <FaFacebookF size={"25"} />
              </li>
            </Link>
            <Link to="https://www.instagram.com/evangaditech">
              <li className="text-white border rounded-circle p-2    ">
                <TiSocialInstagram size={"25"} />
              </li>
            </Link>
            <Link to="https://www.youtube.com/@evangaditech">
              <li className="text-white border rounded-circle p-2 ">
                <IoLogoYoutube size={"25"} />
              </li>
            </Link>
          </ul>
        </div>
        <div className="useful-link col mb-4 mb-md-0 ">
          <h3 className="text-white fs-4 fw-bold ">Useful links</h3>
          <div className="useful-links">
            <Link to="/how">How it works</Link>
            <Link to="legal/terms">Terms of service</Link>
            <Link to="legal/policy">Privacy policy</Link>
          </div>
        </div>
        <div className="contact-info col mb-4 mb-md-0">
          <h3 className="text-white fs-4 fw-bold">Contact info</h3>
          <div>
            <p>support@evangadi.com</p>
            <p>+1-202-386-2702</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
