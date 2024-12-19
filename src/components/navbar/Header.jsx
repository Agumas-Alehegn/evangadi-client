import { Nav, Navbar, Container, Offcanvas, Button } from "react-bootstrap";
import "./header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserProvider";
import { useContext } from "react";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateUser } = useContext(userContext);
  const isLandingPage = location.pathname === "/";
  const handleLogout = () => {
    localStorage.removeItem("user");
    updateUser(null);
    localStorage.setItem("access_token", "");
    navigate("/");
    console.log("Logged out");
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container className="navbar-container ">
        <Navbar.Brand className="" href="/home">
          <img
            style={{ width: "200px", height: "28px" }}
            src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-black.png"
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle
          className="toggler-icon"
          aria-controls="offcanvasNavbar-expand-lg"
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="start"
          style={{ width: "250px" }}
          className="flexContainer"
        >
          <Offcanvas.Body className="d-flex align-items-start  flex-grow-1 pe-3  ">
            <Nav className="justify-content-end flex-grow-1 pe-3 sidebar">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/how">How it works</Nav.Link>
              {isLandingPage ? (
                <Button className="btn-signin mt-5 mt-lg-0  px-lg-5">
                  SIGN IN
                </Button>
              ) : (
                <Button
                  onClick={handleLogout}
                  className="btn-signin mt-5 mt-lg-0  px-lg-5"
                >
                  LOG OUT
                </Button>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
