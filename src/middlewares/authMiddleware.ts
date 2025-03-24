import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Авторизация')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Доступ запрещен. Токен не предоставлен.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(400).json({ message: 'Надопустимый токен.' });
  }
};
