// import orderModel from "../models/orderModel.js";
import Order from "../models/orderModel.js";

// POST: Place Order
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, payment } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    const newOrder = new Order({
      user: req.user.id, 
      items,
      amount,
      address,
      paymentStatus: payment ? "Paid" : "Pending",
      createdAt: new Date(),
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    console.error("Get Orders error:", err);
    res.status(500).json({ message: err.message });
  }
}


export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Optional: Only allow the owner or admin to view
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error("Track Order Error:", err);
    res.status(500).json({ message: "Error fetching order" });
  }
};



//Listing orders for admin pannel
export const listOrders = async(req,res)=>{
    try {
        const orders = await Order.find({});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; // order ID from URL
    const { status } = req.body; // new status from frontend

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } // return the updated document
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


