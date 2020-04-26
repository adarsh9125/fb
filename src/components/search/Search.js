import React from "react";
import Searchform from "../../containers/Searchform";

class Search extends React.Component {
  constructor(props) {
    super(props);
    console.log("props data=========>", props);
  }

  render() {
    return (
      <div className="body-form custom-form">
        <div className="page_title">
          <h3>Search Products</h3>
        </div>
        <hr />
        <Searchform {...this.props} />
      </div>
    );
  }
}

export default Search;
