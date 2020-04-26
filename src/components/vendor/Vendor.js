import React from "react";
import Department from "../../containers/Department";

class Vendor extends React.Component {
  componentDidMount() {
    document.title = "Vendor";
  }
  render() {
    return (
      <div className="body-form custom-form">
        <div className="page_title">
          <h3>Vendor List</h3>
        </div>
        <Department {...this.props} />
      </div>
    );
  }
}

export default Vendor;
