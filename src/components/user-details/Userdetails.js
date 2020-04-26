import React from "react";
import UserList from "../../containers/user-list";
import UserDetails from "../../containers/user-detail";
import "./Userdetails.css";

class Userdetails extends React.Component {
  render() {
    return (
      <div className="body-form custom-form">
        <h2>User List</h2>
        <UserList />
        <hr />
        <h2>User Details</h2>
        <UserDetails />
      </div>
    );
  }
}

export default Userdetails;
