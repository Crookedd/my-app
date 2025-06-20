import { enrollmentRepository } from '../repositories/enrollmentRepository';

export const enrollmentService = {
  async enrollUserToCourse(userId: string, courseId: string) {
    const alreadyEnrolled = await enrollmentRepository.isUserEnrolled(userId, courseId);
    if (alreadyEnrolled) {
      throw new Error('Пользователь уже записан на курс');
    }
    return enrollmentRepository.enroll(userId, courseId);
  },

  async getEnrollmentsByUser(userId: string) {
    return enrollmentRepository.getUserEnrollments(userId);
  },

  async getEnrollmentsByCourse(courseId: string) {
    return enrollmentRepository.getCourseEnrollments(courseId);
  },

  async unenrollUser(userId: string, courseId: string) {
    return enrollmentRepository.unenroll(userId, courseId);
  },
};