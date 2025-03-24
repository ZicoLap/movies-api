import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { asyncHandler } from "../utils/helpers.js";

const router = express.Router();

router.post("/login", (req, res) => {
  res.json({ message: "Login Routes" });
});

router.post("/register", asyncHandler( authController.register));

router.get("/me", (req, res) => {
  res.json({ message: "Me Routes" });
});

export default router;
