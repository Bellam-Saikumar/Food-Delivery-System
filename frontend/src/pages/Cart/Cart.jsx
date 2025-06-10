import React, { useContext } from "react";
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext'; 
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, food_list, removeFromCart, subtotal, delivery, total,url } = useContext(StoreContext);
  const navigate = useNavigate();

  
  
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index} className="cart-items-title cart-items-item">
                <img src={url+'/images/'+item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>₹{item.price * cartItems[item._id]}</p>
                <p
                  className="remove-button"
                  onClick={() => removeFromCart(item._id)}
                  style={{ cursor: 'pointer', color: 'red' }}
                >
                  x
                </p>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>₹{subtotal}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery</p>
              <p>₹{delivery}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{total}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
            <p>If you have a promo code, Enter it here</p>
            <input type="text" placeholder="Enter Promocode" />
          <div>
            <div className="cart-promocode-input">
              <button >SUBMIT</button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
