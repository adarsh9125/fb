import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "../home/Home";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Signup from "../signup/Signup";
import Login from "../login/Login";
import Aboutus from "../about-us/Aboutus";
import Vendor from "../vendor/Vendor";
import Search from "../search/Search";
import Customers from "../customer/Customer";
import Availableproduct from "../Availableproduct/Availableproduct";
import Userdetails from "../user-details/Userdetails";
import Addcategory from "../addcategory/Addcategory";
import Routnotmatched from "../errorroute/Routnotmatched";
import Addtocart from "../cart/Cart";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("user") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Header {...this.props} />
        <div class="app-body">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about-us" component={Aboutus} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={Search} />
            <Route path="/addtocart/:product_id" component={Addtocart} />
            <Route
              path="/availableproduct/:vendorid/:merchant_name"
              component={Availableproduct}
            />
            <PrivateRoute exact path="/add-product" component={Aboutus} />
            <PrivateRoute exact path="/user-details" component={Userdetails} />
            <PrivateRoute exact path="/vendor" component={Vendor} />
            <PrivateRoute exact path="/customers" component={Customers} />
            <PrivateRoute exact path="/users" component={Userdetails} />
            <PrivateRoute
              exact
              path="/addcategory/:merchantid"
              component={Addcategory}
            />
            <Route component={Routnotmatched} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default Routes;
