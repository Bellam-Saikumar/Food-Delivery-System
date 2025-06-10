import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, getUserOrders,listOrders, updateOrderStatus, getOrderById } from "../controllers/orderController.js";

const orderRouter = express.Router();

// POST /api/order
orderRouter.post("/", authMiddleware, placeOrder);

// GET /api/order
orderRouter.get("/", authMiddleware, getUserOrders); // ✅ Clean endpoint

orderRouter.get("/list",listOrders);

orderRouter.put("/update-status/:id", updateOrderStatus);

orderRouter.get("/:id", authMiddleware, getOrderById);


export default orderRouter;
