import { courseRepository } from '../repositories/courseRepository';
import { ICourse } from '../models/course';

interface CourseFilters {
  title?: string;
  category?: string;
  level?: string;
  published?: boolean;
  tags?: string[];
}

export const courseService = {
  async getAllCourses(filters: CourseFilters, page = 1, limit = 10) {
    return await courseRepository.findAll(filters, page, limit);
  },

  async getCourseById(id: string) {
    return await courseRepository.findById(id);
  },

  async createCourse(courseData: Partial<ICourse>) {
    return await courseRepository.create(courseData);
  },

  async updateCourse(id: string, courseData: Partial<ICourse>) {
    return await courseRepository.updateById(id, courseData);
  },

  async deleteCourse(id: string) {
    return await courseRepository.deleteById(id);
  },

  async addToFavorites(courseId: string, userId: string) {
    return await courseRepository.addCourseToFavorites(courseId, userId);
  },
  
  async removeFromFavorites(courseId: string, userId: string) {
    return await courseRepository.removeCourseFromFavorites(courseId, userId);
  },
};
