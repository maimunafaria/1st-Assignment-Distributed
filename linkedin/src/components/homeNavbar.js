import React from 'react';
import 'aos/dist/aos.css';
import { Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeNavbar = () => {

 return  <div>
 
  <Navbar bg="light" variant="light" expand="lg" >
      <Navbar.Brand href="/"><b>Linked In </b> </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse  className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link href="/" >Home</Nav.Link>
          <Nav.Link href="/register" >Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>

      </Navbar>
  <section className="footer" >
        <div >
          <div className="col-lg-2">
            <p >© Copyrights 1222 </p>
          </div>
        </div>

      </section>
</div>
}
export default HomeNavbar;