import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Jumbotron, Table } from "react-bootstrap";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllvendors } from "../actions/index";

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class Vendorform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pincode: "",
      productname: "",
      vendors: [],
    };
  }

  componentDidMount() {
    this.props.getAllvendors(this.state);
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
    console.log("props99====>", _.values(props.vendors));
    const data = _.values(props.vendors);
    let i = 0;
    return data.map((vendor, index) => {
      const { id, shopname, address1, phone } = vendor; //destructuring
      i++;
      return (
        <tr key={id}>
          <td>{i}</td>
          <td>{shopname}</td>
          <td>{address1}</td>
          <td>{phone}</td>
        </tr>
      );
    });
  };
  createTable = (props) => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr key="333">
            <th>No</th>
            <th>Vendors Name</th>
            <th>Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>{this.createRow(props)}</tbody>
      </Table>
    );
  };

  render() {
    console.log("this.propsallvendordat66=====>", this.props);
    return (
      <Jumbotron>
        <center>
          <h1>Vendor List</h1>
        </center>
        <hr />
        {this.createTable(this.props)}
      </Jumbotron>
    );
  }
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
  return {
    vendors: state.allVendors,
  };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getAllvendors: getAllvendors }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Vendorform);
