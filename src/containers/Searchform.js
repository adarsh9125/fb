import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Button,
  Jumbotron,
  Table,
  Alert,
  Nav,
} from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getvendors } from "../actions/index";

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class Searchform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pincode: "",
      productname: "",
      vendors: [],
      showProductname: false,
      isSubmitClicked: false,
    };
    this.validator = new SimpleReactValidator();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      this.props.getvendors(this.state.productname, this.state.pincode);
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

    // alert("setValue=====>")
  };
  createRow = (props) => {
    let i = 0;
    return props.vendors.vendorlist.map((vendor, index) => {
      const { id, shopname, address1, phone } = vendor; //destructuring
      i++;
      let navurl = "/availableproduct/" + id+"/"+encodeURI(shopname);
      return (
        <tr key={id}>
          <td>{i}</td>
          <td>
            <NavLink to={navurl}>{shopname}</NavLink>
          </td>
          {this.state.productname != "" ? <td>{vendor.name}</td> : null}
          <td>{address1}</td>
          <td>{phone}</td>
        </tr>
      );
    });
  };
  createTable = (props) => {
    console.log("createTable state===>", this.state);
    if (props.vendors.vendorlist && props.vendors.vendorlist.length > 0) {
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Vendors Name</th>
              {this.state.productname != "" ? <th>Product Name</th> : null}
              <th>Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>{this.createRow(props)}</tbody>
        </Table>
      );
    } else {
      return (
        <Alert key="1" variant="danger">
          <span className="error_msg">
            No vendor is found for your location.
          </span>
        </Alert>
      );
    }
  };

  render() {
    return (
      <Jumbotron>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={2}></Col>
            <Form.Label column sm={2}>
              Pincode
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                name="pincode"
                type="text"
                placeholder="Enter Pincode"
                value={this.state.pincode}
                onChange={(e) => this.setValue(e)}
              />
              {this.validator.message(
                "Pincode",
                this.state.pincode,
                "required"
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Col sm={2}></Col>
            <Form.Label column sm={2}>
              Product name
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                name="productname"
                type="text"
                placeholder="Product Name"
                value={this.state.productname}
                onChange={(e) => this.setValue(e)}
              />
              {/* {this.validator.message('Product name', this.state.productname, 'required')} */}
            </Col>
          </Form.Group>

          <Button type="submit" value="Submit">
            Search
          </Button>
        </Form>
        <hr />
        {this.props.vendors != null ? this.createTable(this.props) : null}
      </Jumbotron>
    );
  }
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
  return {
    vendors: state.vendors,
  };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getvendors: getvendors }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Searchform);
