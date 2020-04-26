import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import axiosConfig from "../axiosconfig/axiosConfig";
export default class AddDepModal extends Component {
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
    //alert(event.target.DepartmentName.value)
    // fetch('http://7990eb1a.ngrok.io/api/v1/vendors',{
    //   method:'POST',
    //   headers:{
    //     'Accept':'application/json',
    //     'Content-Type' : 'application/json'
    //   },
    //   body: JSON.stringify({
    //     id: event.target.Id.value,
    //     shopname: event.target.DepartmentName.value,
    //     address1: event.target.Address1.value,
    //     address2: event.target.Address2.value,
    //     city: event.target.City.value,
    //     state: event.target.State.value,
    //     pincode: event.target.Pincode.value,
    //     phone: event.target.PhoneNumber.value
    // })
    // })
    // .then(res=>res.json()).then((result)=>{
    //     this.setState({snackbaropen:true,snackbarmsg:result})
    // },(error)=>{
    //   this.setState({snackbaropen:true, snackbaemsg:'failed'})
    // })
    let parameter = JSON.stringify({
      id: event.target.Id.value,
      shopname: event.target.DepartmentName.value,
      address1: event.target.Address1.value,
      address2: event.target.Address2.value,
      city: event.target.City.value,
      state: event.target.State.value,
      pincode: event.target.Pincode.value,
      phone: event.target.PhoneNumber.value,
    });
    axiosConfig
      .post("vendors", parameter)
      .then((response) => {
        this.setState({ snackbaropen: true, snackbarmsg: response.data });
      })
      .catch((error) => {
        console.log(error);
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
          message={<span id="message-id">One field successfully added</span>}
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
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Vendor
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="DepartmentName,Id,Address1,Address2,City,State,Pincode,PhoneNumber">
                    <Form.Label>Shop Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="DepartmentName"
                      required
                      placeholder="Shop Name"
                    />

                    <Form.Label>Address </Form.Label>
                    <Form.Control
                      type="text"
                      name="Address1"
                      required
                      placeholder="Address line 1"
                    />

                    <Form.Label>Address </Form.Label>
                    <Form.Control
                      type="text"
                      name="Address2"
                      required
                      placeholder="Address line 2"
                    />

                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="City"
                      required
                      placeholder="City"
                    />

                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="State"
                      required
                      placeholder="State"
                    />

                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      type="number"
                      name="Pincode"
                      required
                      placeholder="Pincode"
                    />

                    <Form.Label>PhoneNumber</Form.Label>
                    <Form.Control
                      type="number"
                      name="PhoneNumber"
                      required
                      placeholder="PhoneNumber"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button varient="primary" type="submit">
                      Add Vendor
                    </Button>
                    &nbsp;{" "}
                    <Button className="btn-danger" onClick={this.props.onHide}>
                      Close
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
