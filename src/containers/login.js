import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Button, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { makeloginrequest } from "../actions/index";
import { makelogoutrequest } from "../actions/index";

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class Loginform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error_msg: false,
    };
    this.validator = new SimpleReactValidator();
    console.log("props in login forme===>", this.props);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("this.state===>", this.state);
    console.log("this.validator.allValid()===>", this.validator.allValid());
    if (this.validator.allValid()) {
      if (
        this.state.email === "adarsh.tiwari@cognizant.com" &&
        this.state.password === "123"
      ) {
        localStorage.setItem("user", "adarsh");
        this.props.makeloginrequest();
        this.props.makelogoutrequest();
        this.props.history.push("/vendor");
      } else {
        alert("Please provide valid username and password.");
        this.setState({ error_msg: true });
      }
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  };

  setValue = (event) => {
    const {
      target: { name, value },
    } = event;
    console.log("[name]: value ====>", [name], value);
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Jumbotron>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={2}></Col>
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => this.setValue(e)}
              />
              {this.validator.message(
                "Email",
                this.state.email,
                "required|email"
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Col sm={2}></Col>
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => this.setValue(e)}
              />
              {this.validator.message(
                "Password",
                this.state.password,
                "required"
              )}
            </Col>
          </Form.Group>
          <Form.Group className="d-flex justify-content-center buttonsGroup">
            <Button variant="primary">
              <Link to="/signup" className="lnk_color">
                SignUp
              </Link>
            </Button>
            <Button type="submit" value="Submit">
              Login
            </Button>
          </Form.Group>
        </Form>
      </Jumbotron>
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
  return bindActionCreators(
    {
      makeloginrequest: makeloginrequest,
      makelogoutrequest: makelogoutrequest,
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(Loginform);
