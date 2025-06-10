import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function PlaceOrder() {
  const { subtotal, total, delivery, cartItems, url, token, food_list, setCartItems } = useContext(StoreContext);
   const navigate = useNavigate();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Check if cart is empty
    const cartIsEmpty = Object.values(cartItems).every((qty) => qty <= 0);
    if (cartIsEmpty) {
      alert("Your cart is empty. Please add some items before placing an order.");
      return;
    }

    // Confirm mock payment
    const confirmPayment = window.confirm("Do you want to proceed with payment?");
    if (!confirmPayment) return;

    const orderItems = Object.keys(cartItems).map((id) => {
      const food = food_list.find(item => item._id === id);
      return {
        itemId: id,
        name: food?.name || "Unknown",
        quantity: cartItems[id],
        price: food?.price || 0
      };
    });

    const fullAddress = {
      ...address,
      full: `${address.street}, ${address.city}, ${address.state}, ${address.zip}, ${address.country}`
    };

    try {
  setLoading(true);
  console.log("Sending order request...");

  await axios.post(
    `${url}/api/order`,
    {
      items: orderItems,
      amount: total,
      address: fullAddress,
      payment: true // simulate success
    },
    {
      headers: {
        token: token
      }
    }
  );

  console.log("Order request succeeded");

  alert("Order placed and payment successful!");
  setCartItems({});
  setAddress({ /* reset form */ });
  navigate("/MyOrders");
  
} catch (err) {
  console.error("Order placement error:", err.response?.data || err.message);
  alert(`Failed to place order: ${err.response?.data?.message || err.message}`);
} finally {
  console.log("Setting loading to false");
  setLoading(false);
}
  };

  return (
    <form className="place-order" onSubmit={handlePlaceOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            value={address.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            value={address.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          value={address.email}
          onChange={handleInputChange}
          placeholder="Email address"
          required
        />
        <input
          name="street"
          value={address.street}
          onChange={handleInputChange}
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            name="city"
            value={address.city}
            onChange={handleInputChange}
            placeholder="City"
            required
          />
          <input
            name="state"
            value={address.state}
            onChange={handleInputChange}
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            name="zip"
            value={address.zip}
            onChange={handleInputChange}
            placeholder="Zip code"
            required
          />
          <input
            name="country"
            value={address.country}
            onChange={handleInputChange}
            placeholder="Country"
            required
          />
        </div>
        <input
          name="phone"
          value={address.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          required
        />
      </div>

      <div className="place-order-right">
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
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
