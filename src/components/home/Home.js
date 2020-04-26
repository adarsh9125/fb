import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import mainLogo from "../../assets/image/homepage.jpg";
import "./Home.css";

class Home extends React.Component {
  componentDidMount() {
    document.title = "Home";
  }
  render() {
    return (
      <Container fluid className="home">
        <Row>
          <Col className="p-0">
            <img src={mainLogo} alt="fireSpot" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
