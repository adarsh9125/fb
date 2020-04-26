import React from "react";
import Addcategoryform from "../../containers/Addcategoryform";

class Addcategory extends React.Component {
  render() {
    return (
      <div className="body-form custom-form">
        <Addcategoryform {...this.props} />
      </div>
    );
  }
}

export default Addcategory;
