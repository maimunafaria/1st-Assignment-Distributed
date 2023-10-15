import React from 'react';
import 'aos/dist/aos.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';


const MyNavbar = () => {

  const [showAlert, setShowAlert] = useState(false);
  const handleLinkedInClick = () => {
   
    window.scrollTo(0, 0);
  };
  function handleLogout() {
    setShowAlert(true);

  }
  function handleConfirmLogout(confirm) {
    setShowAlert(false);
    if (confirm) {
      window.location.href = "/";
    }
  }

 return  <div>
  <Navbar bg="light" variant="light" expand="lg" >
      {/* <Navbar.Brand as={Link} to={`/${email}`}><b>Linked In </b> </Navbar.Brand> */}
      <Navbar.Brand as={Link} to={`/feed`} onClick={handleLinkedInClick}><b>Linked In </b> </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse  className="justify-content-end">
        <Nav className="mr-auto">
        <Nav.Link as={Link} to={`/profile`}>Profile</Nav.Link>
        <Nav.Link as={Link} to={`/notification`} onClick={handleLinkedInClick}>Notification</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>

      {showAlert && (
        <div className="alert-container">
          <div className="alert alert-warning bg-transparent" >
            <p>Are you sure you want to log out?</p>
            <button
              className="btn btn-danger mr-2"
              onClick={() => handleConfirmLogout(true)}
            >
              Yes
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleConfirmLogout(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
      </Navbar>


</div>
}
export default MyNavbar;