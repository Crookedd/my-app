import { Request, Response } from 'express';
import { commentService } from '../services/commentService';

export const commentController = {
  async getCommentsByLesson(req: Request, res: Response) {
    try {
      const comments = await commentService.getCommentsByLesson(req.params.lessonId);
      res.status(200).json(comments);
    } catch {
      res.status(500).json({ error: 'Ошибка при получении комментариев' });
    }
  },

  async createComment(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) { 
        res.status(403).json({ message: 'Пользователь не аутентифицирован' });
        return;
      }

      const comment = await commentService.createComment({
        ...req.body,
        user: userId,
        lesson: req.params.lessonId
      });
      res.status(201).json(comment);
    } catch (err) {
      console.error('Ошибка при создании комментария:', err); // ← вот это добавь
      res.status(500).json({ error: 'Ошибка при создании комментария' });
    }
  },


  async updateComment(req: Request, res: Response) {
    try {
      const updated = await commentService.updateComment(req.params.id, req.body);
      if (!updated) {
        res.status(404).json({ message: 'Комментарий не найден' });
        return;
      }
      res.status(200).json(updated);
    } catch {
      res.status(500).json({ error: 'Ошибка при обновлении комментария' });
    }
  },

  async deleteComment(req: Request, res: Response) {
    try {
      const deleted = await commentService.deleteComment(req.params.id);
      if (!deleted) {
        res.status(404).json({ message: 'Комментарий не найден' });
        return;
      }
      res.status(204).send();
    } catch {
      res.status(500).json({ error: 'Ошибка при удалении комментария' });
    }
  }
};
