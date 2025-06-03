import { lessonRepository } from '../repositories/lessonRepository';
import { ILesson } from '../models/lesson';

export const lessonService = {
  async getLessonsByCourse(courseId: string) {
    return await lessonRepository.findAllByCourse(courseId);
  },

  async getLessonById(id: string) {
    return await lessonRepository.findById(id);
  },

  async createLesson(data: Partial<ILesson>) {
    return await lessonRepository.create(data);
  },

  async updateLesson(id: string, data: Partial<ILesson>) {
    return await lessonRepository.updateById(id, data);
  },

  async deleteLesson(id: string) {
    return await lessonRepository.deleteById(id);
  },
};