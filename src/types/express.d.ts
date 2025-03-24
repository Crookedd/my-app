import * as express from "express";
import { IUser } from "../models/user"; // Импортируйте интерфейс IUser

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Добавляем свойство user типа IUser
    }
  }
}
