import React from "react";
import Loginform from "../../containers/login";

class Login extends React.Component {
  componentDidMount() {
    document.title = "Login";
  }
  render() {
    return (
      <div className="body-form custom-form">
        <div className="page_title">
          <h3>Vendor Login</h3>
        </div>
        <hr />
        <Loginform {...this.props} />
      </div>
    );
  }
}

export default Login;
