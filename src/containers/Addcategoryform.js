import React from "react";
import { Form, Button, Row, Col, Jumbotron } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SimpleReactValidator from "simple-react-validator";
import { TreeSelect } from "antd";
import "antd/dist/antd.css";
import { getExistingSubCategory, getExistingCategory } from "../actions/index";
const { TreeNode } = TreeSelect;

class Addcategoryform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subcategoryname: "",
      categoryname: "",
      productname: "",
      showdropdowncategory: false,
      showsubcategorydropdown: false,
      isChecked: true,
      value: undefined,
    };
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    console.log(
      "getExistingCategory merchant id====>",
      this.props.match.params.merchantid
    );
    this.props.getExistingCategory(this.props.match.params.merchantid);
  }

  setValue = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  };

  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      alert("Created Succesfully.");
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  };

  handleAddCategory = () => {
    this.setState({
      showdropdown: false,
    });
  };

  wanttoSelectfromExistingCategory() {
    this.setState({ showdropdowncategory: false });
  }

  resetwanttoSelectfromExistingCategory() {
    this.setState({ showdropdowncategory: true });
  }

  wanttoSelectfromExistingSubCategory() {
    this.setState({ showsubcategorydropdown: false });
  }

  resetwanttoSelectfromExistingSubCategory() {
    this.setState({ showsubcategorydropdown: true });
  }

  handleRemoveShareholder = (idx) => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx),
    });
  };
  createTreeNode() {
    return (
      <TreeNode value="parent 1" title="parent 1">
        <TreeNode value="parent 1-0" title="parent 1-0">
          <TreeNode value="leaf1" title="my leaf" />
          <TreeNode value="leaf2" title="your leaf" />
        </TreeNode>
      </TreeNode>
    );
  }
  showDropdown = () => {
    if (this.state.showdropdowncategory == true) {
      return (
        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Col sm={2}></Col>
          <Form.Label column sm={2}>
            Select from existing category
          </Form.Label>
          <Col sm={4}>
            {/* <select value={this.state.value} onChange={this.handleChange}> */}
            <Form.Control
              name="categoryname"
              as="select"
              value={this.state.categoryname}
              onChange={(e) => this.setValue(e)}
            >
              <option>Category-1</option>
              <option>Category-2</option>
            </Form.Control>
            {/********** This is where the magic happens ***********/}
            {/* {this.validator.message('User Type', this.state.usertype, 'required')} */}
          </Col>
          <Col sm={2}>
            <Button
              variant="primary"
              onClick={() => this.wanttoSelectfromExistingCategory()}
            >
              Add New Category
            </Button>
          </Col>
        </Form.Group>
      );
    } else {
      return (
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Col sm={2}></Col>
          <Form.Label column sm={2}>
            Category Name
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              name="categoryname"
              type="text"
              placeholder="Category Name"
              value={this.state.categoryname}
              onChange={(e) => this.setValue(e)}
            />
            {/**********   This is where the magic happens     ***********/}
            {this.validator.message(
              "Category Name",
              this.state.categoryname,
              "required"
            )}
          </Col>
          {/* <Col sm={2}>
            <Button
              variant="primary"
              onClick={() => this.resetwanttoSelectfromExistingCategory()}
            >
              Select Existing?
            </Button>
          </Col> */}
          {/* <Col sm={2}><Button variant="primary">Submit</Button></Col> */}
        </Form.Group>
      );
    }
  };
  showsubcategoryDropdown() {
    if (this.state.showsubcategorydropdown == true) {
      return (
        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Col sm={2}></Col>
          <Form.Label column sm={2}>
            Select from existing category
          </Form.Label>
          <Col sm={4}>
            {/* <select value={this.state.value} onChange={this.handleChange}> */}
            <Form.Control
              name="subcategoryname"
              as="select"
              value={this.state.subcategoryname}
              onChange={(e) => this.setValue(e)}
            >
              <option>Sub Category-1</option>
              <option>Sub Category-2</option>
            </Form.Control>
            {/**********   This is where the magic happens     ***********/}
            {/* {this.validator.message('User Type', this.state.usertype, 'required')} */}
          </Col>
          {/* <Col sm={2}>
            <Button
              variant="primary"
              onClick={() => this.wanttoSelectfromExistingSubCategory()}
            >
              Add New SubCategory
            </Button>
          </Col> */}
        </Form.Group>
      );
    } else {
      return (
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Col sm={2}></Col>
          <Form.Label column sm={2}>
            Sub Category
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              name="subcategoryname"
              type="text"
              placeholder="Sub Category Name"
              value={this.state.subcategoryname}
              onChange={(e) => this.setValue(e)}
            />
            {/**********   This is where the magic happens     ***********/}
            {this.validator.message(
              "Sub Category Name",
              this.state.subcategory,
              "required"
            )}
          </Col>
          {/* <Col sm={2}>
            <Button
              variant="primary"
              onClick={() => this.resetwanttoSelectfromExistingSubCategory()}
            >
              Select Existing?
            </Button>
          </Col> */}
        </Form.Group>
      );
    }
  }

  willhaveProduct() {
    if (this.state.isChecked === true) {
      return (
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Col sm={2}></Col>
          <Form.Label column sm={2}>
            Product Name
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              name="productname"
              type="text"
              placeholder="Product Name"
              value={this.state.productname}
              onChange={(e) => this.setValue(e)}
            />
            {/**********   This is where the magic happens     ***********/}
            {this.validator.message(
              "Sub Category Name",
              this.state.productname,
              "required"
            )}
          </Col>
        </Form.Group>
      );
    } else {
      return null;
    }
  }
  handleCheckbox(event) {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }
  render() {
    return (
      <Jumbotron>
        <span className="signup">Add Product</span>
        <hr />
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          {this.showDropdown()}
          {this.showsubcategoryDropdown()}
          {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              onChange={(e) => this.handleCheckbox(e)}
              label="Will have child category?"
              defaultChecked
            />
          </Form.Group> */}
          {this.willhaveProduct()}
          <div className="btn_details d-flex justify-content-center buttonsGroup">
            <Button type="submit" value="Submit">
              Add Product
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
    isLogedIn: state.isLogedIn,
  };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getExistingCategory: getExistingCategory,
      getExistingSubCategory: getExistingSubCategory,
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(Addcategoryform);
