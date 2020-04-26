import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { makelogoutrequest } from "../actions/index";

class Headerform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useLogedin: "",
    };
  }
  logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    this.props.makelogoutrequest();
    window.location.reload("/login");
  };

  render() {
    return (
      <div className="app-header">
        <Navbar
          bg="dark"
          variant="dark"
          expand="lg"
          className="headerLinkColor"
        >
          <Navbar.Brand href="/">Captivators</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/search">Search Product</Nav.Link>
              {this.props.isLogedIn.islogin === false ? (
                <Nav.Link href="/login">Login</Nav.Link>
              ) : (
                <Nav.Link
                  href="#logout"
                  onClick={(event) => this.logout(event)}
                >
                  Logout
                </Nav.Link>
              )}
              {this.props.isLogedIn.islogin === false ? (
                <Nav.Link href="/signup">Signup</Nav.Link>
              ) : (
                <Nav.Link href="/add-product">Add Product</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
        </Navbar>
      </div>
    );
  }
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
  return {
    isLogedIn: state.isLogedIn,
  };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ makelogoutrequest: makelogoutrequest }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Headerform);
