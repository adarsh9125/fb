import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import axiosConfig from "../axiosconfig/axiosConfig";
const API_BASE_URL = "http://7990eb1a.ngrok.io/api/v1/";
export default class EditDepModal extends Component {
  snackbarRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = { snackbaropen: false, snackbarmsg: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };
  handleSubmit(event) {
    event.preventDefault();

    let parameter = JSON.stringify({
      shopname: event.target.DepartmentName.value,
      address1: event.target.Address1.value,
      address2: event.target.Address2.value,
      city: event.target.City.value,
      state: event.target.State.value,
      pincode: event.target.Pincode.value,
      phone: event.target.PhoneNumber.value,
    });
    axiosConfig
      .put("vendors/" + this.props.depid, parameter)
      .then((response) => {
        this.setState({ snackbaropen: true, snackbarmsg: response.data });
        window.location.reload("/vendor");
      })
      .catch((error) => {
        this.setState({ snackbaropen: true, snackbarmsg: "failed" });
      });
  }
  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">One field successfully modified</span>}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              OnClick={this.snackbarClose}
            ></IconButton>,
          ]}
        />
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="DepartmentName">
                    <Form.Label>Shop Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="DepartmentName"
                      required
                      defaultValue={this.props.depname}
                      placeholder="Shop Name"
                    />
                  </Form.Group>

                  <Form.Group controlId="Address1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="Address1"
                      required
                      defaultValue={this.props.depaddress1}
                      placeholder="Address line 1"
                    />
                  </Form.Group>

                  <Form.Group controlId="Address2">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="Address2"
                      required
                      defaultValue={this.props.depaddress2}
                      placeholder="Address line 2"
                    />
                  </Form.Group>

                  <Form.Group controlId="City">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="City"
                      required
                      defaultValue={this.props.depcity}
                      placeholder="City"
                    />
                  </Form.Group>

                  <Form.Group controlId="State">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="State"
                      required
                      defaultValue={this.props.depstate}
                      placeholder="State"
                    />
                  </Form.Group>

                  <Form.Group controlId="Pincode">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      type="number"
                      name="Pincode"
                      required
                      defaultValue={this.props.deppincode}
                      placeholder="Pincode"
                    />
                  </Form.Group>

                  <Form.Group controlId="PhoneNumber">
                    <Form.Label>PhoneNumber</Form.Label>
                    <Form.Control
                      type="number"
                      name="PhoneNumber"
                      required
                      defaultValue={this.props.depphone}
                      placeholder="PhoneNumber"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button
                      varient="primary"
                      type="submit"
                      onClick={this.props.snackbarmsg}
                    >
                      Update Department
                    </Button>{" "}
                    &nbsp;
                    <Button className="btn-danger" onClick={this.props.onHide}>
                      Close
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}
