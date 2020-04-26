import React from "react";
import { TreeView } from "devextreme-react";
import { Card, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import { add} from 'cart-localstorage' 
import mainLogo from "../assets/image/homepage.jpg";
import axiosConfig from "../axiosconfig/axiosConfig";
class Availableproduct extends React.Component {
  constructor(props) {
    super(props);
    console.log("propsparams=====>", this.props.match.params.vendorid);
    this.products = []; //service.getProducts();
    this.state = {
      currentItem: [], //Object.assign({}, this.products[0])
      categoryProducts: [],
      product: [],
      apialreadycalled: false,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  componentDidMount() {
    if (this.state.apialreadycalled === false) {
      axiosConfig
        .get("category/vendor/" + this.props.match.params.vendorid)
        .then((response) => {
          // handle success
          console.log("response.data====>", response.data);
          this.setState({
            currentItem: response.data,
            apialreadycalled: true,
            products: response.data,
          });
        })
        .catch((error) => {
          // handle error
          console.log("response.data error.message====>", error.message);
          this.setState({
            isLoaded: true,
            error,
          });
        });
    }
  }

  render() {
    console.log("current item data====>", this.state.categoryProducts);
    const { products, categoryProducts } = this.state;
    console.log("current item data product====>", products);
    if (products) {
      return (
        <Container fluid>
          <Row>
            <Col xs lg="3" sm="3">
              <div className="form">
                <TreeView
                  id="simple-treeview"
                  items={products}
                  onItemClick={this.selectItem}
                />
              </div>
            </Col>
            <Col xs lg="9" sm="9">
              <Row>
                {categoryProducts && this.getproductdetails(categoryProducts)}
              </Row>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Spinner
          animation="border"
          variant="primary"
          className="movetocenter"
        />
      );
    }
  }

  calladdcart(event, productname) {
    let productdetails = {
      id: event.target.name,
      productId: event.target.name,
      productname: productname,
      price: "0",
    };
    add(productdetails, 1)

    // this.props.history.push("/addtocart/" + event.target.name);
    this.props.history.push({
      pathname: "/addtocart/" + event.target.name,
      state: {
        productId: event.target.name,
        vendorId: this.props.match.params.vendorid,
      },
    });
  }

  getproductdetails(data) {
    if (data.length) {
      return data.map((product, index) => {
        return (
          <div className="col-lg-4 d-flex align-items-stretch mb-3">
            <Card>
              <Card.Img variant="top" src={mainLogo}></Card.Img>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Product description.</Card.Text>
                {product.stock === 1 ? (
                  <Button
                    variant="primary"
                    name={product.id}
                    className="margin_btn"
                  >
                    Available{" "}
                  </Button>
                ) : (
                  <Button variant="danger">Out of Stock</Button>
                )}
                {product.stock === 1 ? (
                  <Button
                    variant="primary"
                    name={product.id}
                    onClick={(event) => this.calladdcart(event, product.name)}
                    className="margin_btn"
                  >
                    Add to cart
                  </Button>
                ) : null}
              </Card.Body>
            </Card>
          </div>
        );
      });
    } else {
      return (
        <div className="col-lg-4 d-flex align-items-stretch mb-3">
          No Results!
        </div>
      );
    }
  }

  selectItem(e) {
    console.log("e==========>", e.itemData.id);
    this.setState({
      currentItem: Object.assign({}, e.itemData),
    });
    let id = e.itemData.id;
    axiosConfig
      .get("product/" + id)
      .then((response) => {
        // handle success
        console.log("response.data====>", response.data);
        this.setState({ categoryProducts: response.data });
      })
      .catch((error) => {
        // handle error
        console.log("response.data error.message====>", error.message);
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }
}
export default Availableproduct;
