import React, { useState, useEffect } from "react";
import './Orders.css';
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${url}/api/order/update-status/${orderId}`, { status: newStatus });
      if (response.data.success) {
        toast.success("Order status updated!");
        // Update the order status in frontend
        setOrders(prev =>
          prev.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="admin-orders-wrapper">
      <div className="admin-orders">
        <h2>All Orders</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="orders-list">
            {orders.map((order, index) => (
              <div className="order-card" key={index}>
                 <img src={assets.food_order} alt="order-box" className="order-box" />
                <p><strong>User ID:</strong> {order._id}</p>
                <p><strong>Amount:</strong> ₹{order.amount}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </p>
                <p><strong>Payment:</strong> {order.paymentStatus ? "Paid" : "Not Paid"}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <div>
                  <strong>Items:</strong>
                  <ul>
                    {order.items.map((item, idx) => (
                      <li key={idx}>{item.name} x {item.quantity}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Address:</strong>
                  <p>
                    {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipCode}
                  </p>
                  <p><strong>Phone:</strong> {order.address.phone}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
