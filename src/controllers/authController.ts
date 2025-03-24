import { Request, Response } from "express";
import { authService } from "../services/authService";

const getUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id; // Используем _id из req.user
    if (!userId) {
      res.status(401).json({ message: "User not authenticated." });
      return; // Не забывайте возвращать
    }

    const user = await authService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id; // Используем _id из req.user
    if (!userId) {
      res.status(401).json({ message: "User not authenticated." });
      return; // Не забывайте возвращать
    }

    await authService.deleteUser(userId);
    res.status(204).send(); // Успешное удаление
  } catch (error) {
    res.status(400).json({ error });
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  // Реализация регистрации
};

const login = async (req: Request, res: Response): Promise<void> => {
  // Реализация входа
};

export const authController = {
  getUserData,
  deleteUser,
  register,
  login,
};

