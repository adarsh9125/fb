import React from 'react';
import {Button} from 'react-bootstrap';
import axiosConfig from '../axiosconfig/axiosConfig';
import {Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SimpleReactValidator from 'simple-react-validator';
import 'fa-icons';
import {getcartlist,removefromcart,updatequantity,clearthecart,placetheorder} from '../actions/index'

class Cartform extends React.Component {
  constructor(props) {
    super(props);
    console.log("props in constructor====>",this.props);
    this.state = {
      vendorId:this.props.location.state.vendorId,
      customerName:"",
      email:"",
      mobileNo:""
    };
    this.validator = new SimpleReactValidator();
  }

  componentDidMount(){
      console.log("fetch passed id====>",this.props.match.params.product_id);
    let productdetails={id: this.props.match.params.product_id, productname: "Vans"+Math.random(), price: "0"}
    this.props.getcartlist(productdetails)
   
           
    }
removefromcart(event){
    console.log("event.target.name",event.target.name);
    alert("Are you sure you want delete this product from cart?");
    this.props.removefromcart(event.target.name)
}

updatequantity=(e,previousquantity)=>{
    console.log("id===>",e.target.name,"quantity=====>",e.target.value,"previousquantity====>",previousquantity);
    this.props.updatequantity(e.target.name,previousquantity,e.target.value)
  }

clearthecart=(e)=>{
    alert("Are you sure you want clear the cart?");
    this.props.clearthecart();
}

getOptionsArray = (count) => {
        const array = [];
        for (let i = 0; i < count; i++) {
          array.push(i + 1);
        }
      
        return array;
      };

fetchcartdata(){
        console.log("cartlistcartlistcartlistcartlist====>",this.props.cartlistdatas)
        
        if(this.props.cartlistdatas && this.props.cartlistdatas.cartlist.length>0)
        {
            let cartData = this.props.cartlistdatas.cartlist;
            return cartData.map((product, index) => {
                console.log("cart product details==========>",product)
                return (
                            <tr>
                                <th scope="row" className="border-0">
                                <div className="p-2">
                                    <img src="https://res.cloudinary.com/mhmd/image/upload/v1556670479/product-1_zrifhn.jpg" alt="" width={70} className="img-fluid rounded shadow-sm" />
                                    <div className="ml-3 d-inline-block align-middle">
                                    <h5 className="mb-0"> <a href="#" className="text-dark d-inline-block align-middle">{product.productname}</a></h5><span className="text-muted font-weight-normal font-italic d-block">Category: Watches</span>
                                    </div>
                                </div>
                                </th>
                                <td className="border-0 align-middle"><strong>#####</strong></td>
                                <td className="border-0 align-middle">
                            <Form.Control as="select" 
                            name={product.id}
                            value={product.quantity} 
                                onChange={(e)=>this.updatequantity(e,product.quantity)} >
                                <option value="1" >1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Control></td>
                                <td className="border-0 align-middle"><Button variant="danger" name = {product.id}  onClick={(event)=>this.removefromcart(event)}>Delete</Button></td>
                            </tr>
                    )
             })
        }else{
           let returnValue = (this.props.cartlistdatas && this.props.cartlistdatas.cartlist && this.props.cartlistdatas.cartlist.length <= 0)?<span>No product available in your cart.</span>:<span>Loading........</span>;
          
           return returnValue;
        }
   
}

handleSubmit=(event)=>{
    event.preventDefault();
    console.log("order place data====>",this.state);
   
    if (this.validator.allValid()) {
      if(this.props.cartlistdatas && this.props.cartlistdatas.cartlist.length>0)
      {
        this.props.placetheorder(this.state,this.props.cartlistdatas.cartlist);   
      }else{
        alert("Your Cart is empty please add the product.")
      }
    } else {
        this.validator.showMessages();
        // rerender to show messages for the first time
        this.forceUpdate();
    }
}; 

setValue=(event)=>{
    const { target: { name, value } } = event
    console.log("[name]: value ====>",[name], value );
    this.setState({ [name]: value })
  }
      
  render() {
   
    return (
        
        <div className="px-4 px-lg-0">
          {/* For demo purpose */}
          <div className="container text-white py-5 text-center">
            <h4 className="display-8">My Cart ({(this.props.cartlistdatas && this.props.cartlistdatas.cartlist)?this.props.cartlistdatas.cartlist.length:0})</h4>
            {/* <p className="lead mb-0">Build a fully structred shopping cart page using Bootstrap 4. </p>
            <p className="lead">Snippet by <a href="https://bootstrapious.com/snippets" className="text-white font-italic">
                <u>Bootstrapious</u></a>
            </p> */}
          </div>
          {/* End */}
          <div className="pb-5">
            <div className="container">
                
              <div className="row">
             
                <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                <span className="confirmationmessage"></span>
                  {/* Shopping cart table */}
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="border-0 bg-light">
                            <div className="p-2 px-3 text-uppercase">Product</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Price</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Quantity</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Remove</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                         this.fetchcartdata()
                      }

                      </tbody>
                    </table>
                    <Button variant="danger" onClick={(e)=>this.clearthecart(e)}>Clear The Cart</Button>
                  </div>
                  {/* End */}
                </div>
              </div>
              <Form onSubmit={(e)=>this.handleSubmit(e)}>
              <div className="row py-5 p-4 bg-white rounded shadow-sm">
                <div className="col-lg-6">
                  <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Customer Details</div>
                  <div className="p-4">
                    <p className="font-italic mb-4">If you want to place the order please provide the below details.</p>
                    <div className="input-group mb-4 border p-2">
                      <input type="text" name="customerName" placeholder="Customer Name" aria-describedby="button-addon3" className="form-control border-0" value={this.state.customerName} onChange={(e)=>this.setValue(e)}/>
                     
                    </div>
                    {this.validator.message('Name', this.state.customerName, 'required')}
                    <div className="input-group mb-4 border p-2">
                    <input type="text" name="mobileNo" placeholder="Phone Number" aria-describedby="button-addon3" className="form-control border-0" value={this.state.mobileNo} onChange={(e)=>this.setValue(e)}/>
                    
                    </div>
                    {this.validator.message('Phone Number', this.state.mobileNo, 'required|phone')}
                    <div className="input-group mb-4 border p-2">
                    <input type="text" name="email" placeholder="Customer Email id" aria-describedby="button-addon3" className="form-control border-0" value={this.state.email} onChange={(e)=>this.setValue(e)}/>
                  
                    </div>
                    {this.validator.message('Email', this.state.email, 'required|email')}
                  </div>
               

                </div>
                <div className="col-lg-6">
                  <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                  <div className="p-4">
                    <p className="font-italic mb-4">After placing the order your cart item will be soft block for 1 hour. Please visit the shop and collect your order after payment.</p>
                    <ul className="list-unstyled mb-4">
                      <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>######</strong></li>
                      {/* <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>$10.00</strong></li>
                      <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Tax</strong><strong>$0.00</strong></li> */}
                      <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                        <h5 className="font-weight-bold">#######</h5>
                      </li>
                    </ul><Button type="submit" value="Submit" className="btn btn-dark rounded-pill py-2 btn-block">Submit Order</Button>
                  </div>
                </div>
              </div>
              </Form>
            </div>
          </div>
        </div>
      );
  }

}


// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        cartlistdatas: state.cartlistdatas
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
  return bindActionCreators({getcartlist: getcartlist,removefromcart:removefromcart,updatequantity:updatequantity,clearthecart:clearthecart,placetheorder:placetheorder}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Cartform);



