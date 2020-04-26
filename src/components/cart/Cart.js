
import React from 'react';
import Cartform from '../../containers/Cartform';
import './Cart.css';

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {

    return (
      <div className="cart_form">
       <Cartform {...this.props}/>
      </div>
  
   )
  }
}

export default Cart;