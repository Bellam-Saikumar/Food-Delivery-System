import express from 'express';
import {loginUser,registerUser} from '../controllers/userControllers.js';
import authMiddleware from "../middleware/auth.js";
const userRouter =express.Router();

userRouter.get("/info", authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

userRouter.post("/login",loginUser);
userRouter.post("/register", registerUser);

export default userRouter;
