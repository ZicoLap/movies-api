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


export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({
      status: "error",
      error: "Invalid credentials",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      status: "error",
      error: "Invalid credentials",
    });
  }
  const token = generateToken(user.id);
  return res.status(200).json({
    status: "success",
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    },
  });
}


export async function getCurrentUser(req, res) {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        error: "User not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: {
        user : {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
    });
  
}