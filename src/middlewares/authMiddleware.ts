import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Расширяем интерфейс Request, чтобы добавить свойство user
declare global {
  namespace Express {
    interface Request {
      user?: { _id: string }; // Добавляем свойство user с _id
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    // Добавляем user в объект запроса
    req.user = { _id: decoded.userId };

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};


