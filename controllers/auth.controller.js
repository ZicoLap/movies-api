import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/helpers.js";

export async function register(req, res) {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(400).json({
      status: "error",
      error: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  const token = generateToken(newUser.id);
  return res.status(201).json({
    status: "success",
    data: {
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    },
  });
}
