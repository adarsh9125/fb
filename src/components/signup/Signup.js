import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpform from "../../containers/signupform";
import { Link } from "react-router-dom";
import "./Signup.css";

class Signup extends React.Component {
  componentDidMount() {
    document.title = "Signup";
  }
  render() {
    return (
      <div className="body-form custom-form">
        <SignUpform {...this.props} />
      </div>
    );
  }
}

export default Signup;
