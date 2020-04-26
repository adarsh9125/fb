import React from "react";
import "./Available.css";
import Availableproductform from "../../containers/Availableproductform";
import { Container, Row, Col } from "react-bootstrap";

class Availableproduct extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "Available Products";
    console.log("Available Products:", this.props);
  }
  render() {
    return (
      <div className="body-form custom-form">
        <div className="page_title">
          <h3>{decodeURI(this.props.match.params.merchant_name)}</h3>
        </div>
        <Availableproductform {...this.props} />
      </div>
    );
  }
}

export default Availableproduct;
