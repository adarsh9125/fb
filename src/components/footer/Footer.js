import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <div className="app-footer">
        <Navbar bg="dark minheight">
          <Navbar.Brand href="/">App Name</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#contactus" className="link_color">
              Contact Us
            </Nav.Link>
            <Nav.Link href="#features" className="link_color">
              Security
            </Nav.Link>
            <Nav.Link href="#pricing" className="link_color">
              Policy
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Footer;
