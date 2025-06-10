import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext.jsx";
import "./MyOrders.css";
import { assets } from "../../../admin/src/assets/assets.js";


function MyOrders() {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllOrders();
  }, [url, token]);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/order`, {
        headers: { token: token },
      });
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrder = async (orderId) => {
    try {
      const res = await axios.get(`${url}/api/order/${orderId}`, {
        headers: { token: token },
      });
      const updatedOrder = res.data;
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      alert("Failed to track order:"+error);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orders.length) return <p>No previous orders found.</p>;

  return (
    <div className="my-orders">
      <h2>
        My Orders:
        {/* <span className="order-count-badge">{orders.length}</span> */}
      </h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h3>Order ID:  <span style={{ fontSize: "1.2rem", color: "blue" }}> {order._id}</span></h3>
           <img src={assets.food_order} alt="order-box" className="order-box" />
          <p>
            <b>Amount:</b>{" "}
            <span style={{ fontSize: "1.3rem", fontWeight: "bold", color: "red" }}>
              ₹{order.amount}
            </span>
          </p>
          <div>
            <h4>Items:</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item.itemId}>
                  {item.name} x {item.quantity} @ ₹{item.price} each
                </li>
              ))}
            </ul>
          </div>
          <p><b>Placed on:</b> {new Date(order.createdAt).toLocaleString()}</p>
          <p><b>Delivery Address:</b> {order.address.full}</p>
          <p>
            <b>Payment Status:</b>{" "}
            <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "green" }}>
                {order.paymentStatus}
            </span>
          </p>
          <p>
            <b>Order Status:</b>{" "}
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                color:
                  order.status === "Delivered"
                    ? "green"
                    : order.status === "Out for Delivery"
                    ? "orange"
                    : "gray",
              }}
            >
              {order.status}
            </span>
          </p>

          {/* 🔘 Track Order Button */}
          <button
            className="track-btn"
            onClick={() => handleTrackOrder(order._id)}
          >
            Track Order
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
