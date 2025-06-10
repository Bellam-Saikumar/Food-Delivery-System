import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      itemId: String,
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  amount: Number,
  address: {
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    phone: String,
    full: String,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending"
  },
  status: {
    type: String,
    enum: ["Processing", "Out for Delivery", "Delivered"],
    default: "Processing"
  }
}, { timestamps: true }); // createdAt and updatedAt auto-added

export default mongoose.model("Order", orderSchema);
