import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";

const registerUser = async (firstName: string, lastName: string, username: string, password: string, role: "student" | "teacher") => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ firstName, lastName, username, password: hashedPassword, role });
  await user.save();
  return user;
};

const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

const getUserById = async (userId: string) => {
  return await User.findById(userId).select("-password"); // исключаем пароль из результата
};

const deleteUser = async (userId: string) => {
  await User.findByIdAndDelete(userId);
};

export const authService = {
  registerUser,
  loginUser,
  generateToken,
  getUserById,
  deleteUser,
};
