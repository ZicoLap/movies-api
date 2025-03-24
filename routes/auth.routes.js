import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { asyncHandler } from "../utils/helpers.js";
import  { authenticateUser } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/login", asyncHandler(authController.login));

router.post("/register", asyncHandler( authController.register));

router.get("/me", authenticateUser, asyncHandler(authController.getCurrentUser));
export default router;
