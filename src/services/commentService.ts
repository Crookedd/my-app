import { commentRepository } from '../repositories/commentRepository';
import { IComment } from '../models/comment';

export const commentService = {
  async getCommentsByLesson(lessonId: string) {
    return await commentRepository.findByLesson(lessonId);
  },

  async createComment(data: Partial<IComment>) {
    return await commentRepository.create(data);
  },

  async updateComment(id: string, data: Partial<IComment>) {
    return await commentRepository.updateById(id, data);
  },

  async deleteComment(id: string) {
    return await commentRepository.deleteById(id);
  },
};
