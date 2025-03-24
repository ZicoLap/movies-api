
import bcrypt from "bcrypt";
import { User } from "../models/index.js";

export async function createDefaultAdmin() {
  const admin = await User.findOne({ where: { email: "admin@admin.com" } });
  if (!admin) {
    const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
    await User.create({
      email: "admin@admin.com",
      password: hashedPassword,
      name: "admin",
      isAdmin: true,
    });
  }
}
