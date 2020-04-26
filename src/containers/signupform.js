import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Button, Jumbotron, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SimpleReactValidator from "simple-react-validator";
import { makesignuprequest } from "../actions/index";

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class SignUpform extends React.Component {
  constructor(props) {
    super(props);
    console.log("this.props=====>", this.props);
    this.state = {
      shopname: "",
      phone: "",
      email: "",
      city: "",
      address1: "",
      address2: "",
      pincode: "",
      state: "",
      isSignupSuccess: "",
      message: "",
    };
    this.validator = new SimpleReactValidator();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      this.props.makesignuprequest(this.state);
      this.props.history.push("/login");
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
    console.log("thisssss props======>", this.props);
    return (
      <Jumbotron>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={2}></Col>
            <Form.Label column sm={2}>
              Vendor Name
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                name="shopname"
                type="text"
                placeholder="First Name"
                value={this.state.shopname}
                onChange={(e) => this.setValue(e)}
              />
              {/**********   This is where the magic happens     ***********/}
              {this.validator.message(
                "Shop Name",
                this.state.shopname,
                "required"
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={2}></Col>
            <Form.Label column sm={2}>
              Phone Number
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                name="phone"
                type="phone"
                placeholder="Phone Number"
                value={this.state.phone}
                onChange={(e) => this.setValue(e)}
              />
              {/**********   This is where the magic happens     ***********/}
              {this.validator.message(
                "Phone Number",
                this.state.phone,
                "required|phone"
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={2}></Col>
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                name="email"
                type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => this.setValue(e)}
              />
              {/**********   This is where the magic happens     ***********/}
              {this.validator.message(
                "Email",
                this.state.email,
                "required|email"
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={2}></Col>
            <Form.Label column sm={2}>
              Address 1
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                name="address1"
                type="text"
                placeholder="Address 1"
                value={this.state.address1}
                onChange={(e) => this.setValue(e)}
              />
              {/**********   This is where the magic happens     ***********/}
              {this.validator.message(
                "Address1",
                this.state.address1,
                "required"
              )}
            </Col>
          </Form.Group>
          {this.props.isSignupSuccess != null &&
          this.props.isSignupSuccess.loading === true ? (
            <Spinner animation="border" variant="primary" />
          ) : null}
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={2}></Col>
            <Form.Label column sm={2}>
              Address 2
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                name="address2"
                type="text"
                placeholder="Address 2"
                value={this.state.address2}
                onChange={(e) => this.setValue(e)}
              />
              {/**********   This is where the magic happens     ***********/}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={2}></Col>
            <Form.Label column sm={2}>
              State
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                name="state"
                type="text"
                placeholder="State"
                value={this.state.state}
                onChange={(e) => this.setValue(e)}
              />
              {/**********   This is where the magic happens     ***********/}
              {this.validator.message("City", this.state.state, "required")}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={2}></Col>
            <Form.Label column sm={2}>
              City
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                name="city"
                type="text"
                placeholder="City"
                value={this.state.city}
                onChange={(e) => this.setValue(e)}
              />
              {/**********   This is where the magic happens     ***********/}
              {this.validator.message("City", this.state.city, "required")}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={2}></Col>
            <Form.Label column sm={2}>
              Pincode
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                name="pincode"
                type="text"
                placeholder="Pincode"
                value={this.state.pincode}
                onChange={(e) => this.setValue(e)}
              />
              {/**********   This is where the magic happens     ***********/}
              {this.validator.message(
                "pincode",
                this.state.pincode,
                "required|number"
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Col sm={2}></Col>
            <Form.Label column sm={2}>
              User Type
            </Form.Label>
            <Col sm={4}>
              {/* <select value={this.state.value} onChange={this.handleChange}> */}
              <Form.Control
                name="usertype"
                as="select"
                value={this.state.usertype}
                onChange={(e) => this.setValue(e)}
              >
                <option>Vendor</option>
                <option>Customer</option>
              </Form.Control>
              {/**********   This is where the magic happens     ***********/}
              {/* {this.validator.message('User Type', this.state.usertype, 'required')} */}
            </Col>
          </Form.Group>
          <div className="btn_details d-flex justify-content-center buttonsGroup">
            <Button variant="primary">
              <Link to="/login" className="lnk_color">
                Login?
              </Link>
            </Button>
            <Button type="submit" value="Submit">
              Signup
            </Button>
          </div>
        </Form>
      </Jumbotron>
    );
  }
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
  return {
    isSignupSuccess: state.isSignupSuccess,
  };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ makesignuprequest: makesignuprequest }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SignUpform);
